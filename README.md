# BCBV Academic Competitions Calendar

A staff-facing August-to-July planning tool for Brighton College Bangkok Vibhavadi. The live site can read approved competition records from a Google Sheet while remaining suitable for static GitHub Pages hosting.

## What the Google Sheet upgrade does

- Downloads the published `Competitions` tab whenever the page is opened or refreshed.
- Validates required columns and ignores rows without a valid name and month.
- Restricts official links to normal `http` or `https` addresses.
- Uses the bundled competition list automatically if the Sheet is unavailable, empty or incorrectly formatted.
- Shows staff whether they are seeing live Sheet data or the safe fallback list.

The website is read-only. Editing permissions remain in Google Sheets, so only people you grant **Editor** access can change calendar data.

## 1. Create the Google Sheet

1. Upload `templates/competitions-sheet-template.csv` to Google Drive and open it with Google Sheets.
2. Rename the worksheet tab to `Competitions`.
3. Keep the first-row column names unchanged.
4. Replace the example row with verified competition records.

Use a vertical bar (`|`) between multiple subjects or year groups, for example `English|History` or `Year 10|Year 11`.

Valid `status` values are:

- `Recommended`
- `Department considering`
- `Pupils entered`

The `month` field is numeric: January is `1`, August is `8`, and December is `12`.

## 2. Publish only the calendar tab

In Google Sheets:

1. Choose **File → Share → Publish to web**.
2. Select the `Competitions` tab rather than the entire document.
3. Select **Comma-separated values (.csv)**.
4. Choose **Publish**, then copy the generated link.

Publishing makes that tab readable to anyone who has its link. Do not include pupil names, email addresses, private notes or unapproved Form responses. Normal Sheet sharing should remain restricted to the staff who may edit it.

## 3. Connect the website

Open `src/config.js`, paste the published CSV link between the quotation marks, and commit the change:

```js
export const GOOGLE_SHEET_CSV_URL = "PASTE_THE_PUBLIC_CSV_LINK_HERE";
```

GitHub Pages will rebuild the site. Once the deployment completes, the strip above the disclaimer will say **Live Google Sheet**. Sheet edits then appear whenever a visitor refreshes the page; the website itself does not need to be rebuilt for every data change.

## Column guide

| Column | Purpose |
| --- | --- |
| `id` | Short unique identifier; use lower-case words and hyphens |
| `name` | Competition name |
| `subjects` | One or more values separated by `|` |
| `month` | Main calendar month, from `1` to `12` |
| `phase` | Short timing summary used in Coming Up |
| `registration` | Registration or opening timing |
| `deadline` | Deadline or competition timing |
| `yearGroups` | Eligible year groups separated by `|` |
| `officialUrl` | Verified official `https://` address |
| `schoolLead` | BCBV staff lead or `TBC` |
| `department` | Responsible department |
| `status` | One of the three valid BCBV statuses above |
| `verification` | Any remaining check or source note |

Required columns are `id`, `name`, `subjects`, `month`, `phase`, `department` and `status`. Keep all template columns so each card can be complete.

## Optional Google Form for HoD submissions

Create a separate Form that writes to a separate response tab or separate Sheet. Suggested questions are competition name, subject, suggested year groups, official website, typical timing, rationale, submitting department and submitter name.

Do not connect raw Form responses directly to the website. Nominate a calendar owner to verify each suggestion, then copy approved records into the published `Competitions` tab. This keeps unverified submissions and staff details private.

## Preview, build and publish

Run `pnpm dev` for a local preview and `pnpm build` to create the production site in `dist/`.

For GitHub Pages:

1. Upload the project to a GitHub repository.
2. Choose **Settings → Pages → GitHub Actions**.
3. Push to the `main` branch.
4. The included `.github/workflows/pages.yml` workflow builds and publishes the site automatically.

The Vite base path is relative, so the calendar works on both organisation Pages domains and repository subpaths.

## Safe fallback data

`src/competitions.js` remains the emergency fallback. Update it occasionally after major changes to the Sheet so staff still see a useful recent calendar during a temporary Google outage. Exact dates, eligibility and official URLs should remain marked for verification until checked against the current official competition website.
