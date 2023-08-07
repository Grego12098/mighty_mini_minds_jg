import {useState, useEffect, useContext } from "react";
import logo from "../../Img/logo-close.png";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../auth/AuthProvider";
import { getRandomQuote } from "./getRandomQuote";

export default function Login() {
  const { session, supabase } = useContext(AuthContext);
  const randomQuote = getRandomQuote();
  
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) {
        console.error("Login error:", error);
      } else {
        console.log("Login successful:", user);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen overflow-y-hidden">
      <img
        src={logo}
        alt="logo"
        className="h-24 w-40 my-8"
      />
      <div className="overflow-y-scroll scrollbar flex flex-col  justify-between align-center w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 h-3/4 sm:h-4/6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="my-6 sm:my-10 font-bold text-center text-xl sm:text-4xl">
          Mighty Mini Minds
        </h1>
        {/* {isError? <p className="my-2 text-center text-base sm:text-lg">{errorMessage}</p> : null} */}
        {randomQuote && (
          <div className="flex flex-col my-4">
            <p className="sm:text-xl font-semibold mx-5">{randomQuote.quote}</p>
            <p className="italic text-sm mt-1">
              {randomQuote.book} by {randomQuote.author}
            </p>
          </div>
        )}

        <div className="flex flex-col items-center">
          <label className="text-lg sm:text-2xl mt-4">Email</label>
          <input
            aria-label="email"
            value={loginData.email}
            name="email"
            onChange={handleChange}
            className="bg-skin-input shadow-md p-1 rounded-lg w-[75%] sm:w-80"
          />
          <label className="text-lg sm:text-2xl mt-5">Password</label>
          <input
            aria-label="password"
            value={loginData.password}
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-skin-input shadow-md p-1 rounded-lg w-[75%] sm:w-80"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="rounded-md w-32 h-14 sm:w-40 sm:h-16 sm:text-xl bg-skin-secondary shadow-md text-white  transition-colors duration-300 ease-in-out transform hover:scale-125 my-8"
          >
            Login
          </button>
        </div>
      </div>
      <div className="space-y-2 my-8 text-center">
        <div className="underline sm:text-xl text-skin-primary">
          <NavLink to="signup">No account? Sign up here!</NavLink>
        </div>
        <div className="underline sm:text-lg text-skin-primary mt-2">
          <NavLink to="./about">About Us</NavLink>
        </div>
      </div>
    </div>
  );
}
