// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import "./App.css";
// import authService from "./appwrite/auth";
// import { login, logout } from "./store/authSlice";
// import { Footer, Header, Loader } from "./components";
// import { Outlet } from "react-router-dom";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     authService
//       .getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login(userData));
//         } else {
//           dispatch(logout());
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return !loading ? (
//     <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
//       <Header />
//       <main className="flex-grow">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-">
//           <Outlet />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   ) : null;
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loader } from "./components"; // Assuming Loader component is available
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Display loader when loading state is true
  if (loading) {
    return <Loader />;
  }

  // If user is logged out, prompt them to sign up or sign in
  if (!authService.getCurrentUser()) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-">
            <div className="flex flex-col items-center justify-center h-screen">
              <p className="text-xl font-bold mb-4">
                Please{" "}
                <Link className="text-blue-500 hover:underline" to="/login">
                  Login
                </Link>{" "}
                Or{" "}
                <Link className="text-blue-500 hover:underline" to="/signup">
                  Signup
                </Link>{" "}
                to continue.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is logged in, render the main content
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
