#!/usr/bin/env node
/* Test SSH auth to github.com using the sandbox ed25519 key (ssh2, pure JS). */
const net = require("net");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { Client } = require(path.join(__dirname, "..", "node_modules", "ssh2"));

const key = fs.readFileSync(path.join(os.homedir(), ".ssh", "id_ed25519"), "utf8");
const conn = new Client();
conn
  .on("ready", () => {
    conn.exec("", (err, stream) => {
      if (err) {
        console.error("exec error:", err.message);
        process.exit(1);
      }
      let out = "";
      stream.on("data", (d) => (out += d.toString()));
      stream.stderr.on("data", (d) => (out += d.toString()));
      stream.on("close", () => {
        console.log(out.trim());
        conn.end();
        process.exit(0);
      });
    });
  })
  .on("error", (err) => {
    console.error("AUTH FAILED:", err.message);
    process.exit(255);
  })
  .connect({ host: "github.com", port: 22, username: "git", privateKey: key, readyTimeout: 20000 });
