# Campaign plan: OpenShift training launch

## 1. Campaign overview

- **Campaign name:** OpenShift, hands-on: the waitlist launch
- **Summary:** Over four weeks, four short emails invite our waitlist to enrol in Petafyve's instructor-led OpenShift training course.
- **Primary goal:** 300 waitlist members enrol in the course by Sunday 3 January 2027, the end of the four-week launch.
- **Secondary goals:**
  - Learn which customer group responds best, to shape the next cohort's campaign.
  - Collect questions from replies to build a course FAQ.

**Campaign dates:** Monday 7 December 2026 to Sunday 3 January 2027.
**First cohort starts:** Monday 11 January 2027 (confirm with the training team).

## 2. Target audience

About 2,000 people who joined the course waitlist. They already raised their hand, so this campaign is about the decision stage, not awareness.

| Group | Who they are | What they want | What holds them back |
|---|---|---|---|
| `devops-engineers` | Run CI/CD pipelines and deploy apps, often onto Kubernetes | To ship to OpenShift with confidence and automate more | Time away from delivery work |
| `openshift-engineers` | Already run OpenShift clusters day to day | To go deeper: operators, upgrades, troubleshooting in production | "Is this too basic for me?" |
| `linux-admins` | Look after RHEL servers and are moving towards containers | A clear, practical path from RHEL to running OpenShift | "Containers feel like a big jump" |

**Audience profile:** an engineer at a company running or adopting Red Hat platforms, who wants hands-on OpenShift skills and is looking for training taught by people who build these platforms for a living. They care most about real labs, real clusters and not wasting their time.

**Where they spend time:** work email, Red Hat and Kubernetes communities, GitHub, technical blogs.

## 3. Key messages

**Core message:** Learn OpenShift hands-on, from engineers who build production-ready OpenShift platforms every week.

| Supporting message | Proof point |
|---|---|
| You learn by doing: every module is a lab on a real OpenShift 4.x cluster, not slides. | Course outline with the lab list. |
| Taught by Petafyve engineers who deliver OpenShift, RHEL and OpenStack projects as a Red Hat delivery partner. | Instructor bios and their project experience. |
| You leave with skills you can use on your cluster the next Monday. | Sample lab exercises (for example, deploying and scaling an app, running a cluster upgrade). |
| The course prepares you for Red Hat certification study. | Map of course modules to exam topics. We say "prepares", never that people will pass. |

**Message by group:**
- `devops-engineers`: pipelines, GitOps and deploying to OpenShift.
- `openshift-engineers`: day-2 operations, operators, upgrades, troubleshooting.
- `linux-admins`: from RHEL to containers to OpenShift, step by step.

**Brand rules for every message** (from `brand/voice.md`): short and skimmable, under 150 words per email, one call to action, no humour, no exam pass promises, no uptime promises, no exact savings figures, and never suggest that Petafyve speaks for Red Hat.

## 4. Channel strategy

| Channel | Why it fits | Format | Effort | Budget |
|---|---|---|---|---|
| Email (owned) | The whole audience is a waitlist that asked to hear from us. It's cheap and easy to track. | Four short plain-text-style emails, one version per customer group | Low to medium | Almost all of it: copywriting time and the email tool |
| Course page on petafyve.com (owned) | Every email links here to enrol | One page: outline, labs, instructors, dates, enrol button | Medium | Small: copy and page update |

No paid ads, as agreed. Social and community posts are left out to keep the scope small. They could be added later as a nice-to-have.

## 5. Content calendar

Emails go out on Tuesdays (Wednesday in the last week, after the Christmas break). Each email is sent to all three groups, with a version written for each group.

| Week | Send date | Email | Audience group | Purpose | Notes |
|---|---|---|---|---|---|
| 1 | Tuesday 8 December 2026 | Email 1: Enrolment is open | All three groups (one version each) | Announce the course, the first cohort date and the enrol link | Course page must be live by Monday 7 December |
| 2 | Tuesday 15 December 2026 | Email 2: What you'll do in the labs | All three groups (one version each) | Show the hands-on labs for each group's work | Needs the lab list from the training team |
| 3 | Tuesday 22 December 2026 | Email 3: Your questions, answered | All three groups (one version each) | Answer common objections: level, time, prerequisites | Built from replies to emails 1 and 2 |
| 4 | Wednesday 30 December 2026 | Email 4: Last call, enrolment closes Sunday | All three groups, not yet enrolled | Final reminder before enrolment closes on Sunday 3 January 2027 | Remove anyone who already enrolled |

**Milestones and dependencies:**
- Wednesday 2 December 2026: course details confirmed (outline, labs, instructors, cohort date).
- Friday 4 December 2026: all four emails drafted and reviewed against `brand/voice.md`.
- Monday 7 December 2026: course page live and enrol link tested. Email 1 can't go out without it.
- Sunday 3 January 2027: enrolment closes and the campaign ends.

## 6. Content pieces needed

| Asset | What it contains | Priority | Ready by |
|---|---|---|---|
| Email 1: Enrolment is open | What the course is, who it's for, first cohort date, enrol link | Must-have | Friday 4 December 2026 |
| Email 2: What you'll do in the labs | Two or three labs that fit the reader's group | Must-have | Friday 4 December 2026 |
| Email 3: Your questions, answered | Short answers on level, time and prerequisites | Must-have | Friday 4 December 2026, updated from replies by Monday 21 December 2026 |
| Email 4: Last call | Enrolment closes Sunday, one-line summary, enrol link | Must-have | Friday 4 December 2026 |
| Group versions of each email | One version per group: `devops-engineers`, `openshift-engineers`, `linux-admins` | Must-have | Friday 4 December 2026 |
| Course page | Outline, labs, instructors, dates, enrol button | Must-have | Monday 7 December 2026 |
| Resend to non-openers of Email 1 | Same content, new subject line | Nice-to-have | Thursday 10 December 2026 |

## 7. Success metrics

| Metric | Target | How we track it |
|---|---|---|
| **Enrolments (primary)** | 300 by Sunday 3 January 2027 | Enrolment system, matched to the waitlist |
| Open rate | 40% or more per email | Email tool reports |
| Click rate to the course page | 8% or more per email | Email tool reports and links tagged by email and group |
| Enrolments by group | Compare the three groups | Group tag on each enrol link |
| Unsubscribe rate | Under 0.5% per email | Email tool reports |

**Reporting:** a quick check the day after each send, and a full report the week after the campaign ends.

Note: 300 out of 2,000 is 15%. That's ambitious even for a warm waitlist, so watch the numbers after Email 1 and adjust early.

## 8. Budget allocation

The budget is small and email only, so the cost is mostly time.

| Item | Share | Notes |
|---|---|---|
| Writing and reviewing emails (12 versions) | About 50% | Production |
| Course page update | About 25% | Production |
| Email tool sending | About 15% | Distribution |
| Contingency | About 10% | Extra resend or a fifth email if enrolments fall short |

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| The Christmas break (weeks 3 and 4) means fewer people read email. | Put the strongest content in emails 1 and 2. Keep emails 3 and 4 very short. Send Email 4 on Wednesday 30 December, not over the holiday weekend. |
| `openshift-engineers` think the course is too basic. | Their versions lead with day-2 operations and advanced labs, and Email 3 says clearly who the course is for. |
| Enrolments are well behind target after week 2. | Use the contingency: resend to people who didn't open, and ask a short "what's stopping you?" question in Email 3. |
| A draft slips in a forbidden claim (exam pass, uptime, savings, speaking for Red Hat). | Review every email against `brand/voice.md` before it's sent. |

## 10. Next steps

1. Confirm the course details with the training team: outline, labs, instructors and the cohort start date of Monday 11 January 2027.
2. Write the four emails and the group versions.
3. Review them against `brand/voice.md`.
4. Get the course page live by Monday 7 December 2026.
5. **Approvals needed:** the training lead for course facts, and marketing for the final emails.
6. **Decision point:** after Email 2 on Tuesday 15 December 2026, decide whether to use the contingency.
