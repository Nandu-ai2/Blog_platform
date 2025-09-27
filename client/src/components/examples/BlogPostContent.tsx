import BlogPostContent from '../BlogPostContent';
import techImage from '@assets/generated_images/Tech_blog_featured_image_f6c58acb.png';
import maleAvatar from '@assets/generated_images/Male_author_avatar_02437b0d.png';

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

## Conclusion

React and TypeScript together provide a solid foundation for building modern web applications. By following these patterns and best practices, you'll be well on your way to creating maintainable, scalable applications.

Remember to always prioritize user experience and performance while maintaining clean, readable code.
`;

export default function BlogPostContentExample() {
  return (
    <BlogPostContent
      title="Building Modern Web Applications with React and TypeScript"
      content={sampleContent}
      authorName="John Smith"
      authorAvatar={maleAvatar}
      publishedAt="March 15, 2024"
      viewCount={1247}
      tags={["React", "TypeScript", "Web Development", "Frontend"]}
      featuredImage={techImage}
      readTime={8}
    />
  );
}