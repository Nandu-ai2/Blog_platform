import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Eye, Clock } from "lucide-react";
import { Link } from "wouter";

interface BlogCardProps {
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

export default function BlogCard({
  id,
  title,
  excerpt,
  slug,
  featuredImage,
  authorName,
  authorAvatar,
  publishedAt,
  viewCount,
  tags,
  readTime = 5
}: BlogCardProps) {
  const handleCardClick = () => {
    console.log(`Blog card clicked: ${title}`);
  };

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200 group" data-testid={`card-blog-${id}`}>
      <Link href={`/blog/${slug}`} onClick={handleCardClick}>
        {featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`img-featured-${id}`}
            />
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-tag-${index}`}>
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2" data-testid={`text-title-${id}`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4" data-testid={`text-excerpt-${id}`}>
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium" data-testid={`text-author-${id}`}>{authorName}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {viewCount}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {readTime} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}