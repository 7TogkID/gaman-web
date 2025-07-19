# Integration API

## Overview

The Integration API allows you to extend your application's functionality through a modular integration system. Each integration follows a lifecycle pattern with hooks for different stages of the application's execution.

## Integration types

There are two ways to create integrations in Gaman:

### 1. Direct Integration

For simple integrations without configuration options:

```typescript
const myIntegration = defineIntegration({
    name: 'my-integration',
    priority: 'normal'
});

// Usage
integrations: [myIntegration]
```

### 2. Factory Function Integration

For integrations that need customizable options:

```typescript
export function myIntegration(options: MyOptions) {
    return defineIntegration({
        name: 'my-integration',
        priority: 'normal'
    });
}

// Usage
integrations: [myIntegration({ option: 'value' })]
```

## Integration Structure

An integration is defined using the `IIntegration` interface which includes the following properties:

- **name** (required): The unique identifier for your integration
- **priority** (required): Determines the execution order of integrations
- **onLoad** (optional): Called when the integration is initialized
- **onDisabled** (optional): Called when the integration is disabled
- **onRequest** (optional): Called on each incoming request
- **onResponse** (optional): Called before sending response to client

### Priority Levels

The priority system determines the order in which integrations are executed:
- `high` - Executes first
- `normal` - Standard execution order
- `low` - Executes last

## Creating an Integration

### Basic Integration

Create a new file with the `.integration.ts` suffix:

```typescript
// example.integration.ts
import { defineIntegration } from "gaman"

const exampleIntegration = defineIntegration({
    name: 'example-integration',
    priority: 'normal',
    onLoad: (app) => {
        console.log('Integration loaded!');
    },
    onRequest: (app, ctx) => {
        // Handle incoming requests
        console.log('Request received:', ctx.request.url);
    },
    onResponse: (app, ctx, res) => {
        // Modify response before sending
        console.log('Response being sent');
        return res;
    }
});

export default exampleIntegration;
```

### Integration with Configuration Options

For integrations that need customizable options:

```typescript
// auth.integration.ts
import { defineIntegration } from "gaman"

interface AuthOptions {
    secret?: string;
    enabled?: boolean;
    protectedRoutes?: string[];
}

export function authIntegration(options: AuthOptions = {}) {
    return defineIntegration({
        name: 'auth-middleware',
        priority: 'high',
        onLoad: (app) => {
            // Initialize authentication system with options
            app.config.auth = {
                enabled: options.enabled ?? true,
                secret: options.secret ?? process.env.JWT_SECRET,
                protectedRoutes: options.protectedRoutes ?? ['/api/protected']
            };
        },
        onRequest: (app, ctx) => {
            const token = ctx.request.headers.get('Authorization');
            const isProtected = app.config.auth.protectedRoutes.some(route => 
                ctx.request.url.includes(route)
            );
            
            if (!token && isProtected) {
                return new Response('Unauthorized', { status: 401 });
            }
        },
        onDisabled: (app) => {
            delete app.config.auth;
        }
    });
}
```

## Using Integrations

### Registering Integrations

In your main application file (`main.ts`), register your integrations:

```typescript
// main.ts
import gaman from "gaman";
import exampleIntegration from "./integrations/example.integration";
import { authIntegration } from "./integrations/auth.integration";

gaman.serve({
    integrations: [
        authIntegration({ 
            secret: 'my-secret',
            protectedRoutes: ['/api/admin', '/api/user'] 
        }),
        exampleIntegration
    ]
});
```

### Multiple Integrations

You can register multiple integrations, and they will execute based on their priority:

```typescript
// main.ts
import gaman from "gaman";
import loggingIntegration from "./integrations/logging.integration";
import { corsIntegration } from "./integrations/cors.integration";
import { rateLimitIntegration } from "./integrations/rate-limit.integration";

gaman.serve({
    integrations: [
        corsIntegration(),           // with options
        rateLimitIntegration({ maxRequests: 100 }),  // with options
        loggingIntegration           // direct integration
    ]
});
```

## Integration Lifecycle

### Execution Order

1. **onLoad**: Called during application startup (ordered by priority)
2. **onRequest**: Called for each incoming request (ordered by priority)
3. **onResponse**: Called before sending response (ordered by priority)
4. **onDisabled**: Called when integration is disabled

### Context Access

Integrations receive the application context and request context, allowing you to:

- Access application configuration
- Modify request/response data
- Share data between integrations
- Implement middleware logic

## Best Practices

### Naming Convention

- Use descriptive names with kebab-case: `auth-middleware`, `rate-limiter`
- Add `.integration.ts` suffix to integration files
- Keep integration names unique across your application

### Priority Guidelines

- **High priority**: Security, CORS, rate limiting
- **Normal priority**: Business logic, logging, analytics  
- **Low priority**: Cleanup, final transformations

### Error Handling

Always handle errors gracefully in your integrations:

```typescript
export default defineIntegration({
    name: 'safe-integration',
    priority: 'normal',
    onRequest: (app, ctx) => {
        try {
            // Your logic here
        } catch (error) {
            console.error('Integration error:', error);
            // Don't break the request chain
        }
    }
});
```

## Examples

### CORS Integration

```typescript
// cors.integration.ts
import { defineIntegration } from "gaman"

interface CorsOptions {
    origin?: string;
    methods?: string;
    headers?: string;
}

export function corsIntegration(options: CorsOptions = {}) {
    return defineIntegration({
        name: 'cors-handler',
        priority: 'high',
        onResponse: (app, ctx, res) => {
            res.headers.set('Access-Control-Allow-Origin', options.origin ?? '*');
            res.headers.set('Access-Control-Allow-Methods', options.methods ?? 'GET, POST, PUT, DELETE');
            if (options.headers) {
                res.headers.set('Access-Control-Allow-Headers', options.headers);
            }
            return res;
        }
    });
}
```

### Logging Integration

```typescript
// logging.integration.ts
import { defineIntegration } from "gaman"

const loggingIntegration = defineIntegration({
    name: 'request-logger',
    priority: 'normal',
    onRequest: (app, ctx) => {
        const start = Date.now();
        ctx.metadata = { ...ctx.metadata, startTime: start };
        console.log(`${ctx.request.method} ${ctx.request.url} - Started`);
    },
    onResponse: (app, ctx, res) => {
        const duration = Date.now() - ctx.metadata.startTime;
        console.log(`${ctx.request.method} ${ctx.request.url} - ${res.status} (${duration}ms)`);
        return res;
    }
});

export default loggingIntegration;
```

This documentation provides a complete guide for creating and using integrations in the Gaman framework. The modular approach allows for flexible and maintainable application architecture.