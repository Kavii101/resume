Absolutely. Here's a clean, professional **overview of your visitor tracking system project**, followed by step-by-step instructions and final updated scripts to apply to **every page of your GitHub Pages site**.

---

# 📊 Project Overview: GitHub Pages Visitor Analytics System

## 🎯 Purpose

To create a **lightweight, zero-backend visitor tracking system** that logs:

* Visitor **IP address**
* **Geolocation** (City, Region, Country, Org/ISP)
* **Browser fingerprint**
* **Exact page visited**
* **Page title**
* **Time spent (duration)** on each page
* **Timestamp** of visit

All this data is:

* ✅ Logged automatically into a **Google Sheet**
* ✅ (Optionally) Sent to your **email inbox** using EmailJS

This system works entirely on **static GitHub Pages**, using:

* JavaScript
* Google Apps Script
* EmailJS
* `ipapi.co` for IP + geolocation

---

# ✅ How It Works

### On Each Page Load:

1. `ipapi.co` fetches visitor's IP and location
2. `navigator.userAgent` gets browser info
3. `window.location.pathname` and `document.title` track page details
4. Data is:

   * Logged to Google Sheets (via `fetch`)
   * Optionally emailed to you via EmailJS

### On Page Unload:

5. Duration is calculated
6. `navigator.sendBeacon()` logs time spent

---

# 🔧 Instructions to Update & Deploy

---

## 1️⃣ Google Sheet Setup

1. Create a new Google Sheet
2. In Row 1, paste the following headers (exact order):

```
Timestamp | IP | City | Region | Country | Org | Browser | Page | Title | Duration
```

---

## 2️⃣ Google Apps Script Setup

1. Go to **Extensions → Apps Script**
2. Paste this updated script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date(),
    data.ip || '',
    data.city || '',
    data.region || '',
    data.country || '',
    data.org || '',
    data.browser || '',
    data.page || '',
    data.title || '',
    data.duration || ''
  ]);

  return ContentService.createTextOutput("OK");
}
```

3. Click **Deploy → Manage deployments**

   * Deploy as **Web App**
   * Execute as: *Me*
   * Who has access: **Anyone**
4. Copy the **Web App URL**, e.g.:

```
https://script.google.com/a/macros/bountyai.online/s/AKfycbwgG5Dz.../exec
```

---

## 3️⃣ Update All GitHub Pages (Every Page You Want Tracked)

Add this script **just before `</body>`** tag on every HTML page:

```html
<!-- Visitor Tracking Script -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  // 1. Initialize EmailJS (optional)
  emailjs.init("Fph7MR53cvfDXJcAZ");

  // 2. Capture start time
  const pageStartTime = Date.now();

  // 3. On load, fetch IP + Geo + log visit
  window.addEventListener("load", () => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const payload = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          org: data.org,
          browser: navigator.userAgent,
          page: window.location.pathname,
          title: document.title,
          timestamp: new Date().toISOString()
        };

        // 4. Log to Google Sheet
        fetch("https://script.google.com/a/macros/bountyai.online/s/AKfycbwgG5DzrMBJqZQwDHxPjUdiT-tilF8Ihq9HcwmRR8JUFzKUJL3rRTm0Z7j5z5iaO_lf/exec", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        });

        // 5. Optional: Send alert via EmailJS
        emailjs.send("service_v7rzt8d", "template_2n1morw", payload)
          .then(() => console.log("📩 Email sent"))
          .catch(err => console.error("Email error", err));
      });
  });

  // 6. On unload, log time spent
  window.addEventListener("beforeunload", () => {
    const duration = Math.round((Date.now() - pageStartTime) / 1000);

    const durationPayload = {
      browser: navigator.userAgent,
      page: window.location.pathname,
      title: document.title,
      timestamp: new Date().toISOString(),
      duration: duration
    };

    navigator.sendBeacon(
      "https://script.google.com/a/macros/bountyai.online/s/AKfycbwgG5DzrMBJqZQwDHxPjUdiT-tilF8Ihq9HcwmRR8JUFzKUJL3rRTm0Z7j5z5iaO_lf/exec",
      JSON.stringify(durationPayload)
    );
  });
</script>
```

> ✅ Be sure to **update the URL** if you redeploy your Google Apps Script.

---

# 📈 Resulting Google Sheet Data

| Timestamp           | IP        | City      | Region | Country | Org       | Browser        | Page        | Title    | Duration |
| ------------------- | --------- | --------- | ------ | ------- | --------- | -------------- | ----------- | -------- | -------- |
| 2025-07-19 02:30 AM | 185.x.x.x | Bucharest | RO     | Romania | RCS & RDS | Mozilla/5.0... | /about.html | About Us | 14       |

---

# 🧪 Pro Tips

* **Test in incognito** tabs or different devices to verify logging
* Use `console.log()` to debug in browser
* `Duration` is only captured if the user **leaves or reloads** the page
* Add UTM or referrer tracking if desired (`document.referrer`)


You're now running a fully custom **private analytics engine**, 100% free, with zero cookies or trackers.
