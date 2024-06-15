import React from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    // const response = await fetch("http://localhost:8000/api/loginuser", {
      const response = await fetch("https://workable-webapp-backend.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));

      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    // Header section
    <div className="flex flex-col min-h-screen">
      <div className="py-2 bg-custom-blue">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              className="h-16 w-42 p-2 mx-auto"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-center flex-grow">
        <div className="flex flex-col w-full max-w-md mx-4 my-14 md:mx-auto">
          <h1 className="text-2xl text-center font-semibold mb-4">
            <Link to="/signup" className="hover:text-custom-blue">
              Create an account
            </Link>{" "}
            or log in
          </h1>
          <div className="my-4 mx-2 flex flex-col bg-white shadow-xl border-2 border-gray-100 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Email address"
                  className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "password" : "text"}
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full border border-gray-400 bg-white rounded-md py-2 px-2 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 py-2 rounded-md"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="mt-4 rounded-lg py-3 font-bold text-sm text-white bg-gren hover:bg-blur"
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm font-bold text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              //   onClick={handleSignInWithGoogle}
              className="w-full rounded-lg border border-gray-500 font-bold text-lg text-gray-500 hover:text-gray-400 bg-white py-2 flex justify-center items-center gap-4"
            >
              <FcGoogle className="text-xl" />
              <p className="text-sm">Continue with Google</p>
            </button>
          </div>
          <div className="mt-4 text-center px-2 text-sm">
            <p>
              By signing up and using the services, you confirm that you have
              accepted our
              <span className="text-gren cursor-pointer hover:underline">
                {" "}
                Terms and Conditions{" "}
              </span>
              and have read our
              <span className="text-gren cursor-pointer hover:underline">
                {" "}
                Privacy Policy{" "}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default Login;
