import React, { useState } from "react";
import "./SeatSelection.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function SeatSelection() {

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    flight,
    passengers,
    date,
    bookingData,
  } = location.state || {};

  const [selectedSeat, setSelectedSeat] = useState("");

  const seats = [
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "1F",

    "2A",
    "2B",
    "2C",
    "2D",
    "2E",
    "2F",

    "3A",
    "3B",
    "3C",
    "3D",
    "3E",
    "3F",

    "4A",
    "4B",
    "4C",
    "4D",
    "4E",
    "4F",

    "5A",
    "5B",
    "5C",
    "5D",
    "5E",
    "5F",
  ];

  const occupiedSeats = [
    "1B",
    "2C",
    "3D",
    "4A"
  ];

  const handleSeatClick = (seat) => {

    if (occupiedSeats.includes(seat)) {
      return;
    }

    setSelectedSeat(seat);
  };

  const continueBooking = () => {

    // Check if a seat has been selected
    if (!selectedSeat) {
      alert("Please select a seat");
      return;
    }

    // Start loading
    setLoading(true);

    // Keep the spinner visible for 1 second
    setTimeout(() => {

      navigate("/passenger-details", {
        state: {
          flight,
          passengers,
          date,
          bookingData,
          selectedSeat,
        },
      });

    }, 2000);
  };

  if (!flight) {
    return (
      <h2>No flight information found.</h2>
    );
  }

  return (
    <div className="seat-page">

      <h1>Select Your Seat</h1>

      <p>
        Flight: {flight.flightNumber}
      </p>

      <div className="seat-layout">

        <div className="cockpit">
          ✈️
        </div>

        <div className="seats">

          {seats.map((seat) => {

            const occupied =
              occupiedSeats.includes(seat);

            const selected =
              selectedSeat === seat;

            return (
              <button
                key={seat}
                className={`
                  seat
                  ${occupied ? "occupied" : ""}
                  ${selected ? "selected" : ""}
                `}
                disabled={occupied || loading}
                onClick={() => handleSeatClick(seat)}
              >
                {seat}
              </button>
            );

          })}

        </div>

      </div>

      <div className="seat-legend">

        <p>⬜ Available</p>
        <p>🟩 Selected</p>
        <p>🟥 Occupied</p>

      </div>

      <h3 className="divb">
        Selected Seat: {selectedSeat || "None"}
      </h3>

      {/* CONTINUE BUTTON */}

      <button
        className="poi"
        onClick={continueBooking}
        disabled={loading}
      >

        {loading ? (
          <>
            <FaSpinner className="spinner" />
            Loading...
          </>
        ) : (
          "Continue"
        )}

      </button>

    </div>
  );
}

export default SeatSelection;