# Project Tasks

This document tracks all development tasks for the My Learning Journey application (personal coding lesson tracker).

## Done
- [X] Initial setup of project-manager documentation (`generalObject.md`, `stylingGuid.md`, `task.md`).
- [X] Initial setup of the project — Tailwind CSS v4 installed with @tailwindcss/postcss, base components created (LessonCard, LessonList), App.vue updated with sample lessons data and Lesson Manager UI. PostCSS configuration fixed. (Completed 2025-12-18)
- [X] Implement lesson CRUD functionality (create/read/update/delete) — Created useLessons composable with all CRUD operations, LessonForm component for add/edit, updated LessonCard with edit/delete buttons, and integrated full CRUD flow in App.vue. Fixed event handling bug in LessonList and repositioned app as personal learner tool. (Completed 2025-12-18)

## To Do
- [ ] Implement a note-taking module that allows users to create, edit, view, and delete notes. Each note can include a title, content (rich text or plain text), a timestamp, and optional tags or categories. The notes are stored locally (e.g., localStorage) or persisted via an API (for future backend integration).
- [ ] Implement local storage persistence (IndexedDB or localStorage)
- [ ] Add filtering and sorting capabilities
- [ ] Implement progress tracking for lessons
- [ ] Add authentication and user management
