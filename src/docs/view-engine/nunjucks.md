# Nunjucks

GamanJS supports multiple view engines for server-side rendering (SSR). One of the default supported engines is **Nunjucks** — a powerful templating language for HTML.

---

## Usage

Nunjucks is now **built-in** to GamanJS, so you no longer need to install a separate package.

Import it directly from the core:

```ts
import { nunjucks } from "gaman/nunjuck";
```

---

## Integration

Integrate the Nunjucks view engine in your `main.ts`:

```ts
import mainBlock from "main.block";
import gaman from "gaman";
import { nunjucks } from "gaman/nunjuck";

gaman.serv({
  integrations: [
    nunjucks({
      // You can configure env and extension here
    }),
  ],
  blocks: [mainBlock],
});
```

---

## Available Options

These are the available options you can pass to the `nunjucks()` integration:

```ts
nunjucks({
  viewPath: "src/views",
  extension: ".njk",
  env: (env) => {
    env.addFilter("uppercase", str => str.toUpperCase());
    env.addGlobal("appName", "GamanJS");
  }
});
```

### `viewPath`

Path to your views directory. Default: `src/views`

### `extension`

File extension for your templates. Default: `.njk`

You can change it if you prefer `.html`, for example:

```ts
extension: ".html" // will render `index.html`
```

### `env`

Use this to customize the Nunjucks environment. You can pass a function or an array of functions:

```ts
env: [
  env => env.addFilter("upper", str => str.toUpperCase()),
  env => env.addGlobal("title", "My Site")
]
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

* Nunjucks is now built-in — no need to install `@gaman/nunjucks`.
* Place templates in `src/views` by default.
* Use `Response.render(viewName, data)` in route handlers.
* Customize view root using the `viewPath` option.
* Add filters/globals with `env()`
* Change file extension using `extension`

Other view engines such as Pug, Handlebars, etc. may be supported in the future.

---

> For advanced Nunjucks usage (partials, includes, custom filters), refer to the [Nunjucks documentation](https://mozilla.github.io/nunjucks/).
