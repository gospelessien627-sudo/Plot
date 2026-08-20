import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/firebase";

import Login from "./Components/Login";
import Home from "./Components/Home";
import Flights from "./Components/Flights";
import FlightDetails from "./Components/FlightDetails";
import Booking from "./Components/Booking";
import SeatSelection from "./Components/SeatSelection";
import PassengerDetails from "./Components/PassengerDetails";
import Confirmation from "./Components/Confirmation";
import Loading from "./Components/Loading";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import AdminDashboard from "./Components/AdminDashboard";

function App() {

  const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => {
    unsubscribe();
    clearTimeout(timer);
  };

}, []);

if (loading) {
  return <Loading />;
}

  return (
    <BrowserRouter>

      <Routes>

  <Route
    path="/"
    element={<Home />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/flights"
    element={<Flights />}
  />

  <Route
    path="/flight-details"
    element={<FlightDetails />}
  />

  <Route
    path="/booking"
    element={<Booking />}
  />

  <Route
    path="/seat-selection"
    element={<SeatSelection />}
  />

  <Route
    path="/passenger-details"
    element={<PassengerDetails />}
  />

  <Route
    path="/confirmation"
    element={<Confirmation />}
  />

  {/* ADMIN */}
  <Route
    path="/admin"
    element={
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    }
  />

</Routes>

    </BrowserRouter>
  );
}

export default App;