# BizMatch Platform

## Overview

BizMatch is a digital platform connecting business buyers and sellers, flipping the traditional approach by having sellers initiate contact with buyers (similar to Bumble's model). The platform facilitates the complete business acquisition lifecycle from initial matching through deal completion, with AI-powered tools to reduce friction points.

The application is built as a full-stack TypeScript web application with a React frontend, Express.js backend, and PostgreSQL database. It features separate user flows for buyers and sellers, with sophisticated matching algorithms and workflow management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI primitives with Tailwind CSS for consistent, accessible design system
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Architecture**: shadcn/ui component system with customizable theme tokens

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the full stack
- **API Design**: RESTful API with /api prefix for all routes
- **Storage Interface**: Abstracted storage layer supporting both in-memory (development) and persistent storage
- **Session Management**: Express sessions with PostgreSQL session store
- **Development Server**: Hot reload with Vite integration in development mode

### Database Design
The schema supports a comprehensive business marketplace with the following key entities:
- **Users Table**: Handles both buyers and sellers with role-based differentiation
- **Businesses Table**: Complete business profiles with financials, metrics, and verification status  
- **Buyer Profiles Table**: Investment preferences, budget ranges, and matching criteria
- **Matching System**: Support for complex matching algorithms based on industry, location, budget, and business metrics

### Authentication & Authorization
- User type differentiation (buyer/seller) built into the schema
- Verification system for both users and business listings
- Session-based authentication with secure cookie management

### Key Features
- **Dual Onboarding**: Separate questionnaire flows for buyers and sellers with multi-step forms
- **Profile Matching**: Swipe-style interface for sellers to review and match with buyer profiles
- **Deal Workflow**: Complete acquisition process management with progress tracking
- **AI Integration**: Placeholder for financial document analysis and deal optimization tools
- **Real-time Messaging**: Chat interface for buyer-seller communication
- **Business Verification**: Trust and safety features for platform integrity

### Development Workflow
- **Hot Reload**: Development server with instant updates
- **Type Safety**: Full TypeScript coverage from database to frontend
- **Database Migrations**: Drizzle ORM with migration support
- **Environment Configuration**: Separate development and production configurations

## External Dependencies

### Database
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **Connection Pooling**: Optimized for serverless environments

### UI Framework
- **Radix UI**: Accessible primitive components for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Consistent iconography throughout the application

### Development Tools
- **Vite**: Build tool with React plugin for fast development
- **ESBuild**: Production bundling for server-side code
- **TypeScript**: Static type checking across the entire codebase

### Third-party Services
- **Replit Integration**: Development environment optimization with error overlays
- **Image Hosting**: External image URLs for business and user photos (placeholder for CDN integration)

### Runtime Dependencies
- **React Hook Form**: Form validation and management
- **date-fns**: Date manipulation and formatting
- **Zod**: Schema validation for API endpoints and forms
- **TanStack Query**: API state management and caching