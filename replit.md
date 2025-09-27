# BlogForge - Modern Blog Platform

## Overview

BlogForge is a full-stack blog platform built with React, TypeScript, and Express. It provides a modern, content-focused blogging experience with features like rich text editing, image support, search/filtering capabilities, and an admin interface for content management. The platform emphasizes clean design, performance optimization, and user-friendly content creation tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management and caching
- **Tailwind CSS** with **shadcn/ui** components for consistent design system
- **React Hook Form** with Zod validation for form management

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **RESTful API** design with endpoints for blog posts, categories, and images
- **Drizzle ORM** for database operations and schema management
- **PostgreSQL** as the primary database (configured for Neon database)
- **Session-based** architecture with middleware for logging and error handling

### Database Design
- **Blog Posts**: Core content with title, slug, content, excerpt, featured images, tags, and publication status
- **Categories**: Organizational structure for content categorization
- **Blog Post Images**: Support for multiple images per post with captions and positioning
- **Users**: Basic user management for authentication and authorship

### Component Architecture
- **Atomic Design** principles with reusable UI components
- **Compound Components** pattern for complex interactions (SearchFilters, AdminPostEditor)
- **Custom Hooks** for mobile detection and toast notifications
- **TypeScript interfaces** for strong typing across components and API responses

### Content Management
- **Rich Text Editing** with Markdown support using ReactMarkdown
- **Image Upload** and management system for blog content
- **Draft/Published** workflow for content lifecycle management
- **Tag-based** organization and filtering system
- **Search and Filter** capabilities for content discovery

### Styling and Design
- **Design System** based on modern content platforms (Medium, Ghost, Notion)
- **Light/Dark Mode** support with system preference detection
- **Responsive Design** with mobile-first approach
- **Content-First** typography and layout optimization
- **Custom CSS Variables** for consistent theming

## External Dependencies

### Database Services
- **Neon Database** - PostgreSQL hosting service for production data storage
- **Drizzle Kit** - Database migration and schema management tools

### UI and Styling
- **Radix UI** - Headless component primitives for accessibility
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library for consistent iconography
- **Google Fonts** - Typography (Inter, Source Sans Pro, JetBrains Mono)

### Development Tools
- **Vite** - Build tool and development server
- **ESBuild** - JavaScript bundler for production builds
- **PostCSS** - CSS processing with Tailwind and Autoprefixer

### Content Processing
- **React Markdown** - Markdown rendering for blog content
- **Date-fns** - Date manipulation and formatting utilities

### State Management
- **TanStack React Query** - Server state management and caching
- **React Hook Form** - Form state management
- **Zod** - Schema validation for forms and API data

### Development Environment
- **Replit** - Cloud development environment with specialized plugins for debugging and development workflow