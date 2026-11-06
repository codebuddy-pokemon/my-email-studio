---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rule

Every email file in any campaign must follow this format.

1. **Subject and preview first.** The first line is `Subject: ...`, 50 characters or fewer. The second line is `Preview: ...`, 90 characters or fewer.
2. **Greeting.** Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},".
3. **One link only.** Each email has exactly one main link, written as `[Button text](https://petafyve.example/openshift-training)`. No other links.
4. **Sign-off and footer.** End with the sign-off from `brand/voice.md`, then this two-line footer. Write it as plain text, not inside a code block:

The Petafyve engineering team
petafyve.com

You're getting this because you joined the Petafyve OpenShift training waitlist.
Petafyve, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
