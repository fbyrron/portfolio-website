# Firebase Admin Panel - Design

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Public Portfolio Site                    │
│  (index.html + existing files)                              │
│                                                              │
│  - Fetches content from Firestore on load                   │
│  - Displays projects, awards, leadership dynamically        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Firebase SDK
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Firebase Services                         │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐ │
│  │ Authentication │  │   Firestore    │  │    Hosting    │ │
│  │                │  │                │  │   (optional)  │ │
│  │ - Email/Pass   │  │ - Projects     │  │               │ │
│  │ - Admin User   │  │ - Awards       │  │               │ │
│  │                │  │ - Leadership   │  │               │ │
│  └────────────────┘  └────────────────┘  └───────────────┘ │
└──────────────────────▲──────────────────────────────────────┘
                       │
                       │ Firebase SDK
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                     Admin Panel                              │
│  (admin.html + admin.js + admin.css)                        │
│                                                              │
│  - Login page                                                │
│  - Dashboard with content management                         │
│  - CRUD operations for all content types                    │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
/
├── index.html              # Main portfolio (existing)
├── script.js               # Main JS (existing)
├── styles.css              # Main CSS (existing)
├── game.js                 # Game logic (existing)
├── admin.html              # Admin panel page (NEW)
├── admin.js                # Admin panel logic (NEW)
├── admin.css               # Admin panel styles (NEW)
├── firebase-config.js      # Firebase configuration (NEW)
├── content-loader.js       # Loads content from Firestore (NEW)
└── assets/
    └── icons/              # Existing icons
```

## Admin Panel UI Design

### Login Page (admin.html - Initial State)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    Portfolio Admin                      │
│                                                         │
│              ┌─────────────────────────┐               │
│              │                         │               │
│              │  Email:                 │               │
│              │  [________________]     │               │
│              │                         │               │
│              │  Password:              │               │
│              │  [________________]     │               │
│              │                         │               │
│              │  [     Login     ]      │               │
│              │                         │               │
│              │  Forgot Password?       │               │
│              │                         │               │
│              └─────────────────────────┘               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Dashboard (admin.html - Authenticated State)
```
┌─────────────────────────────────────────────────────────┐
│  Portfolio Admin                          [Logout]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Projects   │  │   Awards    │  │ Leadership  │   │
│  │             │  │             │  │             │   │
│  │     3       │  │     3       │  │     3       │   │
│  │   items     │  │   items     │  │   items     │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Manage Projects                    [+ Add New]  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  1. Project One                    [Edit][Delete]│  │
│  │  2. Project Two                    [Edit][Delete]│  │
│  │  3. Project Three                  [Edit][Delete]│  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  [Switch to Awards] [Switch to Leadership]             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Edit Form Modal
```
┌─────────────────────────────────────────────────────────┐
│  Edit Project                                    [X]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Title:                                                 │
│  [_____________________________________________]        │
│                                                         │
│  Description:                                           │
│  [_____________________________________________]        │
│  [_____________________________________________]        │
│  [_____________________________________________]        │
│                                                         │
│  Tags (comma separated):                                │
│  [_____________________________________________]        │
│                                                         │
│  Order:                                                 │
│  [___]                                                  │
│                                                         │
│  Published: [✓]                                         │
│                                                         │
│  [Cancel]                            [Save Changes]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Color Scheme (Matching Portfolio)
- Background: `#000000` (black)
- Card Background: `#0a0a0a`
- Primary: `#00ff88` (green)
- Secondary: `#0088ff` (blue)
- Text Primary: `#ffffff`
- Text Secondary: `#999999`
- Border: `#1a1a1a`

## Responsive Breakpoints
- Desktop: > 768px (full layout)
- Tablet: 481px - 768px (stacked cards)
- Mobile: ≤ 480px (single column)

## User Flows

### Login Flow
1. User visits `/admin.html`
2. If not authenticated → Show login form
3. User enters email/password
4. Firebase authenticates
5. On success → Show dashboard
6. On error → Show error message

### Add Content Flow
1. User clicks "+ Add New" button
2. Modal/form appears
3. User fills in fields
4. User clicks "Save"
5. Validate input
6. Save to Firestore
7. Show success message
8. Refresh content list

### Edit Content Flow
1. User clicks "Edit" on an item
2. Modal/form appears with existing data
3. User modifies fields
4. User clicks "Save Changes"
5. Update Firestore document
6. Show success message
7. Refresh content list

### Delete Content Flow
1. User clicks "Delete" on an item
2. Confirmation dialog appears
3. User confirms
4. Delete from Firestore
5. Show success message
6. Refresh content list

## Public Site Integration

### Content Loading Strategy
1. Page loads → Show loading skeleton
2. Initialize Firebase
3. Fetch content from Firestore (parallel queries)
4. Render content dynamically
5. Hide loading skeleton
6. If error → Show fallback static content

### Caching Strategy
- Use sessionStorage to cache fetched content
- Cache duration: Session lifetime
- Refresh on page reload
- No service worker (keep it simple)

## Security Considerations

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /projects/{document} {
      allow read: if true;  // Public can read
      allow write: if request.auth != null;  // Only authenticated can write
    }
    match /awards/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /leadership/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication Rules
- Only pre-registered admin email can access
- No public registration
- Password reset via Firebase email

## Performance Optimization
- Lazy load Firebase SDK
- Minimize Firestore reads (fetch once per session)
- Use Firestore indexes for ordering
- Compress and minify admin panel assets
- Keep admin panel separate from main site (no impact on public performance)

## Error Handling
- Network errors → Show retry button
- Authentication errors → Clear error messages
- Validation errors → Inline field errors
- Firestore errors → Fallback to static content on public site
