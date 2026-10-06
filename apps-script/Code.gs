// Google Apps Script — receives registrations from the landing page and
// appends them as rows to the Google Sheet this script is attached to.
//
// Setup: see ../README.md

const SHEET_NAME = 'Registrations';
const HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Page', 'Source'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: real visitors never fill this hidden field.
  if (p.company) return json_({ ok: true });

  const name = String(p.name || '').trim();
  const phone = String(p.phone || '').trim();
  if (!name || !phone) return json_({ ok: false, error: 'missing fields' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      name,
      "'" + phone, // leading apostrophe keeps the number as text
      String(p.email || '').trim(),
      String(p.page || ''),
      String(p.source || ''),
    ]);
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
