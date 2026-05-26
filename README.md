# Oxybaka portfolio starter

This is a static portfolio and commissions site. It is designed so you can launch quickly without needing a backend.

## Recommendation

For commissions, start with Google Forms instead of building a custom form.

- Faster to launch
- Responses can go directly to Google Sheets
- Easy to update questions without editing site code
- No spam protection or server maintenance to manage

Use a custom form only if you later need payments, dashboards, automated quotes, or custom client workflows.

## Quick setup

1. Replace the gallery placeholder cards in `index.html` with your real art or image tags.
2. Update the example pricing in `index.html`.
3. Open `script.js` and set `formUrl` to your public Google Form link.
4. If you want the form embedded on the page, set `embedUrl` to the Google Forms embed URL.
5. Open `index.html` in a browser to preview.

## Google Forms tips

Suggested fields:

- Name
- Email or social handle
- Commission type
- Character or subject description
- Reference links
- Deadline
- Personal or commercial use
- Budget range
- Extra notes

If you allow uploads in Google Forms, note that respondents may need to sign in with Google.