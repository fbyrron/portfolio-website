# Firebase Admin Panel - Requirements

## Overview
Add a Firebase-powered admin panel to enable dynamic content management for the portfolio website. This will allow Ernest to easily update Projects, Awards, and Leadership sections without editing code.

## Goals
- Enable non-technical content updates through an admin interface
- Secure admin access with Firebase Authentication
- Store content in Firebase Firestore
- Maintain the existing design and user experience
- Keep the site fast and responsive

## Functional Requirements

### Authentication
- Admin login page with email/password authentication
- Secure access to admin panel (only authenticated users)
- Logout functionality
- Password reset capability

### Content Management
The admin panel should allow managing:

1. **Projects**
   - Project title
   - Description
   - Tags (multiple)
   - Image filename (stored locally in assets/images/projects/)
   - Project number/order
   - Publish/unpublish toggle

2. **Awards & Recognition**
   - Award title
   - Description
   - Icon/emoji
   - Image filename (optional, stored locally in assets/images/awards/)
   - Display order

3. **Leadership Roles**
   - Role title
   - Description
   - Image filename (optional, stored locally in assets/images/leadership/)
   - Card number/order

### Image Management
- Images stored locally in project folders
- Admin enters only the filename (e.g., "project1.jpg")
- Site automatically loads from: `assets/images/{category}/{filename}`
- Supported formats: JPG, PNG, WebP, GIF
- Admin panel shows image preview if file exists
- Instructions in admin panel on how to upload images to project folder

### Admin Panel Features
- Dashboard showing content overview
- Create, Read, Update, Delete (CRUD) operations for all content types
- Form validation
- Image filename validation
- Success/error notifications
- Responsive design for mobile editing

### Public Site Integration
- Fetch and display content from Firestore on page load
- Loading states while fetching data
- Fallback content if Firebase is unavailable
- Cache content for better performance

## Technical Requirements

### Firebase Services
- Firebase Authentication (Email/Password)
- Cloud Firestore (Database)
- Firebase Hosting (optional, for deployment)

### Data Structure

**Projects Collection:**
```json
{
  "id": "auto-generated",
  "title": "Project Title",
  "description": "Project description",
  "tags": ["tag1", "tag2"],
  "order": 1,
  "published": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Awards Collection:**
```json
{
  "id": "auto-generated",
  "title": "Award Title",
  "description": "Award description",
  "icon": "🏆",
  "order": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Leadership Collection:**
```json
{
  "id": "auto-generated",
  "title": "Leadership Role",
  "description": "Role description",
  "order": 1,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Non-Functional Requirements

### Performance
- Initial page load should remain under 3 seconds
- Admin panel should load within 2 seconds
- Real-time updates not required (refresh to see changes is acceptable)

### Security
- Only authenticated users can access admin panel
- Firestore security rules to prevent unauthorized access
- Environment variables for Firebase config

### Compatibility
- Works on modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive admin panel for tablet/mobile editing
- Maintains existing site compatibility

## Out of Scope (Future Enhancements)
- Image upload functionality
- Rich text editor for descriptions
- Content versioning/history
- Multiple admin users with different permissions
- Analytics dashboard
- Content scheduling (publish at specific date/time)

## Success Criteria
- Admin can log in securely
- Admin can add/edit/delete projects, awards, and leadership roles
- Changes appear on the public site immediately after refresh
- No degradation in site performance
- Admin panel is intuitive and easy to use
