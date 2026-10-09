/**
 * Generates an ed25519 SSH keypair in OpenSSH format using Node crypto.
 * Output: ~/.ssh/id_ed25519 (private) + ~/.ssh/id_ed25519.pub (public)
 * No ssh-keygen binary required.
 */
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const comment = process.argv[2] || "liam@businesshustle.co.za";

// --- raw ed25519 keypair (32-byte seed / 32-byte public) ---
const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const pubRaw = publicKey.export({ type: "spki", format: "der" }).subarray(-32); // last 32 bytes = raw point
const privRaw = privateKey.export({ type: "pkcs8", format: "der" }).subarray(-32); // last 32 bytes = seed

// --- ssh wire helpers ---
function sshString(buf) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(buf.length, 0);
  return Buffer.concat([len, buf]);
}
function sshUint(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n, 0);
  return b;
}

// --- public key blob: string "ssh-ed25519" + string pub ---
const pubBlob = Buffer.concat([
  sshString(Buffer.from("ssh-ed25519")),
  sshString(pubRaw),
]);
const pubLine =
  "ssh-ed25519 " + pubBlob.toString("base64") + " " + comment + "\n";

// --- private key (openssh-key-v1, unencrypted) ---
const check = crypto.randomBytes(4);
const privSection = Buffer.concat([
  check,
  check,
  sshString(Buffer.from("ssh-ed25519")),
  sshString(pubRaw), // PUB key (raw 32)
  sshString(Buffer.concat([privRaw, pubRaw])), // PRIV: seed(32) + pub(32) = 64
  sshString(Buffer.from(comment)),
]);
// padding 1,2,3... until multiple of 8
let pad = 1;
const padBufs = [];
while ((privSection.length + padBufs.length) % 8 !== 0) padBufs.push(Buffer.from([pad++]));
const privPadded = Buffer.concat([privSection, ...padBufs]);

const header = Buffer.from("openssh-key-v1\0");
const privBlob = Buffer.concat([
  header,
  sshString(Buffer.from("none")), // ciphername
  sshString(Buffer.from("none")), // kdfname
  sshString(Buffer.alloc(0)), // kdfoptions
  sshUint(1), // number of keys
  sshString(pubBlob), // public key
  sshString(privPadded), // private section
]);

const b64 = privBlob.toString("base64").match(/.{1,70}/g).join("\n");
const privPem = `-----BEGIN OPENSSH PRIVATE KEY-----\n${b64}\n-----END OPENSSH PRIVATE KEY-----\n`;

// --- write ---
const dir = path.join(os.homedir(), ".ssh");
fs.mkdirSync(dir, { recursive: true });
const privPath = path.join(dir, "id_ed25519");
const pubPath = privPath + ".pub";
fs.writeFileSync(privPath, privPem, { mode: 0o600 });
fs.writeFileSync(pubPath, pubLine, { mode: 0o644 });
console.log("SSH keypair written:");
console.log("  " + privPath);
console.log("  " + pubPath);
console.log("\n--- PUBLIC KEY (add this to GitHub -> Settings -> SSH keys) ---");
console.log(pubLine);
