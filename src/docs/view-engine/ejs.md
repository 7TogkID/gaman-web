# EJS

GamanJS also supports **EJS (Embedded JavaScript Templates)** as one of its view engines for server-side rendering. EJS is known for its simplicity and compatibility with regular HTML.

---

## Installation

you need to install the following packages

```bash
npm install @gaman/ejs
```

---

## Integration

Integrate the EJS view engine in your `index.ts`:

```ts
defineBootstrap((app) => {
  app.registerIntegration(
    ejs({
      cache: false,
    })
  );
});
```

### Custom View Directory

By default, views are loaded from `src/views`. To customize the view root directory:

```ts
ejs({
  viewPath: "src/custom-views",
});
```

---

## Directory Structure

```sh
src/
├── views/
│   └── index.ejs
```

### Example: `index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <h1>Welcome to GamanJS with EJS!</h1>
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

This will render the `src/views/index.ejs` file with the provided `title` variable.

---

## Summary

- Views are located in `src/views` by default.
- Render templates using `Response.render(viewName, data)`.
- Customize the view path with the `viewPath` option.

Other view engines such as **Pug**, **Handlebars**, etc. may be supported in the future.

---

> For more on EJS templating features like includes, partials, and conditionals, visit the [EJS documentation](https://ejs.co/).
