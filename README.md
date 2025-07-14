<p align="right">
  <img src=".github/images/indonesia.png" height="23px">
</p>

<p align="center">
  <a href="https://github.com/7TogkID/gaman">
    <img src=".github/images/gaman.png" width="25%">
  </a>
</p>

<h1 align="center">GamanJS</h1>
<p align="center">
  <strong>GamanJS is a modern backend framework built for resilience, scalability, and simplicity.</strong>
</p>

---

## 🧠 Philosophy

"Gaman" (我慢) — patience, perseverance, and resilience. These principles are at the heart of GamanJS, empowering developers to build robust and modular web applications effortlessly.

## ✨ Features

- **Tree Routing & Modular Architecture:** GamanJS introduces the concept of Blocks for routing and modularity. Blocks are self-contained modules that handle specific paths, making your application scalable and maintainable.
- **Simple Middleware:** Easily attach middleware for routes or specific paths.
- **Extensible Design:** Add your logic to enhance or modify the framework with minimal effort.
- **Lightweight & Performant:** Built with efficiency in mind, GamanJS is designed to handle real-world applications with ease.

## 🚀 Get Started
For complete documentation, examples, and best practices, visit the **GamanWiki**:  
[https://github.com/7TogkID/gaman/wiki](https://github.com/7TogkID/gaman/wiki)

### Install the CLI

You can install the GamanJS CLI globally using your preferred package manager:

```bash
npm i -g @gaman/cli 
```

### Create a New Project

To create a new GamanJS project, use the `gaman new` command:

```bash
gaman new
```

This will scaffold a new GamanJS project with the necessary structure.

### Run Your Project

Start your server with:

```bash
# Using Node
npm run dev
```

## 🛠 Updating the CLI

To update your GamanJS CLI to the latest version:

```bash
gaman upgrade
```

## 📂 Project Structure

After creating a new project, your file structure will look like this:

```css
src/
├── main.ts
├── main.block.ts
```

## ✏️ Example Code

Here’s a quick example to get you started: <br>
`src/main.ts`

```ts
import mainBlock from "main.block";
import gaman from "gaman";

gaman.serv({
  blocks: [mainBlock], // your blocks
  server: {
    port: 3431, // optional
    host: "0.0.0.0", // optional
  },
});
```

`src/main.block.ts`

```ts
import { defineBlock, Response } from "gaman";

export default defineBlock({
  path: "/",
  all: (ctx) => {
    console.log("middleware ALL");
  },
  routes: {
    "/": (ctx) => {
      return Response.json({ message: "❤️ Welcome to GamanJS" });
    },
    "/article/*": (ctx) => {
      ctx.locals.userName = "Angga7Togk"; // set data locals
    },
    "/article": {
      POST: [
        async (ctx) => {
          const json = await ctx.json();
          return Response.json(json /**return JSON */, { status: 200 });
        },
      ],
      "/json": {
        GET: (ctx) => {
          const userName = ctx.locals.userName;

          // return like Response.json()
          return {
            user_name_from_local: userName,
          };
        },
      },
      "/text": {
        GET: (ctx) => {
          const userName = ctx.locals.userName;

          // return like Response.text()
          return userName;
        },
      },
    },
  },
});
```

Happy coding! ❤️ GamanJS Team
