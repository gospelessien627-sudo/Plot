import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function FlightDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { flight, passengers, date } = location.state || {};

  if (!flight) {
    return (
      <div className="no-flight">
        <h2>No flight selected</h2>

        <button onClick={() => navigate("/flights")}>
          Search Flights
        </button>
      </div>
    );
  }

  const totalPrice = flight.price * passengers;

  const handleContinue = () => {
    setLoading(true);

    // Small delay so the spinner can be seen
    setTimeout(() => {
      navigate("/booking", {
        state: {
          flight,
          passengers,
          date,
        },
      });
    }, 2000);
  };

  return (
    <div className="flight-details">

      <h1>Flight Details</h1>

      <div className="details-card">

        <h2>{flight.airline}</h2>

        <p>
          Flight Number: <strong>{flight.flightNumber}</strong>
        </p>

        <hr />

        <div className="route-info">
  <h3>{flight.from}</h3>
  <p>{flight.departure}</p>
</div>

<div className="flight-duration">
  <span>✈️</span>
  <p>{flight.duration}</p>
</div>

<div className="route-info">
  <h3>{flight.to}</h3>
  <p>{flight.arrival}</p>
</div>
        <hr />

        <p>
          Travel Date: <strong>{date}</strong>
        </p>

        <p>
          Passengers: <strong>{passengers}</strong>
        </p>

        <h2>
          ₦{totalPrice.toLocaleString()}
        </h2>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="lonm"
        >
          {loading ? (
            <>
              <FaSpinner className="spinner" />
              Loading...
            </>
          ) : (
            "Continue Booking"
          )}
        </button>

      </div>

    </div>
  );
}

export default FlightDetails;