import {
  Search,
  Film,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#201F31] to-[#1A1927] text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center mb-4  justify-center text-center py-24 px-5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400"
            variants={fadeIn}
          >
            Book Your Favorite Movie Tickets 🎬
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            Experience movies like never before with easy online booking, best
            seats, and real-time availability.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-pink-500/20 hover:shadow-xl"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1927] to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      </section>

      {/* Quick Tickets Section */}
      <motion.section
        className="relative mx-4 md:mx-8 lg:mx-16 mb-16 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0  bg-gradient-to-br from-[#2B2A3C] to-[#252438] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="relative flex flex-col md:flex-row gap-8 p-8 md:p-10">
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="inline-block text-4xl font-bold bg-gradient-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent px-4 py-2 rounded-lg shadow-lg tracking-wide">
                Quick<span className="text-yellow-300">Tickets</span>
              </h2>
              <p className="text-gray-300 max-w-md">
                Find the perfect movie and showtime in seconds
              </p>
            </div>

            <div className="relative  w-full max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search for movies, theaters, or genres..."
                className="pl-10 pr-24 py-6 bg-white/10 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-[#dd2476] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2A3C]"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bottom-1 h-[80%] flex items-center justify-center bg-gradient-to-r from-[#ff512f] to-[#dd2476] hover:from-[#ff6b4a] hover:to-[#e93a8a] text-white rounded-lg transition-all duration-300 px-4"
              >
                <Search className="mr-2 h-4 w-4" />
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

          <img
            src="/movie.webp"
            alt="Movie Poster"
            className="w-1/2  rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-20 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative"
          variants={fadeIn}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
            How It Works
          </span>
          <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Choose a Movie",
              icon: <Film className="w-10 h-10" />,
              description:
                "Browse our extensive collection of latest movies and classics",
            },
            {
              title: "Select Showtime & Seats",
              icon: <Calendar className="w-10 h-10" />,
              description:
                "Pick your preferred time and the best seats in the house",
            },
            {
              title: "Make Payment & Enjoy!",
              icon: <CreditCard className="w-10 h-10" />,
              description: "Secure checkout and instant ticket confirmation",
            },
          ].map((step, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="relative h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-0 shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 text-center relative z-10 h-full flex flex-col items-center">
                  <div className="text-4xl mb-6 p-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl group-hover:bg-pink-600/20 transition-colors duration-500"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Movies */}
      <motion.section
        className="py-20 px-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
        </div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative z-10"
          variants={fadeIn}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
            Featured Movies
          </span>
          <div className="absolute w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {[
            { title: "Interstellar", genre: "Sci-Fi", rating: "9.2/10" },
            { title: "The Dark Knight", genre: "Action", rating: "9.5/10" },
            { title: "Inception", genre: "Thriller", rating: "9.0/10" },
          ].map((movie, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="overflow-hidden bg-transparent border-0 shadow-xl group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                  <img
                    src={`/placeholder.svg?height=400&width=300&text=Movie+${
                      index + 1
                    }`}
                    alt={movie.title}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded z-20">
                    {movie.rating}
                  </div>
                </div>
                <CardContent className="relative p-6 bg-gradient-to-b from-gray-900 to-gray-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {movie.genre}
                      </span>
                      <span className="text-xs text-gray-500">2h 30m</span>
                    </div>
                    <h3 className="text-xl font-bold">{movie.title}</h3>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? "text-yellow-400" : "text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-300">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-20 px-8 bg-gradient-to-b from-gray-800/50 to-gray-900/50 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 relative inline-block"
            variants={fadeIn}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
              Contact Us
            </span>
            <div className="absolute w-full h-1 bg-gradient-to-r from-red-500 to-pink-500 bottom-0 left-0 mt-2 rounded-full"></div>
          </motion.h2>

          <motion.p className="text-gray-300 mb-8 text-lg" variants={fadeIn}>
            Have questions or need assistance? Our team is here to help!
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-10"
            variants={fadeIn}
          >
            <Card className="bg-gray-800/50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-3 rounded-full bg-red-600/20 mb-4">
                  <Mail className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-red-500 text-sm">support@movietickets.com</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-3 rounded-full bg-red-600/20 mb-4">
                  <Phone className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-red-500 text-sm">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-3 rounded-full bg-red-600/20 mb-4">
                  <MapPin className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="font-medium mb-2">Visit Us</h3>
                <p className="text-red-500 text-sm">
                  123 Cinema Street, Movie City
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 px-8 py-6 rounded-xl text-lg shadow-lg transition-all duration-300 hover:shadow-pink-500/20 hover:shadow-xl">
              Contact Support
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              QuickTickets
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
