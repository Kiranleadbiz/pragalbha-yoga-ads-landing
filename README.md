# Pragalbha Yoga — Master Class landing page

Single static page (`index.html`). Registrations are saved straight into a
Google Sheet — no server needed.

## One-time setup: connect the form to a Google Sheet

1. Create a new Google Sheet (e.g. "Master Class Leads").
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in
   the contents of `apps-script/Code.gs`. Save.
3. **Deploy → New deployment → type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy and approve the permissions prompt.
4. Copy the **Web app URL** (ends in `/exec`).
5. In `index.html`, set `SHEET_URL` to that URL (search for `SHEET_URL`), then push.

Each submission appears as a new row in a `Registrations` tab
(Timestamp, Name, Phone, Email, Page, Source). If you change `Code.gs` later,
use **Deploy → Manage deployments → Edit → New version** so the URL keeps working.

## Adding the videos

Open `index.html`, find the `gallery-grid`, and replace a `.media-slot`'s contents with:

```html
<video src="assets/your-video.mp4" poster="assets/poster.jpg" controls playsinline preload="metadata"></video>
```
