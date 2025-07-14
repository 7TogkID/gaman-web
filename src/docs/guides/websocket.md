# Websocket

The WebSocket for GamanJS provides an easy-to-use interface for handling WebSocket connections.

## Overview

The WebSocket for GamanJS provides an easy-to-use interface for handling WebSocket connections. It allows you to define WebSocket handlers that respond to events such as opening connections, receiving messages, handling errors, and more. This enables real-time communication for your application.

---

## Features

- **Connection Management**: Respond to connection lifecycle events like open, close, and errors.
- **Message Handling**: Process incoming messages from clients.
- **Pong Events**: Handle "pong" responses from clients.
- **Redirection**: Support for WebSocket redirection.

---

## Configuration Options

The `websocket` property in the `defineBlock` method accepts a handler function of type `WebSocketServerHandler`.

### Types

```ts
export interface WebSocketContext extends WebSocket {
  server: WebSocketServer; // Reference to the WebSocket server
}

export type WebSocketServerHandler = (
  ctx: WebSocketContext
) => Promise<WebSocketHandler> | WebSocketHandler;

export type WebSocketHandler = {
  onOpen?: () => void; // Called when the connection is opened
  onClose?: (code?: number, reason?: string) => void; // Called when the connection is closed
  onMessage?: (message: any) => void; // Called when a message is received
  onPong?: (data: Buffer) => void; // Called when a "pong" is received
  onError?: (error: Error) => void; // Called when an error occurs
  onRedirect?: (url: string, request: ClientRequest) => void; // Called when a redirect is issued
};
```

---

## Example Usage

### Basic WebSocket Block

```ts
import { defineBlock } from "gaman";

export default defineBlock({
  websocket: (ctx) => {
    console.log("Connected clients:", ctx.server.clients);

    return {
      onOpen: () => {
        console.log("Connection opened");
      },
      onMessage: (message) => {
        console.log("Received message:", message);
        ctx.send("Echo: " + message);
      },
      onClose: (code, reason) => {
        console.log(`Connection closed. Code: ${code}, Reason: ${reason}`);
      },
      onError: (error) => {
        console.error("WebSocket error:", error);
      },
    };
  },
});
```

### Advanced WebSocket with Pong and Redirect

```ts
import { defineBlock } from "gaman";

export default defineBlock({
  websocket: (ctx) => {
    return {
      onOpen: () => {
        console.log("Connection opened");
      },
      onPong: (data) => {
        console.log("Pong received:", data);
      },
      onRedirect: (url, request) => {
        console.log(`Redirecting to: ${url}`);
      },
      onMessage: (message) => {
        if (message === "ping") {
          ctx.send("pong");
        } else {
          ctx.send("Unknown message");
        }
      },
    };
  },
});
```

---

## Behavior

1. **Event Handling**: The WebSocket handler defines callback functions for various WebSocket events such as `onOpen`, `onClose`, and `onMessage`.
2. **Server Context**: The `WebSocketContext` provides access to the WebSocket server instance (`ctx.server`) and methods like `ctx.send` for sending messages to clients.
3. **Lifecycle Management**: Handles the full lifecycle of WebSocket connections, allowing for robust and reactive communication.

---

## Events

### onOpen

Called when a new WebSocket connection is established.

```ts
onOpen: () => {
  console.log("Connection established");
};
```

### onMessage

Triggered whenever a message is received from the client.

```ts
onMessage: (message) => {
  console.log("Received:", message);
  ctx.send("Echo: " + message);
};
```

### onClose

Called when the connection is closed, either by the client or server.

```ts
onClose: (code, reason) => {
  console.log(`Closed: Code ${code}, Reason: ${reason}`);
};
```

### onError

Triggered when an error occurs during communication.

```ts
onError: (error) => {
  console.error("WebSocket error:", error);
};
```

### onPong

Called when a "pong" message is received from the client.

```ts
onPong: (data) => {
  console.log("Pong received:", data);
};
```

### onRedirect

Handles WebSocket redirection requests.

```ts
onRedirect: (url, request) => {
  console.log(`Redirecting to: ${url}`);
};
```

---

## Best Practices

- **Validate Messages**: Always validate incoming messages to prevent malicious payloads.
- **Handle Errors Gracefully**: Use `onError` to log and recover from errors.
- **Secure Connections**: Use HTTPS and WSS for secure communication in production environments.
- **Broadcasting**: Use `ctx.server.clients` to iterate through all connected clients for broadcasting messages.

---

## Additional Notes

- WebSocket handlers allow for flexible and event-driven real-time communication.
- Integrate the WebSocket middleware with other blocks to extend functionality.
- For more advanced examples, refer to the GamanJS documentation.
