# My Email Studio

An email marketing studio run with [Claude Code](https://claude.com/claude-code). Claude plans email campaigns, writes the emails, tailors them for each group of customers, reviews them against the brand rules and sends them to a **practice** email server. No real emails go out.

The studio writes for **Petafyve** (petafyve.com), a cloud solutions provider and Red Hat delivery partner that builds enterprise cloud infrastructure on RHEL, OpenShift and OpenStack. I built it by following the 15-step "Email Studio Lab" course in [`project-instructions.md`](project-instructions.md), with Petafyve in place of the course's sample brand.

## What it does

1. **Plans a campaign.** The first campaign, [`openshift-training-launch`](campaigns/openshift-training-launch/plan.md), is four emails over four weeks inviting a waitlist to enrol in Petafyve's OpenShift training.
2. **Writes the emails** in Petafyve's voice: short, direct and peer-to-peer, for engineers.
3. **Personalizes them** for three customer groups: `devops-engineers`, `openshift-engineers` and `linux-admins`.
4. **Reviews them automatically** for broken brand rules, banned words and risky claims.
5. **Sends them safely** to a local practice server. A guard blocks any send to a real person.

## How the folders fit together

```
my-email-studio/
├── CLAUDE.md                 the studio's rules, read by Claude every session
├── brand/voice.md            how Petafyve sounds, and the claims it never makes
├── leads/
│   ├── leads.csv             24 made-up practice customers (@example.com only)
│   └── CLAUDE.md             extra rules for the leads folder
├── campaigns/
│   ├── openshift-training-launch/
│   │   ├── plan.md           the campaign plan
│   │   ├── emails/           the 4 main emails
│   │   └── groups/           one version of each email per customer group
│   └── test-bad/             a deliberately broken email, used to test the review
├── notes/                    research and working notes
│   ├── skills-i-chose.md     which outside skills were trusted, and why
│   ├── angle-a.md, angle-b.md, handoff.md   subject-line exploration
│   └── reviews/              made-up customer reviews of an earlier workshop
├── .claude/
│   ├── settings.json         turns on the marketing plugin and the send guard
│   ├── rules/emails.md       the format every email file must follow
│   ├── skills/personalize/   a custom skill that writes the per-group versions
│   └── hooks/send-guard.mjs  blocks sends to anyone but test addresses
├── .mcp.json                 connects Claude to Resend (the practice server by default)
├── scripts/review.mjs        the automatic review
└── review/                   the review's output and its JSON schema
```

## The rules every email follows

From [`brand/voice.md`](brand/voice.md) and [`.claude/rules/emails.md`](.claude/rules/emails.md):

- A `Subject:` line of 50 characters or fewer and a `Preview:` line of 90 or fewer.
- A greeting with `{{first_name}}`, a body under 150 words and exactly one link.
- The Petafyve sign-off and a footer with the reason for the email, an address and an unsubscribe link.
- No hype words (such as "revolutionary" or "seamless") and no promises about uptime, exam passes, exact savings, or speaking for Red Hat.

## How sending stays safe

- Every practice customer uses an `@example.com` address, which can never receive mail.
- By default, [`.mcp.json`](.mcp.json) points Resend at a local practice server, not the real Resend service.
- [`.claude/hooks/send-guard.mjs`](.claude/hooks/send-guard.mjs) runs before every Resend tool call. It only lets email go to Resend test addresses (`@resend.dev`) or to my own address, and it always blocks broadcasts and automations that could reach whole lists.

## Running it yourself

You need Node.js 22 or newer, Git and Claude Code.

1. Clone the repo and open Claude Code in it: `claude`. Approve the marketing plugin when asked.
2. (Optional) To allow sends to your own inbox, set `MY_EMAIL` in your own untracked `.claude/settings.local.json`.
3. Start the practice email server in a separate terminal:
   ```
   npx emulate@0.12.3 start --service resend
   ```
   It runs at http://localhost:4000.
4. Ask Claude to work with a campaign. Useful commands:
   - `/marketing:campaign-plan`: plan a new campaign
   - `/marketing:email-sequence`: draft a sequence of emails
   - `/marketing:brand-review`: check copy against the brand voice
   - `/personalize campaigns/<campaign>`: write one version of each email per customer group
5. Run the automatic review on a campaign:
   ```
   node scripts/review.mjs campaigns/openshift-training-launch
   ```
   It saves findings to `review/findings.json`. It exits with `0` if there are no high-severity problems, `1` if there is at least one, and `2` if the review itself could not run. Try it on `campaigns/test-bad` to see it catch problems.

## Course progress

Built step by step, with each step checked afterwards by a fresh Claude session:

- **Part 1, plan and write (steps 1 to 8):** skill research, studio setup, brand voice, campaign plan, practice leads, the email rule and sequence, a fresh-eyes review and the `personalize` skill.
- **Part 2, send safely (steps 9 to 11):** the Resend practice connection, the send guard and a practice launch.
- **Part 3, work like a team (steps 12 to 13):** resuming and forking sessions, and the automatic review.
- **Stretch:** step 15 (what customers love) is started in `notes/reviews/`. Step 14 (package the studio as a kit) is still to do.

All people, leads and reviews in this repo are made up for practice.
