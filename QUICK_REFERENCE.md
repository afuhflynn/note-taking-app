# Quick Reference Guide - Note-Taking App

## 🚀 Quick Start

### Installation
```bash
pnpm install
```

### Database Setup
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Run full-text search migration
psql -d notes_app_db -f prisma/migrations/add_fulltext_search.sql
```

### Development
```bash
pnpm dev
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── completion/         # AI completion endpoint
│   │   ├── health/             # Health check endpoint
│   │   ├── notes/
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts    # Single note CRUD
│   │   │   │   └── versions/   # Version management
│   │   │   └── route.ts        # Notes list & create
│   │   └── search/             # Advanced search
│   └── notes/                  # Notes page
├── components/
│   ├── notes/                  # Note components
│   ├── tiptap-extensions/      # Custom Tiptap extensions
│   └── tiptap-templates/       # Editor templates
├── hooks/
│   ├── use-auto-save.ts        # Auto-save with offline support
│   ├── use-keyboard-shortcuts.ts
│   ├── use-ai-completion.ts
│   └── use-online-status.ts
├── lib/
│   ├── content-parser.ts       # Tiptap JSON parser
│   ├── fulltext-search.ts      # PostgreSQL search
│   ├── note-versioning.ts      # Version management
│   └── pubsub.ts               # Realtime events
└── prisma/
    └── schema.prisma           # Database schema
```

---

## 🔑 Key Features & Usage

### 1. Auto-Save
```typescript
// In any component
const { isSaving, isOfflineMode, isOnline, forceSave } = useAutoSave(2000);

// Force save
forceSave();

// Check status
if (isOfflineMode) {
  console.log("Working offline");
}
```

### 2. Keyboard Shortcuts
```typescript
// Global shortcuts (already integrated in SimpleEditor)
Ctrl/Cmd + S  → Save
Ctrl/Cmd + N  → New Note
Ctrl/Cmd + K  → Search
Ctrl/Cmd + /  → Help
Escape        → Close Modals
```

### 3. Realtime Events
```typescript
import { publish, subscribe } from "@/lib/pubsub";

// Subscribe to events
const unsubscribe = subscribe("noteUpdated", (data) => {
  console.log("Note updated:", data);
});

// Publish events
publish("noteCreated", noteData);

// Cleanup
unsubscribe();
```

### 4. Full-Text Search
```typescript
// API Call
GET /api/search?q=search+term&tags=tag1,tag2&limit=20&sortBy=relevance

// In code
import { smartSearch } from "@/lib/fulltext-search";

const { results, total } = await smartSearch({
  userId: session.user.id,
  query: "search term",
  tags: ["important"],
  limit: 20,
  offset: 0,
  sortBy: "relevance",
  sortOrder: "desc",
});
```

### 5. Note Versioning
```typescript
// Get all versions
GET /api/notes/[id]/versions

// Restore a version
POST /api/notes/[id]/versions
Body: { historyId: "version-id" }

// In code
import { getNoteVersions, restoreNoteVersion } from "@/lib/note-versioning";

const versions = await getNoteVersions(noteId);
await restoreNoteVersion(noteId, historyId, userId);
```

### 6. AI Completion
```typescript
// In editor (already integrated)
Ctrl/Cmd + Space  → Trigger AI completion
Tab               → Accept suggestion
Escape            → Dismiss suggestion

// In code
const { completion, generateCompletion } = useAICompletion({
  onSuccess: (text) => console.log(text),
});

await generateCompletion("User's text", "Context");
```

### 7. Offline Detection
```typescript
import { useOnlineStatus } from "@/hooks/use-online-status";

const isOnline = useOnlineStatus();

if (!isOnline) {
  toast.info("You're offline. Changes will sync when you're back online.");
}
```

---

## 🛠️ Common Tasks

### Add a New Realtime Event
```typescript
// 1. Publish in API route
import { publish } from "@/lib/pubsub";
publish("eventName", eventData);

// 2. Subscribe in component
import { subscribe } from "@/lib/pubsub";
useEffect(() => {
  const unsub = subscribe("eventName", (data) => {
    // Handle event
  });
  return () => unsub();
}, []);
```

### Extract Text from Tiptap Content
```typescript
import { extractTextFromTiptapContent } from "@/lib/content-parser";

const plainText = extractTextFromTiptapContent(tiptapJSON);
```

### Create a Note Version
```typescript
import { createNoteVersion } from "@/lib/note-versioning";

await createNoteVersion({
  noteId: note.id,
  userId: user.id,
  content: note.content,
  title: note.title,
});
```

### Check Network Status
```typescript
import { useNetworkStatus } from "@/hooks/use-online-status";

const { isOnline, isChecking } = useNetworkStatus();
```

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/notes_app_db"

# Google AI (for AI completion)
GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# AWS S3 (for image uploads)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="your-bucket-name"
```

---

## 📊 Database Queries

### Get Notes with Full-Text Search
```sql
SELECT * FROM "Note"
WHERE search_vector @@ to_tsquery('english', 'search & term')
ORDER BY ts_rank(search_vector, to_tsquery('english', 'search & term')) DESC;
```

### Get Note Versions
```sql
SELECT * FROM "NoteHistory"
WHERE "noteId" = 'note-id'
ORDER BY "versionNumber" DESC;
```

### Get User's Notes with Tags
```sql
SELECT n.*, t.name as tag_name
FROM "Note" n
LEFT JOIN "_NoteToTag" nt ON n.id = nt."A"
LEFT JOIN "Tag" t ON nt."B" = t."tagId"
WHERE n."userId" = 'user-id';
```

---

## 🐛 Debugging

### Enable Prisma Query Logging
```typescript
// In lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### Check Auto-Save Status
```typescript
// In browser console
localStorage.getItem('offline-note-[note-id]');
```

### Monitor Realtime Events
```typescript
// Subscribe to all events
import { eventEmitter } from "@/lib/pubsub";

eventEmitter.on('*', (event, data) => {
  console.log('Event:', event, 'Data:', data);
});
```

### Check Network Connectivity
```typescript
// In browser console
navigator.onLine; // true/false
fetch('/api/health').then(r => console.log('Connected:', r.ok));
```

---

## 🧪 Testing Commands

```bash
# Run all tests
pnpm test

# Run linter
pnpm lint

# Type check
pnpm type-check

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📦 Useful Scripts

### Reset Database
```bash
pnpm prisma migrate reset
```

### Generate Prisma Client
```bash
pnpm prisma generate
```

### Open Prisma Studio
```bash
pnpm prisma studio
```

### Format Code
```bash
pnpm format
```

---

## 🚨 Common Issues & Solutions

### Issue: Auto-save not working
**Solution:** Check if `contentUpdated` is being set in the store when content changes.

### Issue: AI completion not triggering
**Solution:**
1. Check internet connection
2. Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set
3. Check browser console for errors

### Issue: Full-text search not working
**Solution:** Run the PostgreSQL migration:
```bash
psql -d notes_app_db -f prisma/migrations/add_fulltext_search.sql
```

### Issue: Offline mode not syncing
**Solution:**
1. Check browser console for errors
2. Verify local storage has pending saves
3. Check network status with `/api/health`

### Issue: Versions not being created
**Solution:** Ensure `createNoteVersion()` is called after note updates in the API route.

---

## 📚 Additional Resources

- [Tiptap Documentation](https://tiptap.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [Better Auth](https://www.better-auth.com)

---

## 🤝 Contributing

When adding new features:
1. Update `tasks.md`
2. Add tests
3. Update this documentation
4. Create migration if database changes
5. Update `IMPLEMENTATION_SUMMARY.md`

---

## 📝 Notes

- Auto-save debounce: 2 seconds
- Version history limit: 10 versions per note
- Network check interval: 30 seconds
- Search result limit: 20 per page
- AI completion timeout: 30 seconds

---

**Last Updated:** 2025-11-22
**Version:** 1.0.0
