# Command Line Interface

GamanJS provides a powerful CLI tool to help you develop, build, and manage your applications efficiently. All commands are prefixed with `npx gaman` and can be run from your project directory.

---

## Overview

The GamanJS CLI streamlines your development workflow with commands for development, production builds, and project management:

```bash
npx gaman dev     # Start development server
npx gaman build   # Build for production
npx gaman start   # Run production server
```

---

## Available Commands

### `npx gaman dev`

Starts the development server with hot reload and debugging features enabled.

```bash
npx gaman dev
```

**Features:**
- Hot reload on file changes
- Detailed error messages and stack traces
- Development-optimized performance
- Automatic server restart on configuration changes
- Enhanced logging for debugging

**Usage:**
```bash
# Start development server
npx gaman dev

# Development server will typically run on http://localhost:3000
# Check console output for the exact URL and port
```

---

### `npx gaman build`

Builds your application for production deployment with optimizations.

```bash
npx gaman build
```

**Features:**
- Code optimization and minification
- Static asset processing
- Production environment configuration
- Bundle analysis and optimization
- Dependency tree optimization

**Usage:**
```bash
# Build for production
npx gaman build

# Creates optimized build artifacts
# Ready for deployment to production servers
```

---

### `npx gaman start`

Starts the production server using the built application files.

```bash
npx gaman start
```

**Requirements:**
- Must run `npx gaman build` first
- Requires built production files

**Features:**
- Production-optimized performance
- Minimal resource usage
- Production logging
- Error handling for production environment

**Usage:**
```bash
# Build first
npx gaman build

# Then start production server
npx gaman start
```

---

### `npx gaman key:generate`

Generates a new cryptographic key for your application security.

```bash
npx gaman key:generate
```

**Purpose:**
- Creates secure keys for session encryption
- Generates keys for cookie signing
- Provides keys for JWT tokens and other security features

**Usage:**
```bash
# Generate a new application key
npx gaman key:generate

# Output will be a secure random key
# Copy this key to your environment variables
```

**Example output:**
```
Generated Application Key:
gaman_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z

Add this to your .env file:
GAMAN_KEY=gaman_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z
```

---

## Development Workflow

### Typical Development Process

```bash
# 1. Generate application key (first time setup)
npx gaman key:generate

# 2. Start development server
npx gaman dev

# 3. Make changes to your code (hot reload automatically applied)

# 4. When ready for production
npx gaman build

# 5. Test production build locally
npx gaman start

# 6. Deploy to production server
```

### Environment Setup

```bash
# Create .env file with generated key
echo "GAMAN_KEY=your_generated_key_here" > .env

# Start development
npx gaman dev
```

---

## Coming Soon

The following commands are planned for future releases:

### Code Generation Commands

```bash
# Generate new block (route group)
npx gaman make:block UserBlock

# Generate route tree structure
npx gaman make:tree ApiTree

# Generate middleware
npx gaman make:middleware AuthMiddleware

# Generate child routes
npx gaman make:children PostChildren

# Generate service class
npx gaman make:service UserService

# Generate custom integration
npx gaman make:integration CustomIntegration
```

### Database Commands

```bash
# Run database seeders
npx gaman seed

# Run specific seeder
npx gaman seed --class=UserSeeder
```

---

## Command Options

### Global Options

Most commands will support common options (coming in future versions):

```bash
# Specify custom port for dev server
npx gaman dev --port=4000

# Set environment
npx gaman dev --env=staging

# Enable verbose logging
npx gaman build --verbose

# Set custom config file
npx gaman start --config=custom.config.js
```

---

## Troubleshooting

### Common Issues

**Command not found:**
```bash
# Make sure you're in a GamanJS project directory
# Verify package.json includes GamanJS as dependency
npm install gaman
```

**Development server won't start:**
```bash
# Check if port is already in use
# Verify your main application file exists
# Check for syntax errors in your code
npx gaman dev --verbose
```

**Build fails:**
```bash
# Check for TypeScript errors
# Verify all dependencies are installed
# Review error messages for specific issues
npm install
npx gaman build
```

**Production server issues:**
```bash
# Ensure build was completed successfully
# Check environment variables are set
# Verify production dependencies are installed
npx gaman build
npx gaman start
```

---

## Tips and Best Practices

- Always generate and set your application key before development
- Use `dev` command during development for better debugging experience
- Run `build` before deploying to production
- Keep your generated keys secure and never commit them to version control
- Use environment variables for different deployment environments
- Test your production build locally with `start` before deploying

---

## Getting Help

```bash
# Get help for specific commands (coming soon)
npx gaman dev --help
npx gaman build --help
npx gaman --help
```

The CLI tool is actively being developed with more commands and options coming in future releases. Stay tuned for code generation, database management, and advanced deployment tools!