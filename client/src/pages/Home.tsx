import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import BlogGrid from "@/components/BlogGrid";
import heroImage from '@assets/generated_images/Blog_platform_hero_image_44a8acc4.png';
import techImage from '@assets/generated_images/Tech_blog_featured_image_f6c58acb.png';
import webDevImage from '@assets/generated_images/Web_dev_blog_image_96a615cb.png';
import maleAvatar from '@assets/generated_images/Male_author_avatar_02437b0d.png';
import femaleAvatar from '@assets/generated_images/Female_author_avatar_9aef1865.png';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
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

  const availableTags = [
    "React", "TypeScript", "JavaScript", "Web Development", 
    "Frontend", "Backend", "Performance", "UI/UX", "DevOps", 
    "GraphQL", "API", "CSS", "Design", "Cloud", "Innovation"
  ];
  
  const availableCategories = [
    "Web Development", "Mobile Development", "DevOps", 
    "Design", "Career", "Technology News"
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory("");
    setSortBy("newest");
    setSearchQuery("");
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Filter posts based on current filters
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-muted/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
              Welcome to <span className="text-primary">BlogForge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
              Discover insightful articles about web development, design, and technology. 
              Join our community of creators and stay ahead of the curve.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchFilters
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onSearchChange={setSearchQuery}
              onTagToggle={handleTagToggle}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
              availableTags={availableTags}
              availableCategories={availableCategories}
            />
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogGrid
              posts={filteredPosts}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / 6)}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}