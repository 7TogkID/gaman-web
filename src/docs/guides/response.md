# Response

GamanJS provides a flexible Response system for handling HTTP responses. You can return responses using the `Response` class or convenient shortcuts that automatically determine the response type.

---

## Overview

Import the Response class and use it in your route handlers:

```ts
import { Response } from "gaman";

(ctx) => {
  return Response.json({ message: "Hello World" });
}
```

---

## Response Methods

### `Response.json(data, options?)`

Returns a JSON response with `Content-Type: application/json`.

```ts
(ctx) => {
  return Response.json({ 
    user: { id: 1, name: "Angga" },
    status: "success" 
  });
}

// With custom options
(ctx) => {
  return Response.json(
    { error: "Not found" },
    { status: 404, headers: { "X-Custom": "value" } }
  );
}
```

### `Response.text(message, options?)`

Returns a plain text response with `Content-Type: text/plain`.

```ts
(ctx) => {
  return Response.text("Hello, World!");
}

// With custom status
(ctx) => {
  return Response.text(
    "Server Error",
    { status: 500 }
  );
}
```

### `Response.html(body, options?)`

Returns an HTML response with `Content-Type: text/html`.

```ts
(ctx) => {
  return Response.html(`
    <html>
      <body>
        <h1>Welcome</h1>
        <p>Hello from GamanJS!</p>
      </body>
    </html>
  `);
}

// With custom headers
(ctx) => {
  return Response.html(
    "<h1>Custom Page</h1>",
    { 
      status: 201,
      headers: { "X-Frame-Options": "DENY" }
    }
  );
}
```

### `Response.render(viewName, data?, options?)`

Renders a template using a configured view engine. Requires setting up a view engine integration first.

```ts
(ctx) => {
  return Response.render("home", {
    title: "Welcome",
    user: { name: "Angga" }
  });
}

// With custom status
(ctx) => {
  return Response.render(
    "error",
    { message: "Page not found" },
    { status: 404 }
  );
}
```

### `Response.stream(stream, options?)`

Returns a streaming response with `Content-Type: application/octet-stream`.

```ts
import { createReadStream } from "fs";

(ctx) => {
  const fileStream = createReadStream("./large-file.pdf");
  return Response.stream(fileStream);
}

// With custom content type
(ctx) => {
  const videoStream = createReadStream("./video.mp4");
  return Response.stream(videoStream, {
    headers: { "Content-Type": "video/mp4" }
  });
}
```

### `Response.redirect(location, status?)`

Returns a redirect response. Default status is 302 (temporary redirect).

```ts
(ctx) => {
  return Response.redirect("/login");
}

// Permanent redirect (301)
(ctx) => {
  return Response.redirect("/new-url", 301);
}

// Temporary redirect (302) - explicit
(ctx) => {
  return Response.redirect("/dashboard", 302);
}
```

---

## Response Shortcuts

GamanJS automatically detects the response type based on what you return:

### String Responses

Automatically returns `Response.text()` with status 200:

```ts
(ctx) => {
  return "Hello, World!"; // → Response.text("Hello, World!")
}

(ctx) => {
  return "Server is running"; // Plain text response
}
```

### HTML String Responses

Strings containing HTML tags automatically return `Response.html()`:

```ts
(ctx) => {
  return "<h1>Welcome to My Site</h1>"; // → Response.html(...)
}

(ctx) => {
  return `
    <div>
      <h2>User Profile</h2>
      <p>Welcome back!</p>
    </div>
  `; // HTML response
}
```

### Object Responses

Objects automatically return `Response.json()` with status 200:

```ts
(ctx) => {
  return { message: "Success", data: [1, 2, 3] }; // → Response.json(...)
}

(ctx) => {
  const user = { id: 1, name: "Angga", email: "angga@example.com" };
  return user; // JSON response
}
```

These shortcuts are equivalent to their explicit counterparts:

```ts
// Shortcut
(ctx) => ({ message: "OK" })

// Equivalent to
(ctx) => {
  return Response.json({ message: "OK" });
}
```

---

## Response Options

All response methods accept an optional `options` parameter:

```ts
interface IResponseOptions {
  status?: number;          // HTTP status code (default: 200)
  statusText?: string;      // HTTP status text
  headers?: Record<string, string | string[]>; // Custom headers
}
```

### Examples:

```ts
// Custom status code
Response.json({ error: "Not found" }, { status: 404 })

// Custom headers
Response.text("Hello", { 
  headers: { 
    "X-Custom-Header": "value",
    "Cache-Control": "no-cache" 
  }
})

// Multiple options
Response.html("<h1>Error</h1>", {
  status: 500,
  statusText: "Internal Server Error",
  headers: { "X-Error": "true" }
})
```

---

## View Engine Integration

To use `Response.render()`, you need to set up a view engine integration in your main application file:

### Nunjucks Integration

```ts
import { nunjucks } from "gaman/nunjucks";

gaman.serve({
  integrations: [nunjucks()]
});
```

### EJS Integration

```ts
import { ejs } from "gaman/ejs";

gaman.serve({
  integrations: [ejs()]
});
```

Once configured, you can render templates:

```ts
// Using Nunjucks
(ctx) => {
  return Response.render("user/profile", {
    user: { name: "Angga", email: "angga@example.com" },
    title: "User Profile"
  });
}

// Using EJS
(ctx) => {
  return Response.render("dashboard", {
    stats: { users: 100, posts: 250 },
    currentUser: ctx.locals.user
  });
}
```

---

## Common Response Patterns

### API Responses

```ts
// Success response
(ctx) => Response.json({ 
  success: true, 
  data: result,
  timestamp: new Date()
})

// Error response
(ctx) => Response.json(
  { error: "Validation failed", details: errors },
  { status: 400 }
)

// Paginated response
(ctx) => Response.json({
  data: items,
  pagination: { page: 1, limit: 10, total: 100 }
})
```

### File Downloads

```ts
// PDF download
(ctx) => {
  const pdfStream = generatePDF();
  return Response.stream(pdfStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf"
    }
  });
}

// Image response
(ctx) => {
  const imageBuffer = await generateImage();
  return new Response(imageBuffer, {
    headers: { "Content-Type": "image/png" }
  });
}
```

### Authentication Redirects

```ts
// Login redirect
(ctx) => {
  if (!ctx.locals.user) {
    return Response.redirect("/login");
  }
  return Response.render("dashboard", { user: ctx.locals.user });
}

// Post-login redirect
(ctx) => {
  await ctx.session.set("user", user);
  return Response.redirect("/dashboard");
}
```

### Conditional Responses

```ts
(ctx) => {
  const accept = ctx.header("accept");
  
  if (accept?.includes("application/json")) {
    return { message: "Hello API" };
  }
  
  if (accept?.includes("text/html")) {
    return "<h1>Hello Web</h1>";
  }
  
  return "Hello World";
}
```

---

## Best Practices

- Use response shortcuts for simple responses to keep code clean
- Set appropriate HTTP status codes for different scenarios
- Include relevant headers for security and caching
- Use `Response.redirect()` for navigation flows
- Configure view engines when using server-side rendering
- Handle streaming responses for large files
- Use consistent JSON response formats for APIs
- Set proper `Content-Type` headers for file downloads

---

GamanJS Response system provides both convenience and flexibility, allowing you to choose between explicit response methods and automatic shortcuts based on your needs.