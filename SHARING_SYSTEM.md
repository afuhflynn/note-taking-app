# Note Sharing & Permissions System

## Overview

The note-taking app includes a robust sharing system with fine-grained permission control. Users can share notes via secure tokens with different permission levels.

## Permission Levels

### VIEW (Read-Only)
- Allows viewing the note content
- Cannot edit the note
- Cannot modify title, content, or formatting
- Ideal for sharing notes for feedback or reference

### EDIT (Read & Write)
- Full read and write permissions
- Can edit note title and content
- Changes are saved to the original note immediately
- Ideal for collaboration and co-editing

## Sharing Features

### 1. Create Share Links
- Generate unique, secure share tokens (16-character URL-safe strings)
- Set permission levels (VIEW or EDIT)
- Optional expiration dates (specify days from creation)
- One link can be accessed by multiple users

**API Endpoint:**
```
POST /api/share
Body: {
  noteId: string,
  permission: "VIEW" | "EDIT",
  expiresIn?: number (days)
}
```

### 2. View Share Links
- List all share links for a note
- View metadata: creation date, expiration, permission level
- Track active collaborators

**API Endpoint:**
```
GET /api/share?noteId=<noteId>
Response: {
  shares: ShareLink[],
  success: boolean
}
```

### 3. Update Permissions
- Change permission level after creating share link
- Available options: VIEW → EDIT or EDIT → VIEW

**API Endpoint:**
```
PATCH /api/share
Body: {
  shareToken: string,
  permission: "VIEW" | "EDIT"
}
```

### 4. Delete Share Links
- Revoke access by deleting share token
- Prevents further access via that link
- Immediate effect

**API Endpoint:**
```
DELETE /api/share?shareToken=<token>
```

## Access Control Rules

### Permission Checks

1. **Token Validation**
   - Share token must be valid and not expired
   - Expired shares return 403 Forbidden
   - Invalid tokens return 404 Not Found

2. **Ownership Rules**
   - Only note owner can create/manage share links
   - Only note owner can update or delete share links
   - Owner always has EDIT permissions

3. **Edit Permission Enforcement**
   - EDIT permission required to modify note content
   - Attempts to edit with VIEW permission return 403 Forbidden
   - Changes made by collaborators are saved immediately

4. **Expiration Handling**
   - Shares can be set to expire after N days
   - Expired shares are inaccessible
   - Expiration is checked on every access

## Implementation Details

### Permission Library (`lib/permissions.ts`)

Provides utility functions for permission checks:

```typescript
// Check if user can access shared note
checkSharedNoteAccess(token, userId?)

// Check if user can edit
canEditSharedNote(token, userId?)

// Check if user owns note
isNoteOwner(noteId, userId)

// Check if user can manage share links
canManageShareLinks(noteId, userId)

// Get effective permission for user
getEffectivePermission(shareToken, userId?)
```

### Share Utilities (`lib/share-utils.ts`)

Handles share operations:

```typescript
// Create new share link
createShareLink(params)

// Get shared note details
getShareLink(token)

// Update share permission
updateSharePermission(token, permission)

// Delete share link
deleteShareLink(token, userId)

// Get all share links for note
getNoteShareLinks(noteId, userId)

// Add/update collaborator record
addCollaborator(token, userName?, userId?)
```

## Security Measures

### 1. Token Security
- 16-character random alphanumeric tokens
- Cryptographically secure generation via `nanoid`
- Tokens are URL-safe for easy sharing

### 2. Ownership Verification
- All permission changes verified against note owner
- Share link modifications require ownership proof
- User ID validation on all operations

### 3. Permission Enforcement
- Permission checks at API layer (not just UI)
- Edit operations rejected if permission insufficient
- Time-based expiration validation

### 4. Data Isolation
- Shared access only to specified note
- No access to other user's notes without share link
- Collaborator actions logged with user/timestamp

## Usage Examples

### Share a Note for Viewing

```javascript
const response = await fetch('/api/share', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    noteId: 'note123',
    permission: 'VIEW',
    expiresIn: 7 // 7 days
  })
});

const { shareLink } = await response.json();
// shareLink.shareUrl contains the public URL
```

### Update Permission to Allow Editing

```javascript
await fetch('/api/share', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    shareToken: 'abc123def456',
    permission: 'EDIT'
  })
});
```

### Access Shared Note

```javascript
const response = await fetch(`/api/share/${token}`);
const { sharedNote, permission } = await response.json();

// permission is 'VIEW' or 'EDIT'
// sharedNote contains note details and collaborator info
```

### Edit Shared Note (with EDIT permission)

```javascript
const response = await fetch(`/api/share/${token}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: newEditorContent,
    title: newTitle
  })
});

// Returns 403 if permission is VIEW
// Returns success if permission is EDIT
```

## Collaborators Tracking

### Features
- Automatic collaborator registration on access
- Last active timestamp tracking
- Collaborator list available to note owner
- Support for both authenticated users and anonymous visitors

### Data Stored
- Collaborator ID (if authenticated user)
- Username (for anonymous visitors)
- Last active time
- Permission level

## Best Practices

1. **Generate expiring shares for sensitive content** - Use shorter expiration windows
2. **Use VIEW permission by default** - Only use EDIT when collaboration needed
3. **Review active collaborators** - Check who has accessed your shared notes
4. **Revoke expired shares** - Manually delete old share links
5. **Monitor permission changes** - Audit trail available via share metadata

## Error Handling

| Error | Status | Cause |
|-------|--------|-------|
| "Share link not found" | 404 | Invalid or deleted token |
| "Share link has expired" | 403 | Expiration date passed |
| "Access denied" | 403 | Missing authentication when required |
| "Permission denied" | 403 | Insufficient permissions for operation |
| "Invalid permission value" | 400 | Invalid permission parameter |
| "Note not found" | 404 | Referenced note doesn't exist |

## Database Schema

### SharedNote Table
- `id`: Unique identifier
- `noteId`: Reference to original note
- `shareToken`: Unique share access token
- `permission`: 'VIEW' or 'EDIT'
- `expiresAt`: Optional expiration timestamp
- `createdBy`: User ID of share creator
- `createdAt`: Share creation timestamp

### NoteCollaborator Table
- `id`: Unique identifier
- `sharedNoteId`: Reference to share link
- `userId`: Authenticated user ID (optional)
- `userName`: Username for anonymous users
- `permission`: Inherited from share link
- `lastActiveAt`: Last access timestamp
- `createdAt`: Collaborator registration timestamp

## Future Enhancements

Potential improvements for sharing system:

1. **Password-protected shares** - Add optional password requirement
2. **Role-based access** - Viewer, Editor, Admin roles
3. **Read-only mode enforcement** - Disable editing UI when VIEW permission
4. **Download permissions** - Control if users can export notes
5. **Comment-only mode** - Allow annotations without content editing
6. **Access logs** - Detailed audit trail of access and modifications
7. **IP whitelisting** - Restrict access by IP address
8. **Notification system** - Alert owner of collaborator changes
