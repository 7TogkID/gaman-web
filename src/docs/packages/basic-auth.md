# Basic Auth

Basic Authentication Middleware for Gaman. Provides secure HTTP Basic Authentication with flexible configuration options.

## Features

- Easy-to-implement HTTP Basic Authentication for Gaman.
- Supports static credentials or dynamic validation logic.
- Customizable challenge realm and invalid authentication messages.

---

## Usage

### 1. **Static Credentials**

Use a fixed username and password for authentication:

```ts
import { defineBlock, Response } from "gaman";
import { basicAuth } from "gaman/basic-auth";

const blocks = defineBlock({
  includes: [
    basicAuth({
      username: "admin",
      password: "password123",
    }),
  ],
  routes: {
    "/secure": async (ctx) => {
      return Response.json({ message: "Access granted!" });
    },
  },
});

export default blocks;
```

---

### 2. **Dynamic Validation**

Use a custom function to validate credentials dynamically:

```ts
import { defineBlock, Response } from "gaman";
import { basicAuth } from "gaman/basic-auth";

const blocks = defineBlock({
  includes: [
    basicAuth({
      verifyAuth: async (username, password, ctx) => {
        return username === "user" && password === "pass"; // Example validation logic
      },
    }),
  ],
  routes: {
    "/dynamic": async (ctx) => {
      return Response.json({ message: "Dynamic validation passed!" });
    },
  },
});

export default blocks;
```

---

## Configuration Options

| Option               | Type                                  | Description                                                                              | Default         |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------- | --------------- |
| `username`           | `string`                              | Static username for authentication.                                                      | Required        |
| `password`           | `string`                              | Static password for authentication.                                                      | Required        |
| `verifyAuth`         | `(username, password, ctx) => bool`   | Custom function to dynamically validate credentials.                                     | `undefined`     |
| `realm`              | `string`                              | Realm used in the authentication challenge.                                              | `"Secure Area"` |
| `invalidAuthMessage` | `string \| object \| MessageFunction` | Message returned on invalid authentication. Can be a string, JSON object, or a function. | `undefined`     |

---

## Examples

### **Custom Realm and Error Message**

```ts
import { defineBlock, Response } from "gaman";
import { basicAuth } from "gaman/basic-auth";

const blocks = defineBlock({
  includes: [
    basicAuth({
      username: "admin",
      password: "secret",
      realm: "Admin Area",
      invalidAuthMessage: { error: "Unauthorized access." },
    }),
  ],
  routes: {
    "/admin": async (ctx) => {
      return Response.json({ message: "Welcome to the admin area!" });
    },
  },
});

export default blocks;
```

### **Dynamic Response on Failure**

```ts
import { defineBlock, Response } from "gaman";
import { basicAuth } from "gaman/basic-auth";

const blocks = defineBlock({
  includes: [
    basicAuth({
      username: "admin",
      password: "secret",
      invalidAuthMessage: async (ctx) => {
        return {
          error: "Authentication failed.",
          timestamp: new Date().toISOString(),
        };
      },
    }),
  ],
  routes: {
    "/fail": async (ctx) => {
      return Response.json({
        message: "You won't see this unless authenticated.",
      });
    },
  },
});

export default blocks;
```

---

## FAQ

### **Q: What is Basic Authentication?**

Basic Authentication is a simple method to protect routes by requiring a username and password to access resources.

### **Q: Why use this middleware?**

This middleware streamlines adding HTTP Basic Authentication to your GamanJS applications, whether with static credentials or dynamic logic.

---

Secure your GamanJS routes effortlessly with gaman/basic-auth!
