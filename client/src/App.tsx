import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Tickets from "./pages/Tickets";
import User from "./pages/User/User";
import MoviePage from "./pages/MoviePage";
import MovieSeats from "./pages/MovieSeats";
import Reports from "./pages/Admin/Reports";
import Wallet from "./pages/User/UserWallet";
import LandingPage from "./pages/LandingPage";
import AuthCallback from "./pages/AuthCallback";
import Showtimes from "./pages/Admin/Showtimes";
import { Toaster } from "./components/ui/sonner";
import AdminMovies from "./pages/Admin/AdminMovies";
// import PaymentSuccess from "./components/PaymentSuccess";
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
          <Route path="/profile/:id" element={<User />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          {/* <Route path="/success" element={<PaymentSuccess />} /> */}
          <Route path="/seats/:movieId/:time" element={<MovieSeats />} />
        </Route>
        // ^ Admin Routes
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/showtimes" element={<Showtimes />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

/*
hey for my movie booking application i want to implement a feature where if two users are trying to book a same seat at the same time then the second user should be notified that the seat is already booked and he should be redirected to the previous page.how do i implement that feature
*/
