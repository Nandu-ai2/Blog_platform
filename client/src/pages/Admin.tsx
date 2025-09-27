import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminPostEditor from "@/components/AdminPostEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Admin() {
  const [currentView, setCurrentView] = useState<"list" | "editor">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Remove mock data - this would come from API
  const mockPosts = [
    {
      id: "1",
      title: "Building Modern Web Applications with React and TypeScript",
      slug: "modern-web-apps-react-typescript",
      status: "published",
      publishedAt: "Mar 15, 2024",
      viewCount: 1247,
      tags: ["React", "TypeScript"]
    },
    {
      id: "2",
      title: "The Future of Frontend Development",
      slug: "future-frontend-development",
      status: "published",
      publishedAt: "Mar 12, 2024",
      viewCount: 892,
      tags: ["Frontend", "Trends"]
    },
    {
      id: "3",
      title: "Draft: Advanced React Patterns",
      slug: "advanced-react-patterns",
      status: "draft",
      publishedAt: "—",
      viewCount: 0,
      tags: ["React", "Patterns"]
    }
  ];

  const handleCreateNew = () => {
    console.log("Create new post clicked");
    setCurrentView("editor");
  };

  const handleEditPost = (postId: string) => {
    console.log("Edit post clicked:", postId);
    setCurrentView("editor");
  };

  const handleDeletePost = (postId: string) => {
    console.log("Delete post clicked:", postId);
    if (confirm("Are you sure you want to delete this post?")) {
      // TODO: Implement delete functionality
    }
  };

  const handleViewPost = (slug: string) => {
    console.log("View post clicked:", slug);
    window.open(`/blog/${slug}`, "_blank");
  };

  const handleSavePost = (data: any) => {
    console.log("Post saved:", data);
    alert("Post saved successfully!");
    setCurrentView("list");
  };

  const handlePreview = () => {
    console.log("Preview opened");
    alert("Preview functionality would open in a new tab or modal");
  };

  const filteredPosts = mockPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (currentView === "editor") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="outline"
              onClick={() => setCurrentView("list")}
              className="mb-6"
              data-testid="button-back-to-list"
            >
              ← Back to Posts
            </Button>
            <AdminPostEditor
              onSave={handleSavePost}
              onPreview={handlePreview}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-admin-title">Blog Administration</h1>
              <p className="text-muted-foreground">Manage your blog posts and content</p>
            </div>
            <Button onClick={handleCreateNew} data-testid="button-create-post">
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-admin-search"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-posts">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="stat-published">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="stat-drafts">4</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-total-views">15.2k</div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground" data-testid="empty-posts">
                    No posts found matching your search.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                      data-testid={`post-item-${post.id}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium" data-testid={`post-title-${post.id}`}>
                            {post.title}
                          </h3>
                          <Badge 
                            variant={post.status === "published" ? "default" : "secondary"}
                            data-testid={`post-status-${post.id}`}
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Slug: {post.slug}</span>
                          <span>Published: {post.publishedAt}</span>
                          <span>Views: {post.viewCount}</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {post.status === "published" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewPost(post.slug)}
                            data-testid={`button-view-${post.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditPost(post.id)}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePost(post.id)}
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}