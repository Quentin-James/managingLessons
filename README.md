# My Learning Journey 🎓

A personal web application to track and organize your coding lessons and learning progress.

## Features ✨

- **Track Your Lessons**: Add, edit, and remove coding lessons from your personal learning journey
- **Organize by Difficulty**: Categorize lessons as Beginner, Intermediate, or Advanced
- **Track Time**: Monitor how much time each lesson takes
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

## Project Structure 📁

```
src/
├── components/        # Vue components
│   ├── LessonCard.vue    # Individual lesson card
│   ├── LessonList.vue    # List of lessons
│   └── LessonForm.vue    # Form to add/edit lessons
├── composables/       # Reusable logic
│   └── useLessons.js     # CRUD operations for lessons
├── assets/           # CSS and static assets
└── App.vue           # Main application component
```

## Roadmap 🗺️

- [ ] Implement local storage persistence
- [ ] Add note-taking module
- [ ] Add filtering and sorting capabilities
- [ ] Implement progress tracking
- [ ] Add authentication and user management

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

