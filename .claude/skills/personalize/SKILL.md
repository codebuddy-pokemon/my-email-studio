---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the input

If no campaign folder was given above, stop. Use Glob with `campaigns/*/` to find the campaign folders, list them, and ask which one to personalize. Don't write any files.

If the folder has no `emails/` folder, or it has no email files, stop and say so.

## 2. Gather what you need

1. Read `leads/leads.csv` and find the unique values in the `group` column. Today these are `devops-engineers`, `openshift-engineers` and `linux-admins`, but always use what the file says.
2. Use Glob with `<campaign folder>/emails/*.md` to find the emails. Read each one.
3. Read `brand/voice.md` and `.claude/rules/emails.md`. Every version must follow both.
4. Read `<campaign folder>/plan.md` if it exists, for what each group cares about.

## 3. Write one version per email per group

For each group and each email, copy the email and change only two things:

1. **The opening line.** This is the first sentence after the `Hi {{first_name}},` greeting. Rewrite it so it speaks to that group's daily work.
2. **One example.** Pick one sentence that gives an example or a use case and rewrite it to fit that group. Change one sentence only.

Keep everything else exactly as it is: the Subject and Preview lines, the greeting, the structure, the link (same text and URL), the sign-off and the footer. Don't add or remove lines.

How to think about each group:
- `devops-engineers`: pipelines, GitOps, automation, shipping apps to the cluster.
- `openshift-engineers`: already run OpenShift: operators, upgrades, day-2 operations, troubleshooting.
- `linux-admins`: look after RHEL servers: moving from RHEL to containers and OpenShift, Ansible.

Follow `brand/voice.md`: plain, direct, peer-to-peer, no humour, no words to avoid, and none of the claims we never make. The body stays under 150 words.

Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`.

## 4. Reply with a short summary only

When all files are written, reply with only:
- how many files you wrote (emails times groups), and
- one example opening line per group.

Don't paste the emails or describe each change.
