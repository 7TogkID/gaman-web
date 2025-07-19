import { defineTree, Response } from "gaman";
import fs from "fs/promises";
import { marked } from "marked";

const links = [
  {
    name: "Getting Started",

    items: [
      {
        name: "Quick Start",
        description:
          "GamanJS is a modular and efficient backend framework designed for simplicity and performance. Follow the steps below to quickly get started with your first GamanJS project.",
        href: "getting-started/quick-start",
      },
    ],
  },
  {
    name: "Guides",
    items: [
      {
        name: "Block",
        description:
          "Blocks are designed to simplify the development process by consolidating routing.",
        href: "guides/block",
      },
      {
        name: "Children",
        description:
          "Block Children are an advanced feature in GamanJS that allow you to organize routing hierarchically within a parent Block. Using the `childrens` property, you can embed additional sub-Blocks that operate only within the context of the main Block.",
        href: "guides/block-children",
      },
      {
        name: "Routing",
        description:
          "The GamanJS routing system is designed to be flexible and intuitive, using a tree-like structure to represent routes.",
        href: "guides/routing",
      },
      {
        name: "Tree",
        description:
          "The GamanJS routing system is designed to be flexible and intuitive, using a tree-like structure to represent routes.",
        href: "guides/tree",
      },
      {
        name: "Middleware",
        description:
          "Middleware in GamanJS provides a powerful way to process requests before they reach the route handler.",
        href: "guides/middleware",
      },
      {
        name: "Websocket",
        description:
          "The WebSocket for GamanJS provides an easy-to-use interface for handling WebSocket connections.",
        href: "guides/websocket",
      },
    ],
  },
  {
    name: "Helpers",
    items: [
      {
        name: "Cookies",
        description:
          "GamanJS provides a simple and expressive API to manage HTTP cookies. Using the `ctx.cookies` object, you can easily **set**, **get**, **check**, and **delete** cookies in your routes and middlewares.",
        href: "helpers/cookies",
      },
      {
        name: "Locals",
        description:
          "GamanJS provides a simple `ctx.locals` object to store and pass data between middlewares and route handlers during a single request lifecycle.",
        href: "helpers/locals",
      },
      {
        name: "Logger",
        description:
          "The `Logger` utility offers an easy-to-use interface for logging messages at different levels of severity.",
        href: "helpers/logger",
      },
      {
        name: "TextFormat",
        description:
          "The TextFormat utility provides ANSI escape codes for styling terminal output, such as applying colors, bold, italic, underline, and other text effects. It also includes a format() method for applying styles using Minecraft-style formatting codes.",
        href: "helpers/textformat",
      },
    ],
  },
  {
    name: "Packages",
    items: [
      {
        name: "CORS",
        description:
          "CORS Middleware for Gaman. Implements Cross-Origin Resource Sharing (CORS) with customizable options.",
        href: "packages/cors",
      },
      {
        name: "Basic-Auth",
        description:
          "Basic Authentication Middleware for Gaman. Provides secure HTTP Basic Authentication with flexible configuration options.",
        href: "packages/basic-auth",
      },
      {
        name: "Static",
        description:
          "Serve static files easily with GamanJS integration for static assets.",
        href: "packages/static",
      },
    ],
  },
  {
    name: "View Engine",
    items: [
      {
        name: "Nunjucks",
        description:
          "GamanJS supports multiple view engines for server-side rendering (SSR). One of the default supported engines is **Nunjucks** — a powerful templating language for HTML.",
        href: "view-engine/nunjucks",
      },
      {
        name: "EJS",
        description:
          "GamanJS also supports **EJS (Embedded JavaScript Templates)** as one of its view engines for server-side rendering. EJS is known for its simplicity and compatibility with regular HTML.",
        href: "view-engine/ejs",
      },
    ],
  },
  {
    name: "API",
    items: [
      {
        name: "Integration",
        description:
          "The Integration API allows you to extend your application's functionality through a modular integration system. Each integration follows a lifecycle pattern with hooks for different stages of the application's execution.",
        href: "api/integration",
      }
    ],
  },
];


export default defineTree({
  "/docs/": () => Response.redirect("/docs/getting-started/quick-start"),
  "/docs/:category/:name": async (ctx) => {

    try {
      const { category, name } = ctx.params;
      const pathName = `${category}/${name}`;
      let item: any;
      const link = links.find((l) => {
        item = l.items.find((i: any) => i.href == pathName);
        return item;
      });

      const content = await fs.readFile(`src/docs/${pathName}.md`, "utf-8");
      const html = marked(content);
      const flatList = links.flatMap((l) => l.items);
      const index = flatList.findIndex((i) => i.href === pathName);
      const prev = index > 0 ? flatList[index - 1] : null;
      const next = index < flatList.length - 1 ? flatList[index + 1] : null;

      return Response.render("template/docs-layout", {
        title: item.name,
        description: item.description,
        item,
        link,
        docs: html,
        links,
        prev,
        next,
        currentPath: pathName,
        footer: false,
      });
    } catch {
      return Response.text("Not Found", { status: 404 });
    }
  },
});
