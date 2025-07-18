# Contributing to Troubleshoot Documentation

Thank you for your interest in contributing to the Troubleshoot documentation! This guide will help you get started.

## Prerequisites

- Node.js 18.x or higher
- NPM (comes with Node.js)

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/troubleshoot.sh.git
   cd troubleshoot.sh
   ```

2. **Install dependencies**
   ```bash
   make install
   ```

3. **Start the development server**
   ```bash
   make start
   ```
   
   The site will be available at http://localhost:3001

## Available Commands

```bash
make install               # Install dependencies
make start                 # Start development server
make build                 # Build for production
make serve                 # Serve built site locally
make test                  # Run all tests
make clean                 # Clear cache
make help                  # Show available commands
```

## Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Documentation files are in the `docs/` directory
   - Custom components are in `src/components/`
   - Static assets go in `static/`

3. **Test your changes**
   ```bash
   make test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**

## Documentation Guidelines

- Use clear, concise language
- Include code examples where helpful
- Test all command examples
- Follow existing formatting patterns
- Add screenshots for UI-related content

## Project Structure

```
├── docs/                   # Documentation content
├── src/                    # React components and pages
├── static/                 # Static assets
├── tests/                  # Test scripts
├── Makefile               # Build commands
└── docusaurus.config.ts   # Site configuration
```

## Need Help?

- Check existing [issues](https://github.com/replicatedhq/troubleshoot/issues)
- Review the main [Troubleshoot repository](https://github.com/replicatedhq/troubleshoot)
- Ask questions in your pull request
