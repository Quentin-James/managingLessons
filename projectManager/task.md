# Project Tasks

This document tracks all development tasks for the My Learning Journey application (personal coding lesson tracker).

## Done
- [X] Initial setup of project-manager documentation (`generalObject.md`, `stylingGuid.md`, `task.md`).
- [X] Initial setup of the project — Tailwind CSS v4 installed with @tailwindcss/postcss, base components created (LessonCard, LessonList), App.vue updated with sample lessons data and Lesson Manager UI. PostCSS configuration fixed. (Completed 2025-12-18)
- [X] Implement lesson CRUD functionality (create/read/update/delete) — Created useLessons composable with all CRUD operations, LessonForm component for add/edit, updated LessonCard with edit/delete buttons, and integrated full CRUD flow in App.vue. Fixed event handling bug in LessonList and repositioned app as personal learner tool. (Completed 2025-12-18)
- [X] Implement a note-taking module — Created useNotes composable with full CRUD operations and localStorage persistence, NoteCard/NoteForm/NotesList components, integrated tab navigation in App.vue. Notes support title, content, timestamp, tags, and categories. (Completed 2025-12-18)
- [X] Implement coding terminal inside notes for making coding notes — Integrated CodeMirror 6 editor with syntax highlighting for 19 programming languages: JavaScript, TypeScript, React (JSX), Angular, Python, Java, C#, C++, Rust, Go, PHP, HTML, CSS, Vue, Sass/SCSS, JSON, XML, SQL, and Markdown. Notes now support optional code snippets with language selection. Updated NoteCard to display code snippets. (Completed 2025-12-18)
- [X] Implement local storage persistence (localStorage) for lessons and notes — Both useLessons and useNotes composables now auto-save to localStorage with reactive watch. Data persists across browser sessions. (Completed 2025-12-18)
- [X] Implement button that marks lessons as done — Added toggleCompleted function to useLessons, updated LessonCard with "Mark as Done/Undone" button, visual indicators (green border, checkmark badge, strikethrough), and completion timestamp. Completed lessons show when they were finished. Fixed missing import and updated button styling to follow guide. (Completed 2025-12-18)
- [X] Implement lesson search and notes search, plus put in a reserved place the lesson done — Created SearchBar component, added search functionality to LessonList and NotesList with real-time filtering by title, description, difficulty, tags, and category. Separated active and completed lessons into distinct sections with counters. (Completed 2025-12-18)
- [X] Implement progress tracking for lessons — Created ProgressTracker component with overall completion percentage, statistics cards (total, completed, active, total time), and difficulty breakdown with visual progress bars. Integrated into Lessons tab. (Completed 2025-12-18)
- [X] Add authentication and user management — Created useAuth composable with register/login/logout functionality, LoginForm component with toggle between login and register modes, updated useLessons and useNotes to store data per user (userId prefix in localStorage keys), added user badge and logout button in header, protected app with authentication guard. Users can now have separate learning journeys. (Completed 2025-12-18)

## To Do
- [ ] Add export/import functionality for lessons and notes (JSON/CSV)
- [ ] Add statistics dashboard with charts and visualizations
- [ ] Add dark mode toggle
- [ ] Add keyboard shortcuts for common actions
- [ ] Implement lesson categories and filtering
- [ ] Add calendar view for completed lessons





