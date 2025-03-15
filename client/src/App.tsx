import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Layout from "./layout/Layout";
import Tickets from "./pages/Tickets";
import MoviePage from "./pages/MoviePage";
import LandingPage from "./pages/LandingPage";
import AuthCallback from "./pages/AuthCallback";

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
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tickets/:movieId" element={<Tickets />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
