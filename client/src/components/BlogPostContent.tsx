import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Clock, Share2, Bookmark } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface BlogPostContentProps {
  title: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string;
  viewCount: number;
  tags: string[];
  featuredImage?: string;
  readTime?: number;
}

export default function BlogPostContent({
  title,
  content,
  authorName,
  authorAvatar,
  publishedAt,
  viewCount,
  tags,
  featuredImage,
  readTime = 5
}: BlogPostContentProps) {
  const handleShare = () => {
    console.log("Share triggered");
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    }
  };

  const handleBookmark = () => {
    console.log("Bookmark triggered");
    // TODO: Implement bookmark functionality
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" data-testid={`badge-tag-${index}`}>
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-title">
          {title}
        </h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-lg" data-testid="text-author">{authorName}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {publishedAt}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {viewCount} views
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark} data-testid="button-bookmark">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-auto"
            data-testid="img-featured"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert" data-testid="content-main">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}