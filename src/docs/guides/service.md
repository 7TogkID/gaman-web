# Service

The `defineService()` function is used to create reusable logic units (services) that can be injected into your application's routes or other services. These services can contain any asynchronous or synchronous logic, such as database queries, business logic, or external API calls.

## Example

```ts
interface Deps {
  prisma: PrismaClient;
}

export default defineService(({ prisma }: Deps) => ({
  getBlogs: async () => {
    return prisma.blog.findMany();
  },
}));
```

## Dependencies (Deps)

The `Deps` object passed to the service contains all external dependencies required by the service. This can include:

- Prisma client (`prisma`)
- Other services (e.g., `userService`, `blogService`)

You can access services inside other services. The GamanJS framework supports this through its built-in Proxy system inside `defineBlock()`, so circular or chained service dependencies are resolved automatically.

### Example with Service Dependency

```ts
interface Deps {
  prisma: PrismaClient;
  userService: ReturnType<typeof userService>;
}

export default defineService(({ prisma, userService }: Deps) => ({
  getUserBlogs: async (username: string) => {
    const userId = await userService.getId(username);
    return prisma.blog.findMany({ where: { userId } });
  },
}));
```

In this example, the `blogService` depends on `userService`, showing how services can consume each other cleanly.

## Deps are Injected from Blocks

The `Deps` provided to a service are injected automatically from the `defineBlock()` function. This means you don't manually pass the dependencies when calling the service — instead, the framework handles this for you.

### Example Block with Dependencies and Services

```ts
export default defineBlock({
  dependencies: {
    prisma: new PrismaClient(),
  },
  services: {
    userService,
    blogService,
  },
});
```

In this block:

- `prisma` is defined in `dependencies`
- `userService` and `blogService` are defined in `services`

Both will be injected into each service's `Deps` object automatically. This makes service logic clean and declarative, avoiding manual wiring and reducing boilerplate.
