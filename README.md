# QR-MENU — Real-Time Digital Cafe Menu

A real-time digital ordering system for cafes and restaurants. Customers scan a QR code to browse the menu and submit orders — which instantly appear in the administrator's panel via Firebase Realtime Database synchronization. No app install required, no page refresh needed.

**Live Demo:** [Deployed on Firebase Hosting](https://github.com/damirzhumangali/QR-MENU1)

---

## How It Works

```
Customer scans QR code
        ↓
Opens menu in browser (no app required)
        ↓
Browses dishes → selects items → submits order
        ↓
Firebase Realtime Database
        ↓
Order instantly appears in admin panel
```

The entire flow happens in real time — the admin panel updates the moment an order is placed, with no polling or manual refresh.

---

## Features

**Customer side:**
- Scan QR code → instant menu access in any mobile browser
- Browse dishes with descriptions and prices
- Select items and submit order in seconds
- No account, no app installation required

**Admin side:**
- Real-time order feed — new orders appear instantly
- Order status management
- Menu management interface
- Firebase Hosting deployment — accessible from any device

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Real-time sync | Firebase Realtime Database |
| Hosting | Firebase Hosting |
| Local storage | SQLite (bookings.db) |

---

## Project Structure

```
QR-MENU1/
├── public/              # Web interface
│   ├── index.html       # Customer-facing menu
│   ├── admin.html       # Admin panel
│   └── ...              # CSS, JS assets
├── bookings.db          # Local SQLite database
├── firebase.json        # Firebase hosting config
└── .firebaserc          # Firebase project config
```

---

## Setup & Deployment

**Requirements:** Firebase CLI (`npm install -g firebase-tools`)

### Local development

```bash
git clone https://github.com/damirzhumangali/QR-MENU1.git
cd QR-MENU1
# Open public/index.html directly in browser, or use Firebase emulator:
firebase emulators:start
```

### Configure Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database**
3. Add your Firebase config to the JS files:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
```

### Deploy to Firebase Hosting

```bash
firebase login
firebase init hosting
firebase deploy
```

After deployment, generate a QR code pointing to your Firebase Hosting URL and print it for each table.

---

## Generate Table QR Codes

Any QR code generator works. Point it to your deployed URL with a table parameter:

```
https://your-project.web.app/?table=3
```

The menu interface reads the table number from the URL and includes it with each order submission.

---

## Real-Time Architecture

Firebase Realtime Database acts as the synchronization layer between customer and admin interfaces. When a customer submits an order, the data is written to Firebase — and the admin panel, which maintains an active listener on the database, updates immediately without any polling or page reload.

This eliminates the need for a traditional backend server for the core ordering flow, keeping the system simple, low-latency, and deployable entirely on Firebase's free tier.

---

## Author

**Damir Zhumangali** — [github.com/damirzhumangali](https://github.com/damirzhumangali)
