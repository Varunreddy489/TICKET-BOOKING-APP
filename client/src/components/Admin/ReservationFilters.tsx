import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const ReservationFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [movieFilter, setMovieFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by customer or email..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full md:w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select value={movieFilter} onValueChange={setMovieFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Movie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Movies</SelectItem>
          <SelectItem value="dune">Dune: Part Two</SelectItem>
          <SelectItem value="deadpool">Deadpool & Wolverine</SelectItem>
          <SelectItem value="furiosa">Furiosa: A Mad Max Saga</SelectItem>
          <SelectItem value="insideout">Inside Out 2</SelectItem>
          <SelectItem value="fallguy">The Fall Guy</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={() => {
          setSearchQuery("");
          setDate(new Date());
          setMovieFilter("all");
          setStatusFilter("all");
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export default ReservationFilters