# Static File Integration

`gamanStatic` is a middleware to serve static files such as images, JavaScript, CSS, or even HTML from a specified directory (default: `public/`). This middleware is ideal for both SPA and general web server needs.

---

## Installation

you need to install the following packages

```bash
npm install @gaman/static
```

---

## Features

- Auto-detects MIME types (customizable)
- Supports automatic Gzip and Brotli compression
- Supports ETag and caching via `Cache-Control`
- Fallback to `index.html` for SPAs
- Supports path rewriting and hooks for found/not-found files

---

## Options

| Option                | Type                                                    | Default                  | Description                                                       |
| --------------------- | ------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `path`                | `string`                                                | `"public"`               | Root directory for static files                                   |
| `mimes`               | `Record<string, string>`                                | -                        | Custom MIME types based on file extensions                        |
| `priority`            | `Priority`                                              | `"very-high"`            | Middleware execution order                                        |
| `defaultDocument`     | `string`                                                | `"index.html"`           | Default file to serve when a directory is requested               |
| `rewriteRequestPath`  | `(path: string) => string`                              | -                        | Function to transform request path before file resolution         |
| `onFound`             | `(path: string, ctx: Context) => void \| Promise<void>` | -                        | Callback when file is found and sent                              |
| `onNotFound`          | `(path: string, ctx: Context) => void \| Promise<void>` | -                        | Callback when file is not found                                   |
| `cacheControl`        | `string`                                                | `"public, max-age=3600"` | `Cache-Control` header                                            |
| `fallbackToIndexHTML` | `boolean`                                               | `false`                  | Fallback to `index.html` when file is not found (useful for SPAs) |

---

## 🧪 Example

```ts
defineBootstrap((app) => {
  app.registerIntegration(
    gamanStatic({
      path: "assets",
      rewriteRequestPath: (path) => path.replace(/^\/static/, ""),
      fallbackToIndexHTML: true,
      mimes: {
        ".webmanifest": "application/manifest+json",
      },
    })
  );
});
```

---

## Notes

- GamanJS logger is disabled automatically when static files are served to avoid duplicated logs.
- `.br` and `.gz` files will be served automatically if the browser supports `Accept-Encoding`.
