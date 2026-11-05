# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this studio is

An email marketing studio for **Petafyve** (petafyve.com), a cloud solutions provider and Red Hat delivery partner that builds enterprise cloud infrastructure on RHEL, OpenShift and OpenStack. The studio plans and writes email campaigns for Petafyve's services and training offers.

The repo is built step by step by following the 15-step "Email Studio Lab" course in `project-instructions.md`. Petafyve replaces the course's sample brand (Kettlebird Tea / The Steep Club), so adapt Kettlebird names, links and footers in course prompts to Petafyve. Only do the current step's work. Each step is checked later by a fresh session, so don't build ahead.

Customer groups: `devops-engineers`, `openshift-engineers`, `linux-admins`.

## Folders

- `brand/`: how Petafyve sounds (the brand voice guide)
- `leads/`: made-up practice customers to send campaigns to
- `campaigns/`: one folder per campaign, holding its plan and emails
- `notes/`: research and working notes (for example `skills-i-chose.md`)

The marketing plugin (`marketing@knowledge-work-plugins`) is installed for this project only, in `.claude/settings.json`. Its skills include `/marketing:campaign-plan`, `/marketing:email-sequence` and `/marketing:brand-review`.

## Rules

- Write in plain English.
- Never send email to real people. Practice leads use only `@example.com` addresses.
- Ask before deleting anything.

## Commands

There's no build or test tooling yet. The course adds these later:
- Step 9: the practice email server, run in a separate terminal with `npx emulate@0.12.3 start --service resend` (http://localhost:4000)
- Step 13: the automatic review, run with `node scripts/review.mjs <campaign folder>`
