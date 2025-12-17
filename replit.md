# Jatniel Comercial - Site Institucional

## Overview

This is an institutional website for Jatniel Comercial, an Angolan company specializing in web development and graphic design services. The application is a full-stack React + Express project with a modern component-based architecture, featuring a responsive landing page with multiple sections showcasing services, a product store with individual product detail pages, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: React Context API + TanStack Query for server state
- **Styling**: TailwindCSS with CSS variables for theming (light/dark mode support)
- **UI Components**: Shadcn UI (Radix primitives) with "new-york" style variant
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints under /api prefix
- **Storage**: In-memory storage class (MemStorage) for development - designed to be swapped with database
- **Schema**: Drizzle ORM schema definitions in shared/schema.ts (PostgreSQL dialect configured)

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL configuration
- **Schema Location**: shared/schema.ts contains table definitions for users, contacts, and products
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Current Storage**: In-memory Map-based storage (production would use PostgreSQL via DATABASE_URL)

### Build & Deployment
- **Development**: Vite dev server with HMR, Express backend runs concurrently
- **Production Build**: Custom build.js script using Vite for client and esbuild for server
- **Vercel Support**: Dedicated vercel.build.js and vercel-entry.js for serverless deployment
- **Output**: dist/public for static assets, dist/index.js for server bundle

### Key Design Patterns
- Shared schema types between frontend and backend via @shared alias
- Component-based UI with clear separation (pages, components, ui primitives)
- CSS-in-JS avoided in favor of utility-first Tailwind classes
- WhatsApp integration for customer contact throughout the site

### Store Feature
- **Product Display**: Grid layout with product cards showing image, name, description, price, and category
- **Category Filtering**: Filter products by Design Gráfico or Desenvolvimento Web
- **WhatsApp Ordering**: Direct ordering via WhatsApp with pre-formatted product information
- **Featured Products**: Highlighted products with "Destaque" badge
- **Product Detail Page**: Individual product page with image gallery, detailed description, features list, and WhatsApp ordering
- **API Endpoints**: GET /api/products (with optional category/featured query params), GET /api/products/:id

### Product Detail Page (/produto/:id)
- **Image Gallery**: Main product image with thumbnail navigation for multiple images
- **Product Information**: Name, category badge, description, and detailed description
- **Price Display**: Formatted price in Angolan Kwanza (AOA)
- **Features List**: Check-marked list of product features
- **Actions**: WhatsApp order button and share button
- **Navigation**: Back to store link

## SEO Implementation

### Search Engine Optimization
The site has been optimized for Google indexing with the following features:

#### Technical SEO
- **sitemap.xml**: Dynamic sitemap at `/sitemap.xml` with all pages and product images
- **robots.txt**: Properly configured at `/robots.txt` for Google and Bing crawlers
- **Canonical URLs**: All pages have canonical links to prevent duplicate content
- **Mobile-First**: Responsive design with proper viewport settings

#### Structured Data (Schema.org JSON-LD)
- **LocalBusiness**: Company information on homepage
- **WebSite**: Site-wide search action schema
- **Product**: Product details with offers and pricing on product pages
- **BreadcrumbList**: Navigation breadcrumbs on product pages
- **Store**: E-commerce store schema on Loja page
- **CollectionPage**: Portfolio schema on Clientes page

#### Meta Tags
- **Title tags**: Optimized with keywords and location (Angola, Luanda)
- **Meta descriptions**: Unique descriptions for each page
- **Keywords**: Angola-specific keywords for local SEO
- **Open Graph**: Complete OG tags for social sharing
- **Twitter Cards**: Summary large image cards for Twitter
- **Geo tags**: Location metadata for local search

#### Target Keywords
- desenvolvimento web Angola
- design gráfico Angola
- criação de sites Luanda
- web designer Angola
- agência digital Angola
- porta documentos Angola
- Netflix Angola

### Google Search Console Setup
To complete SEO setup:
1. Verify domain ownership in Google Search Console
2. Submit sitemap: https://jatnielcomercial.ao/sitemap.xml
3. Request indexing for main pages
4. Set up Google Business Profile for local SEO

## External Dependencies

### Third-Party Services
- **WhatsApp Business**: Direct messaging integration via wa.me links (phone: 922534433)
- **Font Awesome**: Icon library loaded via CDN
- **Google Fonts**: Poppins and Roboto font families

### Database
- **Configured**: PostgreSQL via Drizzle ORM (requires DATABASE_URL environment variable)
- **Driver**: @neondatabase/serverless for Neon PostgreSQL compatibility
- **Migrations**: Output to ./migrations directory via drizzle-kit

### Key NPM Packages
- **UI**: Full Radix UI primitive suite, embla-carousel, vaul (drawer), cmdk (command palette)
- **Utilities**: date-fns, clsx, tailwind-merge, class-variance-authority
- **Development**: tsx for TypeScript execution, cross-env for environment variables