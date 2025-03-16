import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Tickets from "./pages/Tickets";
import MoviePage from "./pages/MoviePage";
import Reports from "./pages/Admin/Reports";
import LandingPage from "./pages/LandingPage";
import AuthCallback from "./pages/AuthCallback";
import Showtimes from "./pages/Admin/Showtimes";
import AdminMovies from "./pages/Admin/AdminMovies";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import AdminReservations from "./pages/Admin/AdminReservations";

const App = () => {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
          }
        />
        // * Layout Routes
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tickets/:movieId" element={<Tickets />} />
        </Route>
        // ^ Admin Routes
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/showtimes" element={<Showtimes />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
      </Routes>
    </div>
  );
};

export default App;
