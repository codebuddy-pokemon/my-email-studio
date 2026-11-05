# Skills I chose

Searched on 2026-11-05 with `npx skills find` for: email marketing, email sequence, campaign plan, resend. GitHub star counts are from the GitHub API on the same day. Nothing has been installed yet.

## Use these

**1. Anthropic's marketing plugin, for planning and writing campaigns**
`anthropics/knowledge-work-plugins`: 34,819 GitHub stars, published by Anthropic's official GitHub organization.
- It has `campaign-plan` (3.3K installs), `email-sequence` (3K installs) and `brand-review`, which are the three skills this studio needs to plan, write and review emails.
- The install counts are lower than some other results. We trust it because of who publishes it, and the high star count backs that up.

**2. Resend's own skills, for sending email**
`resend/resend-skills`: 212 GitHub stars, published by Resend's official GitHub organization.
- It has `resend` (24.2K installs), `resend-cli` (13.8K) and `email-best-practices`. They're made by the company that runs the email service, so they match how Resend actually works.
- The star count is modest. The repo is new and specialised, and it's official, which matters more than stars here.
- Use the `email-best-practices` inside this repo: `resend/resend-skills@email-best-practices` (folder `skills/email-best-practices`). The "resend" search shows a different copy from a separate repo, `resend/email-best-practices` (8.2K installs, 147 stars). That one is also official, but we want all three skills from the same repo.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**
It's the top result for "email marketing" with 30K installs, but its GitHub repo has only **2 stars**. Thousands of installs with almost no stars is the classic sign that the install count has been inflated. It also comes from a publisher we don't know.

**2. `samber/dev-event-organizer-skills@event-attendee-email-sequences`**
It has 6.5K installs and only **4 stars**, so it shows the same mismatch. It's also about emails for event attendees, not product or service launches, so it doesn't fit Petafyve's campaign.

(A side note, not a reason to avoid it: `coreyhaines31/marketingskills@email-sequence` still shows 55.1K installs on skills.sh, but that folder no longer exists in its GitHub repo. It has been merged into a skill called `emails`. Search listings can be out of date.)

## How I decided

Before installing any skill, check these three things:

1. **Who publishes it.** Prefer the official organization of the company behind the tool, such as `anthropics` or `resend`, or a well-known author. Look at the GitHub owner, not just the name on skills.sh.
2. **Whether stars match installs.** Install counts can be faked. A real, popular repo has GitHub stars roughly in line with its usage. Many installs with very few stars is a red flag.
3. **Whether it's alive and does what you need.** Open the repo and confirm the skill folder still exists, it was updated recently, and its `SKILL.md` does the job you need. Read what it would run before you trust it.
