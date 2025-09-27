import BlogGrid from '../BlogGrid';
import { useState } from 'react';
import heroImage from '@assets/generated_images/Blog_platform_hero_image_44a8acc4.png';
import techImage from '@assets/generated_images/Tech_blog_featured_image_f6c58acb.png';
import webDevImage from '@assets/generated_images/Web_dev_blog_image_96a615cb.png';
import maleAvatar from '@assets/generated_images/Male_author_avatar_02437b0d.png';
import femaleAvatar from '@assets/generated_images/Female_author_avatar_9aef1865.png';

export default function BlogGridExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Remove mock data - this would come from API
  const mockPosts = [
    {
      id: "1",
      title: "Building Modern Web Applications with React and TypeScript",
      excerpt: "Learn how to create scalable, type-safe web applications using the latest React patterns and TypeScript best practices. This comprehensive guide covers everything from setup to deployment.",
      slug: "modern-web-apps-react-typescript",
      featuredImage: techImage,
      authorName: "John Smith",
      authorAvatar: maleAvatar,
      publishedAt: "Mar 15, 2024",
      viewCount: 1247,
      tags: ["React", "TypeScript", "Web Development"],
      readTime: 8
    },
    {
      id: "2",
      title: "The Future of Frontend Development",
      excerpt: "Exploring emerging trends in frontend development, from new frameworks to improved developer experiences. Discover what's coming next in the world of web development.",
      slug: "future-frontend-development",
      featuredImage: webDevImage,
      authorName: "Sarah Johnson",
      authorAvatar: femaleAvatar,
      publishedAt: "Mar 12, 2024",
      viewCount: 892,
      tags: ["Frontend", "Trends", "Innovation"],
      readTime: 6
    },
    {
      id: "3",
      title: "Optimizing Performance in Large Scale Applications",
      excerpt: "Performance optimization strategies for enterprise-level applications. Learn about code splitting, lazy loading, and advanced caching techniques.",
      slug: "performance-optimization-guide",
      featuredImage: heroImage,
      authorName: "Mike Chen",
      authorAvatar: maleAvatar,
      publishedAt: "Mar 10, 2024",
      viewCount: 634,
      tags: ["Performance", "Optimization", "Enterprise"],
      readTime: 12
    },
    {
      id: "4",
      title: "Getting Started with GraphQL",
      excerpt: "A beginner's guide to GraphQL, covering schema design, queries, mutations, and best practices for building efficient APIs.",
      slug: "getting-started-graphql",
      featuredImage: techImage,
      authorName: "Emily Davis",
      authorAvatar: femaleAvatar,
      publishedAt: "Mar 8, 2024",
      viewCount: 543,
      tags: ["GraphQL", "API", "Backend"],
      readTime: 10
    },
    {
      id: "5",
      title: "CSS Grid vs Flexbox: When to Use Each",
      excerpt: "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method for optimal results.",
      slug: "css-grid-vs-flexbox",
      featuredImage: webDevImage,
      authorName: "Alex Rodriguez",
      authorAvatar: maleAvatar,
      publishedAt: "Mar 5, 2024",
      viewCount: 721,
      tags: ["CSS", "Layout", "Design"],
      readTime: 7
    },
    {
      id: "6",
      title: "Deploying Applications to the Cloud",
      excerpt: "Step-by-step guide to deploying modern web applications to various cloud platforms including AWS, Vercel, and Netlify.",
      slug: "deploying-applications-cloud",
      featuredImage: heroImage,
      authorName: "Lisa Wang",
      authorAvatar: femaleAvatar,
      publishedAt: "Mar 3, 2024",
      viewCount: 456,
      tags: ["Deployment", "Cloud", "DevOps"],
      readTime: 9
    }
  ];

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <BlogGrid
        posts={mockPosts}
        currentPage={currentPage}
        totalPages={3}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}