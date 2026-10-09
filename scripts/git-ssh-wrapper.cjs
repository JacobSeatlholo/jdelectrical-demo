#!/usr/bin/env node
/**
 * GIT_SSH wrapper: lets `git push/pull` use SSH without an ssh binary.
 * Implemented with the ssh2 package (pure JS) + the sandbox-generated
 * ed25519 key at ~/.ssh/id_ed25519.
 *
 * Git (GIT_SSH vanilla mode) calls:  wrapper [-p port] [-l user] host command...
 * We exec the remote command and pipe stdio through, propagating the exit code.
 */
const net = require("net");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { Client } = require(path.join(__dirname, "..", "node_modules", "ssh2"));

const args = process.argv.slice(2);

// parse minimal ssh CLI: [-p port] [-l user] [-i identity] host command...
let port = 22;
let user = "git";
let host = null;
const cmdParts = [];
let expectPort = false;
let expectUser = false;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "-p") { expectPort = true; continue; }
  if (a === "-l") { expectUser = true; continue; }
  if (expectPort) { port = parseInt(a, 10); expectPort = false; continue; }
  if (expectUser) { user = a; expectUser = false; continue; }
  if (host === null && !a.startsWith("-")) {
    // Vanilla GIT_SSH passes "user@host" as a single arg
    const at = a.lastIndexOf("@");
    if (at !== -1) {
      user = a.slice(0, at);
      host = a.slice(at + 1);
    } else {
      host = a;
    }
    continue;
  }
  if (host !== null) cmdParts.push(a);
}
const remoteCmd = cmdParts.join(" ");

const keyPath = process.env.GIT_SSH_KEY || path.join(os.homedir(), ".ssh", "id_ed25519");
const key = fs.readFileSync(keyPath, "utf8");

const conn = new Client();

// Determine best available auth: private key (with optional agent fallback)
const authConfig = { host, port, username: user, readyTimeout: 20000 };

conn
  .on("ready", () => {
    conn.exec(remoteCmd, (err, stream) => {
      if (err) {
        console.error("git-ssh-wrapper exec error:", err.message);
        conn.end();
        process.exit(1);
      }
      process.stdin.pipe(stream.stdin);
      stream.stdout.pipe(process.stdout);
      stream.stderr.pipe(process.stderr);
      stream.on("exit", (code) => {
        conn.end();
        process.exit(code ?? 0);
      });
      stream.on("close", () => {
        conn.end();
        process.exit(0);
      });
    });
  })
  .on("error", (err) => {
    console.error("git-ssh-wrapper connection error:", err.message);
    process.exit(255);
  });

// key-based auth; if the key is passphrase-protected this will fail cleanly
conn.connect({
  ...authConfig,
  privateKey: key,
});
