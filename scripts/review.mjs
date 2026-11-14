#!/usr/bin/env node
// Automatic email review: runs Claude Code headless on a campaign folder and
// saves findings that match review/findings.schema.json.
//
// Usage: node scripts/review.mjs <campaign folder>
// Exit codes: 0 = no high-severity findings, 1 = at least one high finding,
//             2 = the review itself could not run.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = join(root, "review", "findings.schema.json");
const outPath = join(root, "review", "findings.json");

function fail(message) {
  console.error(`review: ${message}`);
  process.exit(2);
}

const folderArg = process.argv[2];
if (!folderArg) fail("usage: node scripts/review.mjs <campaign folder>");
const folderAbs = resolve(process.cwd(), folderArg);
if (!existsSync(folderAbs) || !statSync(folderAbs).isDirectory()) {
  fail(`not a folder: ${folderArg}`);
}
const folder = relative(root, folderAbs) || ".";

const schema = readFileSync(schemaPath, "utf8");
let prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

// Re-review: if the last review was of this same folder, pass its findings in
// so Claude reports only new or still-unfixed problems.
const previous = readPrevious();
if (previous) {
  prompt +=
    `\n\nThese are findings from the last review. Report only problems that are new ` +
    `or still not fixed. Don't repeat ones that have been fixed.\n\n` +
    JSON.stringify(previous.findings, null, 2);
}

function readPrevious() {
  if (!existsSync(outPath)) return null;
  try {
    const saved = JSON.parse(readFileSync(outPath, "utf8"));
    if (saved.folder === folder && Array.isArray(saved.findings)) return saved;
  } catch {
    console.error("review: ignoring unreadable review/findings.json");
  }
  return null;
}

const run = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024, timeout: 10 * 60 * 1000 },
);

if (run.error) fail(`could not run claude: ${run.error.message}`);
if (run.status !== 0) {
  fail(`claude exited with code ${run.status}\n${(run.stderr || run.stdout || "").trim()}`);
}

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  fail(`claude did not return JSON:\n${run.stdout.slice(0, 500)}`);
}

// The output is either one result object, or a list whose last item is the result.
const result = Array.isArray(parsed) ? parsed.at(-1) : parsed;
if (!result || result.is_error) {
  fail(`claude reported an error: ${result?.result ?? "empty output"}`);
}
const output = result.structured_output;
if (!output || !Array.isArray(output.findings)) {
  fail("no structured_output.findings in claude's result");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ folder, findings: output.findings }, null, 2) + "\n");

const count = (s) => output.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${output.findings.length} finding(s) ` +
  `(${high} high, ${count("medium")} medium, ${count("low")} low). ` +
  `${previous ? "Re-review against " + previous.findings.length + " earlier finding(s). " : ""}` +
  `Saved to ${relative(root, outPath)}.`,
);
process.exit(high > 0 ? 1 : 0);
