import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function cmd(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

const commitSha = cmd("git rev-parse HEAD");
const commitDate = cmd("git log -1 --format=%cI"); // ISO 8601
const commitMessage = cmd("git log -1 --format=%B").trim();

const payload = {
  commitSha,
  commitDate,
  commitMessage,
};

const outDir = path.resolve("public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "build-info.json"),
  JSON.stringify(payload, null, 2) + "\n",
);

console.log("Generated public/build-info.json");
