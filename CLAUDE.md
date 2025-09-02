# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development (using Bun runtime)
bun install                 # Install dependencies
bun run dev                # Start development server on port 3000
bun run build              # Build for production
bun start                  # Start production server

# Code Quality
bun run lint               # Lint code using Biome
bun run format             # Format code using Biome  
bun run check              # Run both lint and format
bun run tsc                # TypeScript type checking

# Testing
bun run test               # Run tests with Vitest
```

## Architecture Overview

This is a **TanStack Start** note-taking application with the following architecture:

### Core Stack
- **Framework**: TanStack Start (React-based full-stack framework)
- **Runtime**: Bun (preferred over npm/node)
- **TypeScript**: Strict configuration with path aliases (`~/` → `./src/`)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Form Management**: @tanstack/react-form with Zod validation
- **Routing**: File-based routing with TanStack Router

### Project Structure
```
src/
├── components/ui/shadcn/    # Reusable shadcn/ui components
├── features/notes/          # Note feature domain
│   └── types/schemas/       # Zod schemas for validation
├── lib/                     # Shared utilities
└── routes/                  # File-based routing
    ├── __root.tsx          # Root layout with devtools
    ├── index.tsx           # Home page
    └── notes/              # Notes feature routes
        ├── index.tsx       # Notes list page
        └── $id.tsx         # Individual note editor
```

### Key Features
- **File-based Routing**: Routes are automatically generated from `src/routes/` directory structure
- **Rich Text Editing**: Uses MDXEditor for markdown editing with plugins (headings, lists, quotes)
- **Form Validation**: Zod schemas with TanStack React Form integration
- **Developer Experience**: Integrated devtools for TanStack Router and React

### Code Style & Standards
- **Formatter**: Biome with 2-space indentation, single quotes, semicolons as needed
- **Linting**: Biome with strict rules including sorted Tailwind classes
- **TypeScript**: Strict mode enabled with unused locals/parameters detection
- **Import Style**: Uses path aliases (`~/`) and relative imports from `@tanstack/`

### Notes Feature Implementation
- Note schema validation with title (1-128 chars) and content (min 1 char) requirements
- Mock data structure with crypto.randomUUID() for note IDs
- MDX editor with headings, lists, quotes, and thematic break plugins
- Responsive grid layout optimized for full viewport height

### Development Workflow
1. Use `bun` commands (not npm) for all operations
2. File-based routing - add new routes by creating files in `src/routes/`
3. Components follow shadcn/ui patterns in `src/components/ui/shadcn/`
4. Feature-based organization under `src/features/`
5. Schemas and types co-located with features