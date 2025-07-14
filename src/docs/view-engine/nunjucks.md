# Nunjucks

GamanJS supports multiple view engines for server-side rendering (SSR). One of the default supported engines is **Nunjucks** — a powerful templating language for HTML.

---

## Installation

To use Nunjucks with GamanJS, install the integration package:

```bash
npm install @gaman/nunjucks
```

---

## Integration

Integrate the Nunjucks view engine in your `main.ts`:

```ts
import mainBlock from "main.block";
import gaman from "gaman";
import nunjucks from "@gaman/nunjucks";

gaman.serv({
  integrations: [
    nunjucks({
      autoescape: true,
      watch: true,
    }),
  ],
  blocks: [mainBlock],
});
```

### Custom View Directory

By default, views are loaded from `src/views`. You can override this by specifying the `viewPath` option:

```ts
nunjucks({
  viewPath: "src/custom-views",
});
```

---

## Directory Structure

```sh
src/
├── views/
│   └── index.njk
```

### Example: `index.njk`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    <h1>Welcome to GamanJS!</h1>
  </body>
</html>
```

---

## Rendering a View

Within a Block, you can render the view using `Response.render()`:

```ts
export default defineBlock({
  path: "/",
  routes: {
    "/": () => {
      return Response.render("index", {
        title: "GamanJS | Web Application Framework",
      });
    },
  },
});
```

This will render the `src/views/index.njk` file and inject the `title` variable.

---

## Summary

- Nunjucks is supported via `@gaman/nunjucks`.
- Place templates in `src/views` by default.
- Use `Response.render(viewName, data)` in route handlers.
- Customize view root using the `viewPath` option.

Other view engines such as Pug, Handlebars, etc. may be supported in the future.

---

> For advanced Nunjucks usage (partials, includes, custom filters), refer to the [Nunjucks documentation](https://mozilla.github.io/nunjucks/).
