import { defineTree, Response } from "gaman";
import fs from "fs/promises";
import { marked } from "marked";

const links = [
  {
    name: "Getting Started",
    items: [
      {
        name: "Quick Start",
        href: "getting-started/quick-start",
      },
    ],
  },
  {
    name: "Guides",
    items: [
      {
        name: "Block",
        href: "guides/block",
      },
      {
        name: "Children",
        href: "guides/block-children",
      },
      {
        name: "Routing",
        href: "guides/routing",
      },
      {
        name: "Tree",
        href: "guides/tree",
      },
      {
        name: "Middleware",
        href: "guides/middleware",
      },
      {
        name: "Websocket",
        href: "guides/websocket",
      },
    ],
  },
  {
    name: "Helpers",
    items: [
      {
        name: "Cookies",
        href: "helpers/cookies",
      },
      {
        name: "Locals",
        href: "helpers/locals",
      },
      {
        name: "Logger",
        href: "helpers/logger",
      },
    ],
  },
  {
    name: "Packages",
    items: [
      {
        name: "CORS",
        href: "packages/cors",
      },
      {
        name: "Basic-Auth",
        href: "packages/basic-auth",
      },
      {
        name: "Static",
        href: "packages/static",
      },
    ],
  },
  {
    name: "View Engine",
    items: [
      {
        name: "Nunjucks",
        href: "view-engine/nunjucks",
      },
      {
        name: "EJS",
        href: "view-engine/ejs",
      },
    ],
  },
];

export default defineTree({
  "/docs/": () => Response.redirect("/docs/getting-started/quick-start"),
  "/docs/:category/:name": async (ctx) => {
    try {
      const { category, name } = ctx.params;
      const path = `${category}/${name}`;
      let item: any;
      const link = links.find((l) => {
        item = l.items.find((i) => i.href == path);
        return item;
      });

      const content = await fs.readFile(`src/docs/${path}.md`, "utf-8");

      const html = marked(content);
      const flatList = links.flatMap((l) => l.items);
      const index = flatList.findIndex((i) => i.href === path);
      const prev = index > 0 ? flatList[index - 1] : null;
      const next = index < flatList.length - 1 ? flatList[index + 1] : null;

      return Response.render("template/docs-layout", {
        title: item.name,
        item,
        link,
        docs: html,
        links,
        prev,
        next,
        currentPath: path,
      });
    } catch {}
  },
});
