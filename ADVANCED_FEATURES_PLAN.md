# Implementation Plan - Advanced Features

## Overview
This document outlines the implementation of advanced features requested:
1. Keyboard shortcuts help dialog ✅
2. Note sharing with permissions
3. Focus mode for distraction-free editing ✅
4. Real-time collaboration
5. Drawing canvas for diagrams
6. Asset/image gallery
7. AI completion with Gemini API key

## Status

### ✅ Completed
1. **Keyboard Shortcuts Dialog** - `components/dialogs/keyboard-shortcuts-dialog.tsx`
2. **Focus Mode Page** - `app/focus/page.tsx`
3. **Database Schema Updates** - Added SharedNote, NoteCollaborator, DrawingAsset models

### 🚧 In Progress
The following features require implementation:

## 1. Note Sharing System

### Files to Create:
- `app/api/share/route.ts` - Create share links
- `app/api/share/[token]/route.ts` - Access shared notes
- `app/share/[token]/page.tsx` - Public share page
- `components/dialogs/share-note-dialog.tsx` - Share dialog
- `lib/share-utils.ts` - Share utilities

### Features:
- Generate unique share tokens
- Set permissions (VIEW/EDIT)
- Optional expiration dates
- Copy share link to clipboard
- Manage collaborators
- Real-time presence indicators

## 2. Real-Time Collaboration

### Files to Create:
- `lib/websocket-server.ts` - WebSocket server setup
- `hooks/use-collaboration.ts` - Collaboration hook
- `components/collaboration/active-users.tsx` - Show active users
- `components/collaboration/cursor-overlay.tsx` - Show other users' cursors

### Technologies:
- Socket.io or Pusher for WebSocket
- Y.js for CRDT (Conflict-free Replicated Data Types)
- Presence tracking
- Cursor positions
- Real-time content sync

## 3. Drawing Canvas

### Files to Create:
- `components/drawing/drawing-canvas.tsx` - Main canvas component
- `components/drawing/drawing-toolbar.tsx` - Drawing tools
- `components/drawing/shape-selector.tsx` - Shape selection
- `app/api/drawings/route.ts` - Save/load drawings
- `lib/drawing-utils.ts` - Canvas utilities

### Features:
- Freehand drawing with pen tool
- Shapes: Rectangle, Circle, Triangle, Line, Arrow
- Text annotations
- Colors and stroke width
- Undo/Redo
- Export as PNG/SVG
- Save to asset library
- Insert into notes

### Libraries:
- Fabric.js or Konva.js for canvas
- React-sketch-canvas alternative
- Excalidraw (optional, for diagrams)

## 4. Asset/Image Gallery

### Files to Create:
- `app/assets/page.tsx` - Asset gallery page
- `components/assets/asset-grid.tsx` - Grid view
- `components/assets/asset-upload.tsx` - Upload component
- `components/assets/asset-preview.tsx` - Preview modal
- `app/api/assets/route.ts` - Asset CRUD operations

### Features:
- Upload images from computer
- View all user assets
- Search and filter assets
- Delete assets
- Insert into notes
- Thumbnail generation
- Grid/List view toggle

## 5. AI Completion Enhancement

### Files to Update:
- `app/api/completion/route.ts` - Use provided API key
- Update model to Gemini 2.5 or 3.0

### API Key:
```
AIzaSyBMY-cz7SkhPZJbyhbQM7XFJx2_LbyqR6Y
```

### Models to Use:
- gemini-2.5-flash (if available)
- gemini-3.0-flash (if available)
- Fallback to gemini-1.5-flash

## Environment Variables Needed

Add to `.env`:
```env
# Google AI API Key
GOOGLE_GENERATIVE_AI_API_KEY="AIzaSyBMY-cz7SkhPZJbyhbQM7XFJx2_LbyqR6Y"

# WebSocket (if using separate server)
WEBSOCKET_URL="ws://localhost:3001"

# Pusher (alternative for WebSocket)
PUSHER_APP_ID=""
PUSHER_KEY=""
PUSHER_SECRET=""
PUSHER_CLUSTER=""
```

## Database Migrations

Run after schema updates:
```bash
pnpm prisma generate
pnpm prisma migrate dev --name add_sharing_and_assets
```

## Implementation Priority

1. **High Priority:**
   - Share note dialog and API ✅
   - Focus mode integration
   - AI completion update
   - Asset gallery basic version

2. **Medium Priority:**
   - Drawing canvas
   - Real-time collaboration (basic)
   - Keyboard shortcuts integration

3. **Future Enhancements:**
   - Advanced collaboration features
   - Excalidraw integration
   - Video/audio assets
   - Asset organization (folders)

## Next Steps

1. Implement share note functionality
2. Create drawing canvas component
3. Build asset gallery
4. Set up WebSocket for real-time collaboration
5. Update AI completion with new API key
6. Test all features
7. Update documentation

## Notes

- All features should work offline where possible
- Maintain consistent UI/UX
- Add proper error handling
- Include loading states
- Add keyboard shortcuts for new features
- Update tasks.md when complete
