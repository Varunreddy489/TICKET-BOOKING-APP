import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Ticket,
  ArrowRight,
  Mail,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        {/* <div className="max-w-3xl mx-auto mb-12 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
          <p className="mb-4">Get the latest updates on new releases, special offers, and exclusive content.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700/50 border-gray-600 focus-visible:ring-yellow-500"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              <Link
                to="#"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-sky-500 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="#"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="#"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>

            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 p-2 rounded-lg mr-3">
                <Ticket className="h-5 w-5 text-gray-900" />
              </div>
              <h2 className="text-xl font-bold text-white">QuickTickets</h2>
            </div>

            <p className="text-sm">
              Your one-stop destination for booking movie tickets, events, and
              more. Experience entertainment like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  List Your Show
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  24/7 Customer Care
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  Resend Booking Confirmation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  Subscribe to Newsletter
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  Corporate Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Movies Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Movies</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Now Showing
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Upcoming Movies
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Movies by Genre
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Movies by Language
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Movie Trailers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Movie Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Events & Cinemas */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Events & Cinemas
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Sports Events
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Events in Top Cities
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Cinemas in Top Cities
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Plays in Top Cities
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  Activities in Top Cities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-2">Popular Cities</h4>
            <p className="text-gray-400 mb-4">
              Mumbai • Delhi • Bengaluru • Hyderabad • Chennai • Kolkata • Noida
              • Pune • Ahmedaba • Gurgaon • Jaipur • Chandigarh • Kochi • Indore
            </p>

            <h4 className="font-semibold text-white mb-2">Help & Support</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <Link
                to="#"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="#"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link
                to="#"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link
                to="#"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                FAQs
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-yellow-500" />
              <a
                href="mailto:support@quicktickets.com"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                support@quicktickets.com
              </a>
            </div>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} QuickTickets. All rights
              reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              The content and images used on this site are copyright protected
              and copyrights vests with the respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
