import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Spinner from "@/components/Spinner";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);
  const [userData, setUserData] = useState(null);

  localStorage.setItem("userData", JSON.stringify(userData));

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        const userData = await axiosInstance.post("/auth", {
          id: user.id,
          name: user.fullName || `${user.firstName} ${user.lastName}`.trim(),
          email: user.emailAddresses[0].emailAddress,
        });
        setUserData(userData.data.data);
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return <Spinner />;
};

export default AuthCallbackPage;
