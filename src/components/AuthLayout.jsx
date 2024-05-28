import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserPosts } from "../store/postSlice";
import Loader from "./Loader";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const redirectTo = authentication ? "/login" : "/";
  //     if (authStatus !== authentication) {
  //       navigate(redirectTo);
  //     }
  //     setLoader(false);
  //   }, [authStatus, navigate, authentication]);

  useEffect(() => {
    const redirectTo = authentication ? "/login" : "/";
    if (authStatus !== authentication) {
      navigate(redirectTo);
    }

    // Simulate loading for 2 seconds (adjust timeout duration as needed)
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 2000);

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [authStatus, navigate, authentication]);

  const fetchUserPosts = async () => {
    try {
      const userPosts = await appwriteService.getUserPosts();
      dispatch(setUserPosts(userPosts));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
    console.log(fetchUserPosts);
  };

  return loader ? (
    // <div className="flex justify-center items-center h-screen">
    //   <div
    //     className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
    //     role="status"
    //   >
    //     <span className="visually-hidden">Loading...</span>
    //   </div>
    // </div>
    <Loader />
  ) : (
    <>{children}</>
  );
}
