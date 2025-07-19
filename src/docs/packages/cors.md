# CORS

CORS Middleware for Gaman. Implements Cross-Origin Resource Sharing (CORS) with customizable options.

## Features

* Easy setup for Cross-Origin Resource Sharing (CORS).
* Global or route-specific middleware support.
* Handles preflight requests automatically.

---

## Usage

### 1. **Global Middleware**

Apply the CORS middleware globally to all routes:

```ts
import { defineBlock, Response } from "gaman";
import { cors } from "gaman/cors";

const blocks = defineBlock({
  includes: [cors({ origin: "*" })], // Global CORS middleware
  routes: {
    "/": async (ctx) => {
      return Response.json({ message: "Global CORS applied!" });
    },
  },
});

export default blocks;
```

---

### 2. **Route-Specific Middleware**

Apply CORS middleware only to specific routes:

```ts
import { defineBlock, Response } from "gaman";
import { cors } from "gaman/cors";

const blocks = defineBlock({
  routes: {
    "/public": async (ctx) => {
      return Response.json({ message: "No CORS restrictions here!" });
    },
    "/private/*": cors({ origin: ["https://example.com"] }), // Specific middleware
    "/private/data": async (ctx) => {
      return Response.json({ message: "Restricted to example.com" });
    },
  },
});

export default blocks;
```

---

## Configuration Options

Customize CORS behavior using these options:

| Option          | Type                     | Description                                              | Default                                               |
| --------------- | ------------------------ | -------------------------------------------------------- | ----------------------------------------------------- |
| `origin`        | `string, string[], null` | Allowed origin(s) for the request.                       | `*` (all origins)                                     |
| `allowMethods`  | `string[]`               | HTTP methods allowed for the request.                    | `["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"]` |
| `allowHeaders`  | `string[]`               | Headers allowed in the request.                          | `["Content-Type", "Authorization"]`                   |
| `maxAge`        | `number`                 | Maximum cache age for preflight requests (in seconds).   | `undefined`                                           |
| `credentials`   | `boolean`                | Include credentials (cookies, HTTP auth) in the request. | `false`                                               |
| `exposeHeaders` | `string[]`               | Headers exposed to the client in the response.           | `undefined`                                           |

---

## Examples

### **CORS with Credentials**

```ts
import { defineBlock, Response } from "gaman";
import { cors } from "gaman/cors";

const blocks = defineBlock({
  includes: [
    cors({
      origin: "https://mywebsite.com",
      credentials: true,
    }),
  ],
  routes: {
    "/secure": async (ctx) => {
      return Response.json({ message: "CORS with credentials enabled!" });
    },
  },
});

export default blocks;
```

---

### **Custom Headers and Methods**

```ts
import { defineBlock, Response } from "gaman";
import { cors } from "gaman/cors";

const blocks = defineBlock({
  includes: [
    cors({
      origin: "*",
      allowMethods: ["GET", "POST"],
      allowHeaders: ["X-Custom-Header", "Authorization"],
      maxAge: 86400, // Cache for 1 day
    }),
  ],
  routes: {
    "/custom": async (ctx) => {
      return Response.json({
        message: "CORS with custom headers and methods!",
      });
    },
  },
});

export default blocks;
```

---

## Tips

* Use `origin` with a list of domains to restrict access to specific origins.
* Set `maxAge` to improve performance by reducing preflight requests.

---

## FAQ

### **Q: What is CORS?**

CORS stands for Cross-Origin Resource Sharing, a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated.

### **Q: Why use this middleware?**

The middleware simplifies setting up CORS policies, reducing the need for repetitive boilerplate code.

---

Empower your GamanJS applications with robust CORS policies!
