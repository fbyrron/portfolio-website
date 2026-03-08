# Firebase Setup Guide

This guide will walk you through setting up Firebase for your portfolio admin panel.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `portfolio-admin` (or any name you prefer)
4. Click **Continue**
5. **Google Analytics**: You can disable this for now (toggle off)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Portfolio Website`
3. **Do NOT** check "Also set up Firebase Hosting" (we'll use Vercel)
4. Click **Register app**
5. You'll see a Firebase configuration object - **KEEP THIS PAGE OPEN** (we'll need it later)

The config looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Authentication

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Click on **Email/Password** provider
4. Toggle **Enable** to ON
5. Click **Save**

## Step 4: Create Your Admin User

1. Still in Authentication, click the **Users** tab
2. Click **Add user**
3. Enter your email: `your-email@example.com`
4. Enter a strong password (you'll use this to login)
5. Click **Add user**
6. **Important**: Copy your email and password somewhere safe!

## Step 5: Enable Firestore Database

1. In the left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll add security rules)
4. Click **Next**
5. Choose your Cloud Firestore location (pick closest to you)
   - For Philippines: `asia-southeast1 (Singapore)` or `asia-southeast2 (Jakarta)`
6. Click **Enable**
7. Wait for the database to be created

## Step 6: Set Up Firestore Security Rules

1. In Firestore Database, click the **Rules** tab
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects collection
    match /projects/{document} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
    }
    
    // Awards collection
    match /awards/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Leadership collection
    match /leadership/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Step 7: Get Your Firebase Configuration

Go back to **Project Settings** (gear icon in left sidebar):
1. Scroll down to **Your apps** section
2. You'll see your web app listed
3. Click on the **Config** radio button (not SDK)
4. Copy the entire `firebaseConfig` object

It should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "portfolio-admin-xxxxx.firebaseapp.com",
  projectId: "portfolio-admin-xxxxx",
  storageBucket: "portfolio-admin-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 8: Save Your Configuration

**IMPORTANT**: Keep this information safe and ready:

✅ **Firebase Config Object** (from Step 7)
✅ **Admin Email** (from Step 4)
✅ **Admin Password** (from Step 4)

You'll need these when we create the admin panel files!

## Step 9: Optional - Set Up Firestore Indexes

For better performance, you can create indexes:

1. Go to **Firestore Database** → **Indexes** tab
2. Click **Add index**
3. Create these indexes:

**For Projects:**
- Collection ID: `projects`
- Fields: `order` (Ascending), `published` (Ascending)
- Query scope: Collection

**For Awards:**
- Collection ID: `awards`
- Fields: `order` (Ascending)
- Query scope: Collection

**For Leadership:**
- Collection ID: `leadership`
- Fields: `order` (Ascending)
- Query scope: Collection

## Troubleshooting

### "Firebase: Error (auth/operation-not-allowed)"
- Make sure Email/Password authentication is enabled in Step 3

### "Missing or insufficient permissions"
- Check your Firestore security rules in Step 6
- Make sure you're logged in with the admin account

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your Firebase config object
- Make sure you copied it correctly

## Next Steps

Once you have your Firebase configuration ready, let me know and I'll:
1. Create the `firebase-config.js` file with your config
2. Build the admin panel (admin.html, admin.js, admin.css)
3. Update the main site to load content from Firebase

---

**Ready?** Share your Firebase config (you can redact sensitive parts if needed, I'll show you where to put them), and we'll start building! 🚀
