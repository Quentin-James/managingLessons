# My Learning Journey 🎓

A personal web application to track and organize your coding lessons and learning progress.

## Features ✨

### Lessons Management
- **Track Your Lessons**: Add, edit, and remove coding lessons from your personal learning journey
- **Organize by Difficulty**: Categorize lessons as Beginner, Intermediate, or Advanced
- **Track Time**: Monitor how much time each lesson takes
- **Mark as Done**: Complete lessons with a single click and track completion dates
- **Visual Progress Indicators**: Completed lessons show with green styling, checkmarks, and timestamps
- **Search Functionality**: Real-time search by title, description, or difficulty
- **Smart Organization**: Active and completed lessons displayed in separate sections
- **Progress Tracking**: Visual dashboard showing completion percentage, statistics, and difficulty breakdown
- **localStorage Persistence**: All lessons are automatically saved

### Notes with Integrated Code Editor
- **Personal Notes**: Create detailed notes for your learning insights
- **19 Programming Languages**: Full syntax highlighting support for:
  - **Web/Frontend**: JavaScript, TypeScript, React (JSX), Angular, HTML, CSS, Vue, Sass/SCSS
  - **Backend**: Python, Java, C#, PHP, Go, Rust
  - **Systems**: C++
  - **Data**: JSON, XML, SQL
  - **Documentation**: Markdown
- **Rich Metadata**: Add titles, content, categories, and tags to your notes
- **Auto-Save**: Notes are automatically saved to localStorage
- **Code Snippets**: Optional code examples with language-specific syntax highlighting
- **Search Functionality**: Real-time search by title, content, tags, or category

### Authentication & User Management
- **User Registration**: Create your personal account to start your learning journey
- **Secure Login**: Login with username/email and password
- **Multi-User Support**: Each user has their own separate lessons and notes
- **Data Isolation**: User data stored with userId prefix in localStorage
- **User Badge**: See your username in the header
- **Easy Logout**: Logout button with confirmation

### UI/UX
- **Tab Navigation**: Switch easily between Lessons and Notes
- **Beautiful UI**: Clean, modern interface with Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started 🚀

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Usage 💡

1. **Add a Lesson**: Click the "+ Add New Lesson" button to add a new lesson to your learning journey
2. **Edit a Lesson**: Click the edit (pencil) icon on any lesson card to modify it
3. **Delete a Lesson**: Click the delete (trash) icon to remove a lesson
4. **View Details**: Each lesson card shows the title, description, duration, and difficulty level

## Tech Stack 🛠️

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **Composition API**: Modern Vue development approach
- **CodeMirror 6**: Advanced code editor with syntax highlighting for 19 languages
- **localStorage**: Client-side data persistence

## Project Structure 📁

```
src/
├── components/        # Vue components
│   ├── LessonCard.vue    # Individual lesson card
│   ├── LessonList.vue    # List of lessons
│   ├── LessonForm.vue    # Form to add/edit lessons
│   ├── NoteCard.vue      # Individual note card (with code preview)
│   ├── NotesList.vue     # List of notes
│   ├── NoteForm.vue      # Form to add/edit notes
│   └── CodeEditor.vue    # CodeMirror 6 editor (19 languages)
├── composables/       # Reusable logic
│   ├── useLessons.js     # CRUD operations for lessons (with localStorage)
│   └── useNotes.js       # CRUD operations for notes (with localStorage)
├── assets/           # CSS and static assets
└── App.vue           # Main application with tab navigation
```

## Roadmap 🗺️

- [x] Implement note-taking module with localStorage persistence
- [x] Implement code editor with syntax highlighting in notes
- [x] Implement local storage persistence for lessons
- [ ] Implement progress tracking for lessons
- [ ] Add "mark as done" functionality for lessons
- [ ] Add filtering and sorting capabilities
- [ ] Add authentication and user management
- [ ] Export/import data functionality

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

