import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share, 
  Bookmark, 
  ChevronRight,
  AlertCircle,
  MessageCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [comment, setComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [commenterEmail, setCommenterEmail] = useState("");

  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useQuery<BlogPost>({
    queryKey: [`/api/blogs/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["/api/blogs?limit=2"],
    enabled: !!post,
  });

  const commentMutation = useMutation({
    mutationFn: async (commentData: { content: string; name: string; email: string }) => {
      // This would typically post to a comments API
      return await apiRequest("POST", `/api/blogs/${slug}/comments`, commentData);
    },
    onSuccess: () => {
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      });
      setComment("");
      setCommenterName("");
      setCommenterEmail("");
      // In a real app, you'd invalidate the comments query
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !commenterName.trim() || !commenterEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    commentMutation.mutate({
      content: comment,
      name: commenterName,
      email: commenterEmail,
    });
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Post link copied to clipboard.",
      });
    }
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Post saved to your bookmarks.",
    });
  };

  if (isError) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive" data-testid="error-alert">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error && error.message.includes("404") 
              ? "Blog post not found."
              : "Failed to load blog post. Please try again later."}
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert data-testid="not-found-alert">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Blog post not found.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8" data-testid="breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li>
            {post.tags.length > 0 && <span>{post.tags[0]}</span>}
          </li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-foreground truncate">{post.title}</li>
        </ol>
      </nav>

      {/* Blog Post Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary"
              data-testid={`tag-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="post-title">
          {post.title}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6" data-testid="post-description">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span data-testid="post-views">{post.views.toLocaleString()} views</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" data-testid="like-button">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} data-testid="share-button">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark} data-testid="bookmark-button">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mb-8 flex items-center justify-center">
        <div className="text-8xl text-primary/20">
          <i className="fas fa-blog"></i>
        </div>
      </div>

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none blog-content mb-12" data-testid="post-content">
        <div className="whitespace-pre-wrap text-foreground leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Author Info */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4" data-testid="author-info">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <div className="text-2xl text-primary">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-1" data-testid="author-name">
                {post.authorName}
              </h4>
              <p className="text-muted-foreground mb-3" data-testid="author-title">
                {post.authorTitle}
              </p>
              <p className="text-sm text-muted-foreground" data-testid="author-bio">
                {post.authorBio}
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Posts */}
      {(relatedPosts as any)?.posts && (relatedPosts as any).posts.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="related-posts-title">
            Related Posts
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {(relatedPosts as any).posts.slice(0, 2).map((relatedPost: BlogPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <Card className="blog-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1" data-testid={`related-post-${relatedPost.slug}`}>
                  <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                    <div className="text-4xl text-primary/20">
                      <i className="fas fa-blog"></i>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-1 bg-primary/10 text-primary text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedPost.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {new Date(relatedPost.publishDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="space-y-8">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-6 w-6" />
          <h3 className="text-2xl font-bold text-foreground" data-testid="comments-title">
            Comments
          </h3>
        </div>
        
        {/* Comment Form */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
            <form onSubmit={handleCommentSubmit} className="space-y-4" data-testid="comment-form">
              <div>
                <Label htmlFor="comment">Your Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="resize-none"
                  data-testid="comment-textarea"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    placeholder="Your name"
                    data-testid="commenter-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={commenterEmail}
                    onChange={(e) => setCommenterEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-testid="commenter-email-input"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={commentMutation.isPending}
                data-testid="submit-comment-button"
              >
                {commentMutation.isPending ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Placeholder for comments */}
        <div className="text-center py-8 text-muted-foreground" data-testid="no-comments">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      </section>
    </main>
  );
}
