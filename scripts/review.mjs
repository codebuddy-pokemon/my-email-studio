#!/usr/bin/env node
// Automatic email review: runs Claude Code headless on a campaign folder and
// saves findings that match review/findings.schema.json.
//
// Usage: node scripts/review.mjs <campaign folder>
// Exit codes: 0 = no high-severity findings, 1 = at least one high finding,
//             2 = the review itself could not run.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
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
  `Report only real problems.\n\n` +
  `Use these severities exactly, so the same problem always gets the same one:\n` +
  `- high: breaks a "Claims we must never make" rule in brand/voice.md, or breaks a ` +
  `numbered rule in .claude/rules/emails.md (extra or wrong links, missing greeting, ` +
  `missing or wrong sign-off or footer).\n` +
  `- medium: uses a word from "Words we avoid", goes over 150 words, has more than one ` +
  `call to action, or breaks another voice guideline (humour, "customers" instead of "you").\n` +
  `- low: a small style or clarity point that breaks no written rule.\n\n` +
  `Subject and preview lengths, and whether those lines are present, are checked by a ` +
  `script before you run. Don't report them.`;

// Measured checks: done in code, because counting characters by eye is unreliable.
const RULES = [
  { label: "Subject", line: 1, max: 50 },
  { label: "Preview", line: 2, max: 90 },
];

function emailFiles(dir) {
  return readdirSync(dir, { recursive: true })
    .map((p) => join(dir, p))
    .filter((p) => /(^|[\\/])emails[\\/][^\\/]+\.md$/.test(p) && statSync(p).isFile())
    .sort();
}

function measuredFindings() {
  const findings = [];
  for (const abs of emailFiles(folderAbs)) {
    const file = relative(root, abs);
    const lines = readFileSync(abs, "utf8").split(/\r?\n/);
    for (const { label, line, max } of RULES) {
      const text = lines[line - 1] ?? "";
      const prefix = `${label}: `;
      if (!text.startsWith(prefix)) {
        findings.push({
          file, line, severity: "high",
          problem: `Line ${line} should start with "${prefix}" (.claude/rules/emails.md rule 1).`,
          fix: `Put the ${label.toLowerCase()} on line ${line} as "${prefix}...".`,
        });
        continue;
      }
      const length = [...text.slice(prefix.length)].length;
      if (length > max) {
        findings.push({
          file, line, severity: "high",
          problem: `The ${label.toLowerCase()} is ${length} characters (measured). ` +
            `.claude/rules/emails.md rule 1 allows ${max} or fewer.`,
          fix: `Cut at least ${length - max} character(s) from the ${label.toLowerCase()}.`,
        });
      }
    }
  }
  return findings;
}

const measured = measuredFindings();

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

// Drop any length finding Claude reported anyway; the measured ones replace it.
const findings = [
  ...measured,
  ...output.findings.filter(
    (f) => !(f.line <= 2 && /\b(subject|preview)\b/i.test(f.problem) && /character/i.test(f.problem)),
  ),
];

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ folder, findings }, null, 2) + "\n");

const count = (s) => findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${findings.length} finding(s) ` +
  `(${high} high, ${count("medium")} medium, ${count("low")} low). ` +
  `${previous ? "Re-review against " + previous.findings.length + " earlier finding(s). " : ""}` +
  `Saved to ${relative(root, outPath)}.`,
);
process.exit(high > 0 ? 1 : 0);
