# List of tasks for this app

## Application description, build flow and things to take note of

> Built a feature-rich note-taking app with auto-save, tagging, and full-text search. Demonstrates real-time data persistence, conflict resolution for concurrent edits, and database indexing for search performance.

## Completed tasks

### Top priority

[x] Ensure that editor content changes or updates as current is changed accurately
[x] Create, read, update, and delete notes
[x] Archive notes
[x] Search notes by title, tag, and content
[x] Select color and font themes
[x] Make sure to check and ensure that zod is used everywhere for form validation.

### Low priority

[ ] Add realtime features.
[ ] Check on how to parse the db note content at the moment of comparison and more for efficient filtering of the query passed on the input search box.
[ ] Add Keyboard navigation for all features
[ ] Auto-save with debouncing and add keyboard shortcuts
[ ] Note versioning
[ ] Full-text search with PostgreSQL or Elasticsearch, conflict resolution for concurrent

[ ] Add shortcuts (keyboard) for most activities (e.g save, update and more)
[ ] Add auto completion in the text editor powered by ai.

### Not really necessary

[] Add note sharing with permissions (view-only and edit), version history and edit
[] Add simple diagram draw tool bar and more.

## Incomplete tasks

[] View all notes and archived notes separately
[] View notes filtered by specific tags
[] Form validation for required fields (with zod)
[] Markdown support with preview

### Things to take note of and learn from

> Auto-save functionality teaches you about debouncing, optimistic UI updates, and graceful error handling. These patterns appear in most production applications.
