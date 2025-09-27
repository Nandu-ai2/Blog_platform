import SearchFilters from '../SearchFilters';
import { useState } from 'react';

export default function SearchFiltersExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const availableTags = [
    "React", "TypeScript", "JavaScript", "Web Development", 
    "Frontend", "Backend", "Performance", "UI/UX", "DevOps", "Testing"
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

  return (
    <div className="max-w-4xl mx-auto p-6">
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
  );
}