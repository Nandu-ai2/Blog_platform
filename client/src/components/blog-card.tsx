import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="blog-card bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1" data-testid={`blog-card-${post.slug}`}>
        <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
          <div className="text-6xl text-primary/20">
            <i className="fas fa-blog"></i>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium"
                data-testid={`tag-${tag}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2" data-testid="post-title">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3" data-testid="post-description">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span data-testid="post-date">
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span data-testid="post-read-time">{post.readTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
