import React from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("http://localhost:8000/api/createuser", {
        const response = await fetch("https://workable-webapp-backend.onrender.com/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirecthh
      localStorage.setItem("authtoken", json.authToken);
      navigate("/login")
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
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
            Create an account
          </h1>
          <div className="my-4 mx-2 flex flex-col bg-white shadow-xl border-2 border-gray-100 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                 
                  name="first_name"
                  value={credentials.first_name}
                  onChange={onChange}
                  placeholder="First Name"
                  className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  
                  name="last_name"
                  value={credentials.last_name}
                  onChange={onChange}
                  placeholder="Last Name"
                  className="border border-gray-400 py-2 px-2 rounded-md bg-white placeholder-gray-500 focus:outline-none"
                />
              </div>
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

              <div className="px-5 text-gray-600 text-center">
                Already have an account?
                <Link to="/login" className="text-custom-blue font-semibold">
                  {" "}
                  Sign in
                </Link>
              </div>
              <button
                type="submit"
                className="mt-1 rounded-lg py-3 font-bold text-[15px] text-white bg-gren hover:bg-blur"
              >
                Register
              </button>
            </form>
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
      <ToastContainer />
    </div>
  );
}

export default Register;
