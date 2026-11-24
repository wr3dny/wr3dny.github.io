import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const git = (...args) => {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
};

const info = {
  commitSha: git("rev-parse", "--short", "HEAD"),
  commitDate: git("log", "-1", "--format=%cI"),
  commitMessage: git("log", "-1", "--format=%s"),
};
mkdirSync("public", { recursive: true });
writeFileSync("public/build-info.json", JSON.stringify(info, null, 2) + "\n");
