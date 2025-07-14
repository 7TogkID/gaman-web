# Static

Serve static files easily with GamanJS integration for static assets.

## Features

- Serve static files like HTML, CSS, JavaScript, images, and more.
- Customizable static file directory.
- Supports additional MIME type mappings.

---

## Installation

Install the package using your favorite package manager:

```bash
npm install @gaman/static
```

---

## Usage

### 1. **Initialize Integration**

Configure the static file integration in your `main.ts` file:

```ts
import gaman from "gaman";
import { staticGaman } from "@gaman/static";
import blocks from "./blocks";

gaman.serv({
  integrations: [
    staticGaman({
      path: "custom", // Default is 'public'
      newMimeTypes: { ".webp": "image/webp" },
    }),
  ],
  blocks: [blocks],
});
```

---

### 2. **Organize Static Files**

Place your static files in the `public` directory (or your custom directory if configured).

Example structure:

```plaintext
project-root/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── images/
│       └── logo.png
└── src/
    ├── blocks/
    │   └── main.block.ts
    └── main.ts
```

---

### 3. **Access Static Files**

Once the integration is configured, you can access static files directly by their relative path.

For example:

- `http://localhost:3000/index.html`
- `http://localhost:3000/styles.css`
- `http://localhost:3000/images/logo.png`

---

## Options

| Option         | Type                     | Description                               | Default  |
| -------------- | ------------------------ | ----------------------------------------- | -------- |
| `path`         | `string`                 | Directory to serve static files from.     | `public` |
| `newMimeTypes` | `Record<string, string>` | Additional MIME type mappings.            | `{}`     |
| `priority`     | `Priority`               | Priority for this integration in GamanJS. | `low`    |

---

## Adding MIME Types

Extend MIME type support by specifying additional mappings:

```ts
staticGaman({
  newMimeTypes: {
    ".webp": "image/webp",
    ".mkv": "video/x-matroska",
  },
});
```

---

## FAQ

### **Q: What is the default directory for static files?**

The default directory is `public`.

### **Q: Can I serve files from a custom directory?**

Yes, specify the custom directory using the `path` option:

```ts
staticGaman({ path: "static" });
```

### **Q: How do I handle unsupported MIME types?**

Add the required MIME types using the `newMimeTypes` option:

```ts
newMimeTypes: { ".xyz": "application/xyz" }
```

---

Effortlessly serve static files in your GamanJS projects with @gaman/static!
