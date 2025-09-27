import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Filter, Edit } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-primary" data-testid="logo">
              <i className="fas fa-blog mr-2"></i>BlogCraft
            </h1>
            <Button onClick={handleLogin} data-testid="login-button">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="hero-title">
            Welcome to BlogCraft
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="hero-description">
            A modern blog platform for developers, designers, and creators. Share your knowledge and connect with a community of passionate learners.
          </p>
          <Button onClick={handleLogin} size="lg" className="px-8 py-3" data-testid="hero-login-button">
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rich Content</h3>
              <p className="text-muted-foreground text-sm">
                Create beautiful blog posts with Markdown support and rich formatting options.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground text-sm">
                Find content quickly with our powerful search and filtering capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Filter className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tag System</h3>
              <p className="text-muted-foreground text-sm">
                Organize and discover content with an intelligent tag-based system.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Edit className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Editing</h3>
              <p className="text-muted-foreground text-sm">
                Intuitive admin interface for creating and managing your blog content.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sample Content Preview */}
        <div className="bg-card rounded-xl border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Featured Content
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6">
              <div className="text-3xl text-primary/20 mb-4">
                <i className="fas fa-blog"></i>
              </div>
              <h3 className="font-semibold mb-2">Getting Started with React</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Learn the fundamentals of React development and modern best practices.
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <i className="fas fa-clock mr-1"></i>
                8 min read
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6">
              <div className="text-3xl text-primary/20 mb-4">
                <i className="fas fa-blog"></i>
              </div>
              <h3 className="font-semibold mb-2">Modern CSS Techniques</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Explore the latest CSS features and how to use them in your projects.
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <i className="fas fa-clock mr-1"></i>
                10 min read
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6">
              <div className="text-3xl text-primary/20 mb-4">
                <i className="fas fa-blog"></i>
              </div>
              <h3 className="font-semibold mb-2">TypeScript Best Practices</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Essential patterns for building maintainable TypeScript applications.
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <i className="fas fa-clock mr-1"></i>
                15 min read
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 BlogCraft. All rights reserved. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}