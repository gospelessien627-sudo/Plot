import React, { useState } from "react";
import "./Booking.css";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { flight, passengers, date } = location.state || {};

  const [bookingData, setBookingData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookingData.title ||
      !bookingData.firstName ||
      !bookingData.lastName ||
      !bookingData.email ||
      !bookingData.phone
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Start loading
    setLoading(true);

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Go to seat selection WITH the data
    navigate("/seat-selection", {
      state: {
        flight,
        passengers,
        date,
        bookingData,
      },
    });
  };

  if (!flight) {
    return <h2>No booking information found.</h2>;
  }

  return (
    <div className="booking-page">

      <h1>Passenger Information</h1>

      <form onSubmit={handleSubmit}>

        <label>Title</label>

        <select
          name="title"
          value={bookingData.title}
          onChange={handleChange}
        >
          <option value="">Select title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
        </select>

        <label>First Name</label>

        <input
          type="text"
          name="firstName"
          value={bookingData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
        />

        <label>Last Name</label>

        <input
          type="text"
          name="lastName"
          value={bookingData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={bookingData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <label>Phone Number</label>

        <input
          type="tel"
          name="phone"
          value={bookingData.phone}
          onChange={handleChange}
          placeholder="08012345678"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn"
        >
          {loading ? (
            <>
              <FaSpinner className="spinner" />
              Loading....
            </>
          ) : (
            "Done"
          )}
        </button>

      </form>

    </div>
  );
}

export default Booking;