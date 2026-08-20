import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Flights.css";

function Flights() {
  const navigate = useNavigate();

  // Loading state for searching flights
  const [loading, setLoading] = useState(false);

  // Loading state when selecting a flight
  const [selectingFlight, setSelectingFlight] = useState(null);

  // Search form states
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  // Controls whether flight results are displayed
  const [searched, setSearched] = useState(false);

  // Available flights
  const flights = [
    {
      id: 1,
      airline: "SkyAir",
      flightNumber: "SA101",
      from: "Port Harcourt",
      to: "Lagos",
      departure: "08:00 AM",
      arrival: "09:10 AM",
      duration: "1h 10m",
      price: 85000,
    },

    {
      id: 2,
      airline: "SkyAir",
      flightNumber: "SA202",
      from: "Port Harcourt",
      to: "Abuja",
      departure: "11:30 AM",
      arrival: "12:50 PM",
      duration: "1h 20m",
      price: 95000,
    },

    {
      id: 3,
      airline: "Air Nigeria",
      flightNumber: "AN303",
      from: "Lagos",
      to: "Abuja",
      departure: "02:00 PM",
      arrival: "03:00 PM",
      duration: "1h",
      price: 75000,
    },
  ];

  // Search flights
  const handleSearch = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!from || !to || !date) {
      alert("Please fill in all flight search fields");
      return;
    }

    // Start loading
    setLoading(true);

    // Hide previous results while searching
    setSearched(false);

    // Simulate flight search
    setTimeout(() => {
      setSearched(true);
      setLoading(false);
    }, 1000);
  };

  // Passenger change
  const handlePassengerChange = (e) => {
    setPassengers(Number(e.target.value));
  };

  // Select a flight
  const handleSelectFlight = (flight) => {
    setSelectingFlight(flight.id);

    setTimeout(() => {
      navigate("/flight-details", {
        state: {
          flight,
          passengers,
          date,
        },
      });
    }, 1000);
  };

  // Filter flights according to search
  const filteredFlights = flights.filter(
    (flight) =>
      flight.from.toLowerCase() === from.toLowerCase() &&
      flight.to.toLowerCase() === to.toLowerCase()
  );

  return (
    <div className="flights-page">

      <h1>Search Flights</h1>

      {/* SEARCH FORM */}
      <form className="flight-search" onSubmit={handleSearch}>

        {/* FROM */}
        <div>
          <label>From</label>

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select departure</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
          </select>
        </div>

        {/* TO */}
        <div>
          <label>To</label>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select destination</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
          </select>
        </div>

        {/* DATE */}
        <div>
          <label>Departure Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* PASSENGERS */}
        <div>
          <label>Passengers</label>

          <input
            type="number"
            min="1"
            max="10"
            value={passengers}
            onChange={handlePassengerChange}
          />
        </div>

        {/* SEARCH BUTTON */}
        <button type="submit" disabled={loading}>

          {loading ? (
            <>
              <FaSpinner className="spinner" />
              Searching...
            </>
          ) : (
            "Search Flights"
          )}

        </button>

      </form>

      {/* FLIGHT RESULTS */}
      {searched && (
        <div className="flight-results">

          <h2>Available Flights</h2>

          {/* NO FLIGHT FOUND */}
          {filteredFlights.length === 0 ? (

            <p>No flights found for this route.</p>

          ) : (

            /* FLIGHT LIST */
            filteredFlights.map((flight) => (

              <div className="flight-card" key={flight.id}>

                {/* AIRLINE */}
                <div>
                  <h3>{flight.airline}</h3>
                  <p>{flight.flightNumber}</p>
                </div>

                {/* DEPARTURE */}
                <div>
                  <strong>{flight.departure}</strong>
                  <p>{flight.from}</p>
                </div>

                {/* DURATION */}
                <div>
                  <span>{flight.duration}</span>
                  <hr />
                </div>

                {/* ARRIVAL */}
                <div>
                  <strong>{flight.arrival}</strong>
                  <p>{flight.to}</p>
                </div>

                {/* PRICE + SELECT BUTTON */}
                <div>

                  <h3>
                    ₦{(flight.price * passengers).toLocaleString()}
                  </h3>

                  <button
                    onClick={() => handleSelectFlight(flight)}
                    disabled={selectingFlight === flight.id}
                    className="btn"
                  >

                    {selectingFlight === flight.id ? (
                      <>
                        <FaSpinner className="spinner" />
                        Loading...
                      </>
                    ) : (
                      "Select Flight"
                    )}

                  </button>

                </div>

              </div>

            ))
          )}

        </div>
      )}

    </div>
  );
}

export default Flights;