import BlogCard from '../BlogCard';
import heroImage from '@assets/generated_images/Blog_platform_hero_image_44a8acc4.png';
import techImage from '@assets/generated_images/Tech_blog_featured_image_f6c58acb.png';
import webDevImage from '@assets/generated_images/Web_dev_blog_image_96a615cb.png';
import maleAvatar from '@assets/generated_images/Male_author_avatar_02437b0d.png';
import femaleAvatar from '@assets/generated_images/Female_author_avatar_9aef1865.png';

export default function BlogCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      <BlogCard
        id="1"
        title="Building Modern Web Applications with React and TypeScript"
        excerpt="Learn how to create scalable, type-safe web applications using the latest React patterns and TypeScript best practices. This comprehensive guide covers everything from setup to deployment."
        slug="modern-web-apps-react-typescript"
        featuredImage={techImage}
        authorName="John Smith"
        authorAvatar={maleAvatar}
        publishedAt="Mar 15, 2024"
        viewCount={1247}
        tags={["React", "TypeScript", "Web Development"]}
        readTime={8}
      />
      
      <BlogCard
        id="2"
        title="The Future of Frontend Development"
        excerpt="Exploring emerging trends in frontend development, from new frameworks to improved developer experiences. Discover what's coming next in the world of web development."
        slug="future-frontend-development"
        featuredImage={webDevImage}
        authorName="Sarah Johnson"
        authorAvatar={femaleAvatar}
        publishedAt="Mar 12, 2024"
        viewCount={892}
        tags={["Frontend", "Trends", "Innovation"]}
        readTime={6}
      />
      
      <BlogCard
        id="3"
        title="Optimizing Performance in Large Scale Applications"
        excerpt="Performance optimization strategies for enterprise-level applications. Learn about code splitting, lazy loading, and advanced caching techniques."
        slug="performance-optimization-guide"
        featuredImage={heroImage}
        authorName="Mike Chen"
        authorAvatar={maleAvatar}
        publishedAt="Mar 10, 2024"
        viewCount={634}
        tags={["Performance", "Optimization", "Enterprise"]}
        readTime={12}
      />
    </div>
  );
}