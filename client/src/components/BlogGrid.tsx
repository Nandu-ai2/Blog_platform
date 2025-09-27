import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string;
  viewCount: number;
  tags: string[];
  readTime?: number;
}

interface BlogGridProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function BlogGrid({ 
  posts, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false 
}: BlogGridProps) {
  
  const handlePageChange = (page: number) => {
    console.log("Page change requested:", page);
    onPageChange(page);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse" data-testid={`skeleton-${i}`}>
              <div className="bg-muted rounded-lg h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="bg-muted rounded h-4 w-3/4"></div>
                <div className="bg-muted rounded h-4 w-1/2"></div>
                <div className="bg-muted rounded h-3 w-full"></div>
                <div className="bg-muted rounded h-3 w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-state">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No posts found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Blog Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="blog-grid">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            featuredImage={post.featuredImage}
            authorName={post.authorName}
            authorAvatar={post.authorAvatar}
            publishedAt={post.publishedAt}
            viewCount={post.viewCount}
            tags={post.tags}
            readTime={post.readTime}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4" data-testid="pagination">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrentPage = page === currentPage;
              
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1;

              if (!showPage) {
                // Show ellipsis for gaps
                if (page === 2 && currentPage > 4) {
                  return <span key={page} className="text-muted-foreground">...</span>;
                }
                if (page === totalPages - 1 && currentPage < totalPages - 3) {
                  return <span key={page} className="text-muted-foreground">...</span>;
                }
                return null;
              }

              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  data-testid={`button-page-${page}`}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            data-testid="button-next-page"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-sm text-muted-foreground" data-testid="results-info">
        Page {currentPage} of {totalPages} • {posts.length} posts
      </div>
    </div>
  );
}