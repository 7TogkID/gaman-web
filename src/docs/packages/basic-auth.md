# Basic Auth

Basic Authentication Middleware for Gaman. Provides secure HTTP Basic Authentication with flexible configuration options.

## Features

- Easy-to-implement HTTP Basic Authentication for Gaman.
- Supports static credentials or dynamic validation logic.
- Customizable challenge realm and invalid authentication messages.

---

---

## Installation

you need to install the following packages

```bash
npm install @gaman/basic-auth
```

## Usage

### 1. **Static Credentials**

Use a fixed username and password for authentication:

```ts
export default defineBlock({
  includes: [
    basicAuth({
      username: "admin",
      password: "password123",
    }),
  ],
});
```

---

### 2. **Dynamic Validation**

Use a custom function to validate credentials dynamically:

```ts
export default defineBlock({
  includes: [
    basicAuth({
      verifyAuth: async (username, password, ctx) => {
        return username === "user" && password === "pass"; // Example validation logic
      },
    }),
  ],
});
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
export default defineBlock({
  includes: [
    basicAuth({
      username: "admin",
      password: "secret",
      realm: "Admin Area",
      invalidAuthMessage: { error: "Unauthorized access." },
    }),
  ],
});
```

### **Dynamic Response on Failure**

```ts
export default defineBlock({
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
});
```

---

## FAQ

### **Q: What is Basic Authentication?**

Basic Authentication is a simple method to protect routes by requiring a username and password to access resources.

### **Q: Why use this middleware?**

This middleware streamlines adding HTTP Basic Authentication to your GamanJS applications, whether with static credentials or dynamic logic.

---

Secure your GamanJS routes effortlessly with gaman/basic-auth!
