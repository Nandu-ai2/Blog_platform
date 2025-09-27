import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  searchQuery: string;
  selectedTags: string[];
}

export default function SearchFilter({
  onSearch,
  onTagFilter,
  searchQuery,
  selectedTags
}: SearchFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const { data: allTags = [] } = useQuery({
    queryKey: ["/api/tags"],
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(localSearch);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearch, onSearch]);

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagFilter(newTags);
  };

  const clearAllFilters = () => {
    setLocalSearch("");
    onSearch("");
    onTagFilter([]);
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10 pr-4 py-2"
          data-testid="search-filter-input"
        />
      </div>

      {/* Filter Tags */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filter by Tags:</h3>
          {(selectedTags.length > 0 || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
              data-testid="clear-filters"
            >
              <X className="h-3 w-3 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTags.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => onTagFilter([])}
            className="rounded-full"
            data-testid="tag-filter-all"
          >
            All Posts
          </Button>
          
          {(allTags as string[]).map((tag: string) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagClick(tag)}
              className="rounded-full"
              data-testid={`tag-filter-${tag}`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedTags.length > 0) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" data-testid="active-search-filter">
                Search: "{searchQuery}"
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" data-testid={`active-tag-filter-${tag}`}>
                Tag: {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
