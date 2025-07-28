# CORS

CORS Middleware for Gaman. Implements Cross-Origin Resource Sharing (CORS) with customizable options.

## Features

- Easy setup for Cross-Origin Resource Sharing (CORS).
- Global or route-specific middleware support.
- Handles preflight requests automatically.

---

## Installation

you need to install the following packages

```bash
npm install @gaman/cors
```

## Usage

### 1. **Global Middleware**

Apply the CORS middleware globally to all routes:

```ts
export default defineBlock({
  includes: [cors({ origin: "*" })], // Global CORS middleware
});
```

---

### 2. **Route-Specific Middleware**

Apply CORS middleware only to specific routes:

```ts
export default defineRoutes(() => ({
  "/public": async (ctx) => {
    return Response.json({ message: "No CORS restrictions here!" });
  },
  "/private/*": cors({ origin: ["https://example.com"] }), // Specific middleware
  "/private/data": async (ctx) => {
    return Response.json({ message: "Restricted to example.com" });
  },
}));
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
export default defineBlock({
  includes: [
    cors({
      origin: "https://mywebsite.com",
      credentials: true,
    }),
  ],
});
```

---

### **Custom Headers and Methods**

```ts
export default defineBlock({
  includes: [
    cors({
      origin: "*",
      allowMethods: ["GET", "POST"],
      allowHeaders: ["X-Custom-Header", "Authorization"],
      maxAge: 86400, // Cache for 1 day
    }),
  ],
});
```

---

## Tips

- Use `origin` with a list of domains to restrict access to specific origins.
- Set `maxAge` to improve performance by reducing preflight requests.

---

## FAQ

### **Q: What is CORS?**

CORS stands for Cross-Origin Resource Sharing, a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated.

### **Q: Why use this middleware?**

The middleware simplifies setting up CORS policies, reducing the need for repetitive boilerplate code.

---

Empower your GamanJS applications with robust CORS policies!
