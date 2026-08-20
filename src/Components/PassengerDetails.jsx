import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./PassengerDetails.css";

function PassengerDetails() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    flight,
    passengers,
    date,
    bookingData,
    selectedSeat,
  } = location.state || {};

  const [passportNumber, setPassportNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passportNumber.trim()) {
      alert("Please enter passport or identification number");
      return;
    }

    setLoading(true);

    const bookingReference =
      "SKY" + Math.floor(Math.random() * 900000 + 100000);

    const finalBooking = {
      flight,
      passengers,
      date,
      bookingData,
      selectedSeat,
      passportNumber,
      bookingReference,
    };

    localStorage.setItem(
      "booking",
      JSON.stringify(finalBooking)
    );

    setTimeout(() => {
      navigate("/confirmation", {
        state: finalBooking,
      });
    }, 1000);
  };

  if (!flight) {
    return (
      <div className="passenger-details-page">
        <h2>Booking information not found.</h2>

        <button
          className="passenger-back-btn"
          onClick={() => navigate("/flights")}
        >
          Go Back to Flights
        </button>
      </div>
    );
  }

  return (
    <div className="passenger-details-page">

      <h1>Passenger Details</h1>

      <form
        className="passenger-details-form"
        onSubmit={handleSubmit}
      >

        <h3>
          {bookingData?.firstName}{" "}
          {bookingData?.lastName}
        </h3>

        <p>
          Flight: {flight.flightNumber}
        </p>

        <p>
          Seat: {selectedSeat}
        </p>

        <label htmlFor="passport">
          Passport / ID Number
        </label>

        <input
          id="passport"
          type="text"
          value={passportNumber}
          onChange={(e) =>
            setPassportNumber(e.target.value)
          }
          placeholder="Enter passport or ID number"
          disabled={loading}
        />

        <button
          className="passenger-confirm-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="passenger-spinner" />
              Loading...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>

      </form>

    </div>
  );
}

export default PassengerDetails;