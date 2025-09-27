import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  searchQuery: string;
  selectedTags: string[];
  selectedCategory: string;
  sortBy: string;
  onSearchChange: (query: string) => void;
  onTagToggle: (tag: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  availableTags: string[];
  availableCategories: string[];
}

export default function SearchFilters({
  searchQuery,
  selectedTags,
  selectedCategory,
  sortBy,
  onSearchChange,
  onTagToggle,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  availableTags,
  availableCategories
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search triggered for:", searchQuery);
  };

  const handleTagClick = (tag: string) => {
    console.log("Tag toggled:", tag);
    onTagToggle(tag);
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedCategory || sortBy !== "newest";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-20"
          data-testid="input-search-main"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          data-testid="button-toggle-filters"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </form>

      {/* Filters Panel */}
      {isFiltersOpen && (
        <div className="bg-muted/30 rounded-lg p-4 space-y-4" data-testid="panel-filters">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort by</label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover-elevate"
                  onClick={() => handleTagClick(tag)}
                  data-testid={`badge-filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap" data-testid="active-filters">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryChange("")}
              />
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleTagClick(tag)}
              />
            </Badge>
          ))}
          {sortBy !== "newest" && (
            <Badge variant="secondary" className="gap-1">
              Sort: {sortBy}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSortChange("newest")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}