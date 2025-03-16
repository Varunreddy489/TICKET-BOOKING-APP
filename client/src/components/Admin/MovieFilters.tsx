import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const MovieFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={genreFilter} onValueChange={setGenreFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="action">Action</SelectItem>
          <SelectItem value="adventure">Adventure</SelectItem>
          <SelectItem value="comedy">Comedy</SelectItem>
          <SelectItem value="drama">Drama</SelectItem>
          <SelectItem value="sci-fi">Sci-Fi</SelectItem>
          <SelectItem value="animation">Animation</SelectItem>
        </SelectContent>
      </Select>
      <Select value={languageFilter} onValueChange={setLanguageFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Languages</SelectItem>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="japanese">Japanese</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={() => {
          setSearchQuery("");
          setGenreFilter("all");
          setLanguageFilter("all");
          setStatusFilter("all");
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default MovieFilters;
