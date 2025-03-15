import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Ticket, Film, Calendar, Star } from "lucide-react";

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2B2A3C] to-[#1F1E2C] p-6 md:p-8 lg:p-10 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#ff512f] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-[#dd2476] blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Quick<span className="text-yellow-300">Tickets</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Find and book movie tickets in seconds
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search for movies, theaters..."
              className="pl-10 pr-4 py-6 bg-white/10 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-[#dd2476] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3C]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-[#ff512f] to-[#dd2476] hover:from-[#ff6b4a] hover:to-[#e93a8a] text-white rounded-lg transition-all duration-300"
            >
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Film className="mr-2 h-4 w-4" />
              Now Playing
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Coming Soon
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Star className="mr-2 h-4 w-4" />
              Top Rated
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Movie Poster"
                className="h-auto w-full max-w-xs rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Latest Releases</h3>
                    <p className="text-gray-300 text-sm">
                      Book now for best seats
                    </p>
                  </div>
                  <Button size="sm" className="bg-[#dd2476] hover:bg-[#c01e67]">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// <img
// src="/movie.webp"
// alt="Movie Poster"
// className="w-1/2  rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
// />
