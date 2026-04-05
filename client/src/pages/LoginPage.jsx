import { useContext, useState } from 'react';
import React from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', {
      fullName,
      email,
      password,
      bio
    });
  };

  return (
    <div className="min-h-screen bg-[#111b21] flex items-center justify-center px-4">

      {/* CARD */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-[#202c33] p-8 rounded-xl shadow-lg flex flex-col gap-6"
      >

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            {currState === "Sign up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {currState === "Sign up"
              ? "Start chatting with your friends"
              : "Login to continue"}
          </p>
        </div>

        {/* NAME */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
          />
        )}

        {/* EMAIL + PASSWORD */}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
            />
          </>
        )}

        {/* BIO STEP */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            rows={4}
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="bg-[#2a3942] p-3 rounded outline-none text-white placeholder-gray-400"
          />
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-[#00a884] py-3 rounded text-white font-medium hover:scale-105 transition"
        >
          {currState === "Sign up"
            ? (isDataSubmitted ? "Create Account" : "Next")
            : "Login"}
        </button>

        {/* SWITCH */}
        <p className="text-sm text-gray-400 text-center">
          {currState === "Sign up"
            ? "Already have an account?"
            : "New user?"}
          <span
            onClick={() => {
              setCurrState(currState === "Sign up" ? "Login" : "Sign up");
              setIsDataSubmitted(false);
            }}
            className="text-[#00a884] ml-1 cursor-pointer"
          >
            {currState === "Sign up" ? "Login" : "Sign up"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default LoginPage;