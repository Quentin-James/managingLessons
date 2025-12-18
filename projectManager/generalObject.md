# General project objectives

This document presents the main objectives and guiding principles for the development of a personal learning management web application for coding lessons.

## Main objectives

1.  Provide a personal platform to organize and track programming lessons (courses, exercises, solutions) for individual learners.
2.  Track personal progress: learning goals, milestones, assessments and achievement history.
3.  Enable personalization of learning paths (guided paths, modular courses, adaptive difficulty levels).
4.  Ensure local persistence and offline resilience (progressive synchronization, local storage via IndexedDB/localStorage, pending upload queues).
5.  Integrate educational APIs and external tools (online code editors, automated grading services, LMS platforms) in a secure and modular way.

## Key principles

*   Learner-centered: clear interfaces, immediate feedback, measurable progression and personalized recommendations.
*   Client-side data control: allow users to manage their lessons and progress locally, with options for backup and export.
*   Accessibility and inclusivity: follow WCAG best practices, provide alternative formats and keyboard navigation.
*   Performance and responsiveness: fast loading, interactive experiences (editor, local unit tests) and resource optimization.
*   Maintainability: readable code, modular components, documentation and tests to ease project evolution.
*   Security (client & integrations): protect sensitive data, handle API keys on the server when necessary, and validate content exchanged with external services.

This document will serve as the basis for defining functional and technical specifications for the project's iterations.
