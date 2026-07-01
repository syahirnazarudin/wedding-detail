# Syahir & Zubairah Wedding Details

Static wedding operations page that embeds a live Google Docs document.

## Update The Wedding Details

1. Open `src/wedding-config.js`.
2. Replace `PASTE_YOUR_PUBLISHED_GOOGLE_DOC_URL_HERE` with your published Google Docs URL.
3. Update the date, venue, contacts, and notes in the same file.

## Publish The Google Doc

1. Open the Google Docs file.
2. Go to **File** > **Share** > **Publish to web**.
3. Choose **Embed** or **Link**.
4. Publish the document and copy the URL.
5. Paste it into `googleDocUrl` in `src/wedding-config.js`.

Updates made inside Google Docs will appear on the website automatically as long as the published document stays active.

## Local Development

```bash
npm run dev
```

The app is configured for:

```text
https://syahirxzubairah.com/wedding-details/
```

## Build For GitHub Pages

```bash
npm run build
```

Deploy the `dist` folder to GitHub Pages.
