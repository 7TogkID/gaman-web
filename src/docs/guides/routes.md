# Routes

The `Routes` system in GamanJS is a declarative and modular way to define the application's endpoints. It allows developers to structure their route logic using dependency injection and per-path method definitions.

## Overview

Routes are defined using the `defineRoutes()` helper function, which accepts a factory function. This factory receives a context object (usually called `Deps`) containing services or other dependencies.

### Usage

Routes are defined in `*.routes.ts` files and typically look like this:

```ts
interface Deps {
  blogService: ReturnType<typeof blogService>;
}

export default defineRoutes(({ blogService }: Deps) => ({
  "/blogs": {
    GET: async () => {
      return await blogService.findAll();
    },
    POST: async ({ body }) => {
      return await blogService.create(body);
    },
  },

  "/blogs/:id": {
    GET: async ({ params }) => {
      return await blogService.findOne(+params.id);
    },
    PUT: async ({ params, body }) => {
      return await blogService.update(+params.id, body);
    },
    DELETE: async ({ params }) => {
      return await blogService.delete(+params.id);
    },
  },
}));
```

## Interface: `Deps`

This interface defines the dependencies passed into the route factory. Typically, you will pass any required services like Prisma client, or business logic services.

```ts
interface Deps {
  prisma: PrismaClient;
  blogService: ReturnType<typeof blogService>;
  userService: ReturnType<typeof userService>;
}
```

## Method Definitions

Routes support standard HTTP methods including `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. Each method receives a context object that contains the following:

- `params` – URL parameters
- `query` – Query string
- `body` – Parsed request body
- `headers` – Request headers

Example:

```ts
'/users/:id': {
  GET: async ({ params }) => {
    return await userService.findOne(params.id);
  },
},
```

## Return Value

Each route should return a valid JSON-serializable response or use GamanJS helpers like `Res.json()`, `Res.status()`, etc.

## Benefits

- Clear separation of logic per route
- Dependency injected services for better testability
- Full control over HTTP method handlers
- Ideal for modular architecture when used alongside `defineBlock()`

## Best Practices

- Use `*.routes.ts` filename convention
- Keep route logic thin, delegate to services
- Reuse shared logic via context/services
- Use `@gaman/common` helpers for response formatting

---

This routing system gives developers the flexibility of REST-style route definitions while still enabling modular dependency injection like in frameworks such as NestJS or Laravel.

To register the routes in a block, simply add it in the `routes` array of `defineBlock()`:

```ts
export default defineBlock({
  routes: [blogRoutes],
});
```

This design enables powerful composition of features per domain or module in your app.
