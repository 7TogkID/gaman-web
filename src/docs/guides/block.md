# Block

## Overview

The `defineBlock` function in GamanJS is a powerful abstraction for organizing services, routes, middlewares, and dependencies into a cohesive unit. Blocks are reusable, isolated modules that can be composed together to form a full-featured application structure.

## Purpose

Blocks serve as the foundation for modular architecture in GamanJS. Each block can encapsulate:

- Services
- Routes
- Middlewares
- Nested blocks (submodules)
- Custom error handlers

## Structure

A block is defined using the `defineBlock()` function and typically exported from a file such as `*.block.ts`.

### Key Properties

- `path?`: The base path prefix for all routes in this block.
- `includes?`: Middleware functions to apply within the block.
- `blocks?`: Nested blocks to support hierarchical composition.
- `priority?`: Determines the execution order of blocks.
- `error?`: Custom error handler for exceptions thrown inside the block.
- `404?`: Handler for undefined routes in this block.
- `services?`: Service factory functions to be used inside this block.
- `depedencies?`: External dependencies (e.g., Prisma, Logger).
- `routes?`: Route factories associated with this block.

## Usage Example

```ts
// example.block.ts
export default defineBlock({
  path: "/user",
  services: {
    userService,
  },
  routes: [userRoutes],
});
```

After that, you can add your block to `main.block.ts`

```ts
// main.block.ts
export default defineBlock({
  path: "/",
  blocks: [userBlock],
});
```

## Best Practices

- Group related logic (routes + services) into their own block.
- Use `includes` for reusable middlewares.
- Use `priority` to control registration order for overlapping paths.
- Compose blocks using the `blocks` array for scalable structure.

## Benefits

- Encourages separation of concerns.
- Promotes reusability and testability.
- Enables clear hierarchical module structure.

## Summary

Blocks in GamanJS are a flexible and powerful way to build modular backend applications. They unify routing, services, and context-based dependencies in a clean, declarative format that supports scaling and maintainability.
