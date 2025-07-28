# Quick Start

GamanJS is a modular and efficient backend framework designed for simplicity and performance. Follow the steps below to quickly get started with your first GamanJS project.

### Language

GamanJS is specifically designed to work with modern`TypeScript` using the ECMAScript Module (ESM) system. This means all modules must be written using `import` and `export` syntax—CommonJS (`require`, `module.exports`) is not supported. If you're building a project with GamanJS, make sure your environment and codebase are fully ESM-compatible.

### Prerequisites

Please make sure that `Node.js` (version >= 18.x) is installed on your operating system.

---

## Create a New Project

There are two ways to scaffold a new GamanJS project:

```bash
npm create gaman@latest
```

### Project Structure

After creating a new project, your file structure will look like this:

```css
src/
├── index.ts
├── main.block.ts
├── main.routes.ts
└── main.services.ts
```

| File             | description                                             |
| ---------------- | ------------------------------------------------------- |
| main.ts          | App entry point. Runs and loads all modules.            |
| main.block.ts    | Module for registers routes, services, and middleware.. |
| main.routes.ts   | Defines HTTP routes handler                             |
| main.services.ts | Contains the business logic.                            |
