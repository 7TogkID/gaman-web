# Module Structure

GamanJS uses a modular structure to organize application features cleanly and scalably. Each module consists of **three primary files**:

![GamanJS Module](/img/workflow/module-transparent.png)

---

## Block

`*.block.ts`: This file is the heart of your module. For example, if you're building a `user` module, then `user.block.ts` serves as its core. It's where you register the module's routes, services, dependencies, middlewares, and more.

```ts name="asdad"
export default defineBlock({
  path: "/user",
  routes: [userRoutes],
  services: {
    appService: userService,
  },
  dependencies: {
    database: new PrismaClient(),
  },
});
```

## Routes

`*.routes.ts`: This file is where you define your routes, such as `/user/create`, etc. Make sure to keep your route definitions clean and simple — that’s why we separate the logic into services. Let your services handle the “messy” parts, while the routes stay clean and organized.

```ts
interface Deps {
  database: PrismaClient;
  appService: ReturnType<typeof userService>;
}

export default defineRoutes(({ database, appService }: Deps) => ({
  "/create": async (ctx) => {
    await appService.createUser(ctx.param("name"));
    return r.json({ message: "OK!" });
  },
  "/find": async (ctx) => {
    const users = await appService.findUser();
    return users;
  },
}));
```

## Service

`*.service.ts`: This file is used to define your core business logic and helper functions. It's recommended to avoid making any HTTP responses or requests directly in service files.

```ts
interface Deps {
  database: PrismaClient;
}

export default defineService(({ database }: Deps) => ({
  createUser: async (name) => {
    await database.insert({ name });
  },
  findUser: async () => {
    return await database.findMany({});
  },
}));
```

---

### Tips

- Always name files with the same prefix to ensure they’re grouped correctly.
- Keep logic isolated: avoid mixing route and business logic in the same file.
- For larger apps, use folders to logically separate modules (`auth/`, `admin/`, etc).

---

> GamanJS modules provide a simple but powerful structure that scales well as your application grows.
