#!/usr/bin/env node
// PreToolUse guard for the resend MCP server.
// Allows sends only to @resend.dev test addresses and to MY_EMAIL.
// Exit 2 blocks the tool call; the message on stderr goes back to Claude.

const ALWAYS_BLOCK = new Set([
  'send-broadcast',
  'create-automation',
  'send-inbox-draft',
  'send-new-inbox-email',
]);
const CHECK_RECIPIENTS = new Set(['send-email', 'send-batch-emails']);

function block(reason) {
  process.stderr.write(`Send guard: ${reason}\n`);
  process.exit(2);
}

// Pull the bare address out of "Name <a@b.com>" or "a@b.com".
function bareAddress(value) {
  const s = String(value).trim();
  const m = s.match(/<([^>]+)>/);
  return (m ? m[1] : s).trim().toLowerCase();
}

function toList(field) {
  if (field == null) return [];
  return Array.isArray(field) ? field : [field];
}

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block('could not read the tool call, so it was blocked to be safe.');
  }

  // tool_name looks like "mcp__resend__send-email"; keep the last part.
  const name = String(call.tool_name || '').split('__').pop();
  const input = call.tool_input || {};

  if (ALWAYS_BLOCK.has(name)) {
    block(`${name} is always blocked because it can reach whole lists of people.`);
  }

  if (!CHECK_RECIPIENTS.has(name)) process.exit(0);

  const myEmail = (process.env.MY_EMAIL || '').trim().toLowerCase();
  const emails = name === 'send-batch-emails' ? toList(input.emails) : [input];

  for (const email of emails) {
    for (const field of ['to', 'cc', 'bcc']) {
      for (const value of toList(email && email[field])) {
        const addr = bareAddress(value);
        const allowed = addr.endsWith('@resend.dev') || (myEmail && addr === myEmail);
        if (!allowed) {
          block(`${addr} (in "${field}") is not a @resend.dev test address or your own email (MY_EMAIL). Blocked.`);
        }
      }
    }
  }

  process.exit(0);
});
