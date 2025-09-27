import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostContent from "@/components/BlogPostContent";
import techImage from '@assets/generated_images/Tech_blog_featured_image_f6c58acb.png';
import maleAvatar from '@assets/generated_images/Male_author_avatar_02437b0d.png';

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");

  // TODO: Remove mock data - this would come from API based on slug
  const sampleContent = `
## Introduction

Building modern web applications requires a deep understanding of current technologies and best practices. In this comprehensive guide, we'll explore how to create scalable, maintainable applications using React and TypeScript.

## Why React and TypeScript?

React has become the de facto standard for building user interfaces, while TypeScript adds the type safety that JavaScript lacks. Together, they form a powerful combination that helps developers create robust applications.

### Key Benefits

- **Type Safety**: Catch errors at compile time rather than runtime
- **Developer Experience**: Enhanced IDE support with autocomplete and refactoring
- **Maintainability**: Better code organization and documentation
- **Performance**: Optimized builds and tree shaking

## Getting Started

First, let's set up a new React TypeScript project:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

## Component Architecture

When building React applications, it's crucial to think about component architecture from the beginning. Here are some best practices:

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Use composition to build complex UIs
3. **Props Interface**: Always define clear TypeScript interfaces for props

### Example Component

\`\`\`typescript
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      {avatar && <img src={avatar} alt={name} />}
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
\`\`\`

## State Management

For state management, consider these options based on your application's complexity:

- **useState**: For local component state
- **useReducer**: For complex state logic
- **Context API**: For global state that doesn't change frequently
- **External Libraries**: Redux, Zustand, or Jotai for complex applications

## Performance Optimization

Here are key strategies for optimizing React applications:

### 1. Code Splitting

Use React.lazy() and Suspense for route-based code splitting:

\`\`\`typescript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  return <div>{/* Component content */}</div>;
});
\`\`\`

## Testing Strategies

Testing is crucial for maintaining code quality:

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows

## Deployment Best Practices

When deploying React applications:

1. **Build Optimization**: Use production builds
2. **Static Assets**: Optimize images and fonts
3. **Caching**: Implement proper caching strategies
4. **CDN**: Use a content delivery network
5. **Monitoring**: Set up error tracking and performance monitoring

## Conclusion

React and TypeScript together provide a solid foundation for building modern web applications. By following these patterns and best practices, you'll be well on your way to creating maintainable, scalable applications.

Remember to always prioritize user experience and performance while maintaining clean, readable code. The development landscape continues to evolve, so stay curious and keep learning!

### Next Steps

- Explore advanced React patterns like render props and compound components
- Learn about server-side rendering with Next.js
- Dive deeper into TypeScript's advanced features
- Experiment with state management libraries

Happy coding! 🚀
`;

  const mockPost = {
    title: "Building Modern Web Applications with React and TypeScript",
    content: sampleContent,
    authorName: "John Smith",
    authorAvatar: maleAvatar,
    publishedAt: "March 15, 2024",
    viewCount: 1247,
    tags: ["React", "TypeScript", "Web Development", "Frontend"],
    featuredImage: techImage,
    readTime: 8
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BlogPostContent
          title={mockPost.title}
          content={mockPost.content}
          authorName={mockPost.authorName}
          authorAvatar={mockPost.authorAvatar}
          publishedAt={mockPost.publishedAt}
          viewCount={mockPost.viewCount}
          tags={mockPost.tags}
          featuredImage={mockPost.featuredImage}
          readTime={mockPost.readTime}
        />
      </main>
      <Footer />
    </div>
  );
}