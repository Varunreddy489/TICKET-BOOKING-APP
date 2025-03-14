import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Layout from "./layout/Layout";
import LandingPage from "./pages/LandingPage";
import AuthCallback from "./pages/AuthCallback";
import MoviePage from "./pages/MoviePage";
import Tickets from "./pages/Tickets";

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
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tickets/:movieId" element={<Tickets />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
