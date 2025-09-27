# BlogForge - Blog Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern content platforms like Medium, Ghost, and Notion for their clean, reader-focused design patterns that prioritize content readability and elegant typography.

## Core Design Principles
- **Content-First**: Typography and readability are paramount
- **Clean Minimalism**: Generous whitespace and uncluttered layouts
- **Professional Authority**: Establishes credibility for content creators
- **Efficient Navigation**: Clear hierarchy and intuitive user flows

## Color Palette

### Light Mode
- **Primary**: 15 15% 15% (Deep charcoal for text and primary elements)
- **Secondary**: 210 15% 60% (Muted blue-gray for secondary text)
- **Background**: 0 0% 98% (Off-white primary background)
- **Surface**: 0 0% 100% (Pure white for cards and content areas)
- **Accent**: 200 85% 55% (Bright blue for CTAs and links)

### Dark Mode
- **Primary**: 0 0% 95% (Light gray for text)
- **Secondary**: 210 10% 70% (Warm gray for secondary text)
- **Background**: 220 15% 8% (Deep blue-black)
- **Surface**: 220 10% 12% (Elevated dark surface)
- **Accent**: 200 85% 65% (Slightly brighter blue for dark mode)

## Typography
- **Primary Font**: Inter or Source Sans Pro (Google Fonts)
- **Headings**: 700 weight for H1/H2, 600 for H3/H4
- **Body Text**: 400 weight, optimized line-height (1.6-1.7)
- **Code**: JetBrains Mono for code blocks

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent use of p-4, m-6, gap-8 patterns
- Container max-width of 1200px for main content
- Generous padding and margins for content breathing room

## Component Library

### Navigation
- Clean header with logo, navigation links, and search
- Sticky navigation with subtle shadow on scroll
- Mobile hamburger menu with slide-out panel

### Blog Post Cards
- Large featured image (16:9 aspect ratio)
- Clear typography hierarchy (title, excerpt, meta)
- Subtle hover effects with gentle elevation
- Tag pills with rounded corners

### Content Areas
- Wide article layout (max-width: 65ch for optimal reading)
- Generous line spacing and paragraph breaks
- Pull quotes with elegant styling
- Code blocks with syntax highlighting

### Admin Interface
- Clean dashboard with sidebar navigation
- Rich text editor with toolbar
- Image upload with drag-and-drop
- Form inputs with clear labels and validation states

### Data Displays
- Pagination with clean number indicators
- Search results with highlighted matches
- Filter tags with active/inactive states
- Loading states with subtle skeleton screens

## Images
- **Hero Images**: Large, high-quality featured images for individual blog posts (avoid homepage hero)
- **Thumbnails**: Consistent aspect ratios for blog post cards
- **Inline Content**: Support for multiple images within blog content
- **Profile Images**: Circular author avatars
- **Placeholders**: Elegant gray placeholders for missing images

## Animations
- **Minimal and Purposeful**: Subtle fade-ins for content loading
- **Hover Effects**: Gentle scale (1.02x) and shadow changes for cards
- **Page Transitions**: Smooth but fast (200-300ms duration)
- **No Distracting Motion**: Focus remains on content consumption

## Special Considerations
- **Reading Experience**: Optimize font size, contrast, and spacing for long-form content
- **Mobile-First**: Ensure excellent readability on all device sizes
- **Performance**: Lazy loading for images, optimized font loading
- **SEO-Friendly**: Clean URL structure and semantic HTML
- **Accessibility**: WCAG 2.1 AA compliance with proper focus states and screen reader support

This design system creates a professional, content-focused blog platform that prioritizes readability and user experience while maintaining modern aesthetic appeal.