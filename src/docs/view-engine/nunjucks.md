# Nunjucks

GamanJS supports multiple view engines for server-side rendering (SSR). One of the default supported engines is **Nunjucks** — a powerful templating language for HTML.

---

## Installation

you need to install the following packages

```bash
npm install @gaman/nunjucks
```

---

## Integration

Integrate the Nunjucks view engine in your `index.ts`:

```ts
defineBootstrap((app) => {
  app.registerIntegration(
    nunjucks({
      // You can configure env and extension here
    })
  );
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
    env.addFilter("uppercase", (str) => str.toUpperCase());
    env.addGlobal("appName", "GamanJS");
  },
});
```

### `viewPath`

Path to your views directory. Default: `src/views`

### `extension`

File extension for your templates. Default: `.njk`

You can change it if you prefer `.html`, for example:

```ts
extension: ".html"; // will render `index.html`
```

### `env`

Use this to customize the Nunjucks environment. You can pass a function or an array of functions:

```ts
env: [
  (env) => env.addFilter("upper", (str) => str.toUpperCase()),
  (env) => env.addGlobal("title", "My Site"),
];
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

Inside a Routes, render views using `r.render()`:

```ts
export default defineRoutes(() => ({
  "/": () => {
    return r.render("index", {
      title: "GamanJS | Web Application Framework",
    });
  },
}));
```

This will render the `src/views/index.njk` file and inject the `title` variable.

---

## Summary

- Place templates in `src/views` by default.
- Use `Response.render(viewName, data)` in route handlers.
- Customize view root using the `viewPath` option.
- Add filters/globals with `env()`
- Change file extension using `extension`

Other view engines such as Pug, Handlebars, etc. may be supported in the future.

---

> For advanced Nunjucks usage (partials, includes, custom filters), refer to the [Nunjucks documentation](https://mozilla.github.io/nunjucks/).
