import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

const Login = () => {

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // false = signup
  // true = login
  const [isLogin, setIsLogin] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      // =================================
      // SIGN UP
      // =================================

      if (!isLogin) {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user = userCredential.user;

        // Save user's name to Firebase Authentication
        await updateProfile(user, {
          displayName: name
        });

        // Normal users go to flights
        navigate("/flights");

      }


      // =================================
      // LOGIN
      // =================================

     // =================================
// LOGIN
// =================================
else {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const user = userCredential.user;

  console.log("================================");
  console.log("LOGIN SUCCESS");
  console.log("UID:", user.uid);
  console.log("EMAIL:", user.email);
  console.log("================================");

  const adminRef = doc(db, "admins", user.uid);
  const adminSnap = await getDoc(adminRef);

  console.log("Admin document exists:", adminSnap.exists());

  if (adminSnap.exists()) {
    const adminData = adminSnap.data();

    console.log("ADMIN DOCUMENT:", adminData);
    console.log("ADMIN ROLE:", adminData.role);

    if (adminData.role === "admin") {
      console.log("🔥🔥🔥 ADMIN DETECTED — GOING TO ADMIN");

      navigate("/admin", { replace: true });

      return;
    }
  }

  console.log("❌ NOT ADMIN — GOING TO FLIGHTS");

  navigate("/flights", { replace: true });
}

    } catch (error) {

      console.error("Login error:", error);

      // Firebase error messages

      if (
        error.code === "auth/email-already-in-use"
      ) {

        setError(
          "This email is already registered."
        );

      } else if (
        error.code === "auth/invalid-email"
      ) {

        setError(
          "Please enter a valid email address."
        );

      } else if (
        error.code === "auth/weak-password"
      ) {

        setError(
          "Password must be at least 6 characters."
        );

      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {

        setError(
          "Invalid email or password."
        );

      } else {
  setError(error.message);
}

    } finally {

      setLoading(false);

    }

  };


  return (

    <nav>

      <div className="plan">

        <div className="login-card">

          <h2>
            {isLogin
              ? "Skywings Login"
              : "Create Account"}
          </h2>


          <form onSubmit={handleSubmit}>


            {/* NAME ONLY FOR SIGNUP */}

            {!isLogin && (

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Full Name"
                required
              />

            )}


            {/* EMAIL */}

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email Address"
              required
            />


            {/* PASSWORD */}

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Password"
              required
            />


            {/* ERROR */}

            {error && (

              <p className="error-message">
                {error}
              </p>

            )}


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading ? (

                <>
                  <FaSpinner className="spinner" />

                  {isLogin
                    ? "Logging in..."
                    : "Creating account..."}
                </>

              ) : (

                isLogin
                  ? "Log in"
                  : "Sign up"

              )}

            </button>


            {/* SWITCH LOGIN / SIGNUP */}

            <p
              className="loll"
              onClick={() => {

                setIsLogin(!isLogin);
                setError("");

              }}

              style={{
                cursor: "pointer",
                color: "blue"
              }}
            >

              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}

            </p>

          </form>

        </div>

      </div>

    </nav>

  );

};

export default Login;