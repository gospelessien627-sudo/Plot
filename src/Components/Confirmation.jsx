import React, { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";
import { FaSpinner } from "react-icons/fa";

import { db, auth } from "./firebase";

import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";

function Confirmation() {
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const booking =
    location.state ||
    JSON.parse(localStorage.getItem("booking"));

  if (!booking) {
    return (
      <div>
        <h2>No booking found.</h2>

        <button onClick={() => navigate("/flights")}>
          Search Flights
        </button>
      </div>
    );
  }

  const {
    flight,
    passengers,
    date,
    bookingData,
    selectedSeat,
    bookingReference,
  } = booking;

  const totalPrice = flight.price * passengers;

  // --------------------------------
  // SAVE BOOKING TO FIREBASE
  // --------------------------------

  const saveBooking = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("No logged-in user");
        return;
      }

      const bookingRef = doc(
        db,
        "bookings",
        bookingReference
      );

      const existingBooking = await getDoc(bookingRef);

      // Don't overwrite an already confirmed booking
      if (existingBooking.exists()) {
        const data = existingBooking.data();

        if (data.status === "confirmed") {
          setPaymentDone(true);
          return;
        }
      }

      await setDoc(bookingRef, {
        userId: user.uid,

        bookingReference,

        passenger: {
          title: bookingData.title,
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
        },

        flight: {
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          from: flight.from,
          to: flight.to,
          departure: flight.departure,
          arrival: flight.arrival,
          price: flight.price,
        },

        date,

        passengers,

        selectedSeat,

        status: "pending",

        createdAt: serverTimestamp(),
      });

      console.log("Booking saved as pending.");
    } catch (error) {
      console.error(
        "Error saving booking:",
        error
      );
    }
  };

  // --------------------------------
  // CHECK PAYMENT STATUS
  // --------------------------------

  const checkPaymentStatus = async () => {
    try {
      const bookingRef = doc(
        db,
        "bookings",
        bookingReference
      );

      const bookingSnapshot = await getDoc(
        bookingRef
      );

      if (bookingSnapshot.exists()) {
        const data = bookingSnapshot.data();

        if (data.status === "confirmed") {
          setPaymentDone(true);
        }
      }
    } catch (error) {
      console.error(
        "Error checking payment status:",
        error
      );
    }
  };

  // --------------------------------
  // PAY NOW
  // --------------------------------

  const payNow = async () => {
    // Prevent paying again
    if (paymentDone) {
      return;
    }

    const popup = new PaystackPop();

    setLoading(true);

    try {
      await popup.checkout({
        key: "pk_test_7bf6c0d1ad8f52aa0f20c1558bc850e7aa055092",

        email: bookingData.email,

        amount: totalPrice * 100,

        currency: "NGN",

        firstName: bookingData.firstName,

        lastName: bookingData.lastName,

        phone: bookingData.phone,

        metadata: {
          bookingReference,
          flightNumber: flight.flightNumber,
          passengers,
          selectedSeat,
        },

        // --------------------------------
        // PAYMENT SUCCESS
        // --------------------------------

        onSuccess: async (transaction) => {
          console.log(
            "PAYMENT SUCCESS:",
            transaction
          );

          try {
            const bookingRef = doc(
              db,
              "bookings",
              bookingReference
            );

            await updateDoc(
              bookingRef,
              {
                status: "confirmed",

                paymentReference:
                  transaction.reference,

                paidAt: serverTimestamp(),
              }
            );

            // IMPORTANT
            setLoading(false);
            setPaymentDone(true);

            alert(
              "Payment successful! Your booking is confirmed."
            );
          } catch (error) {
            console.error(
              "Firebase update error:",
              error
            );

            setLoading(false);

            alert(
              "Payment was successful, but we could not update the booking."
            );
          }
        },

        // --------------------------------
        // PAYMENT CANCELLED
        // --------------------------------

        onCancel: async () => {
  console.log("Payment cancelled.");

  try {
    const bookingRef = doc(
      db,
      "bookings",
      bookingReference
    );

    await updateDoc(bookingRef, {
      status: "cancelled",
      cancelledAt: serverTimestamp(),
    });

    setLoading(false);
    setPaymentDone(true);

    alert("Payment cancelled.");
  } catch (error) {
    console.error(
      "Error updating cancelled booking:",
      error
    );

    setLoading(false);
  }
},

        // --------------------------------
        // PAYMENT ERROR
        // --------------------------------

        onError: (error) => {
          console.error(
            "Paystack error:",
            error
          );

          setLoading(false);

          alert(
            "There was a problem processing your payment."
          );
        },
      });
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      setLoading(false);
    }
  };

  // --------------------------------
  // RUN WHEN PAGE LOADS
  // --------------------------------

  useEffect(() => {
    saveBooking();

    checkPaymentStatus();
  }, [bookingReference]);

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="confirmation">

      <div className="confirmation-card">

        <h1>
          🎉 Booking Confirmation
        </h1>

        <p>
          Your flight booking details are shown below.
        </p>

        <div className="booking-reference">

          <span>
            Booking Reference
          </span>

          <h2>
            {bookingReference}
          </h2>

        </div>

        <hr />

        <h2>
          Passenger
        </h2>

        <p>
          {bookingData.title}{" "}
          {bookingData.firstName}{" "}
          {bookingData.lastName}
        </p>

        <p>
          Email: {bookingData.email}
        </p>

        <p>
          Phone: {bookingData.phone}
        </p>

        <hr />

        <h2>
          Flight
        </h2>

        <p>
          Airline: {flight.airline}
        </p>

        <p>
          Flight Number: {flight.flightNumber}
        </p>

        <p>
          From: {flight.from}
        </p>

        <p>
          To: {flight.to}
        </p>

        <p>
          Date: {date}
        </p>

        <p>
          Departure: {flight.departure}
        </p>

        <p>
          Arrival: {flight.arrival}
        </p>

        <p>
          Seat:{" "}
          <strong>
            {selectedSeat}
          </strong>
        </p>

        <p>
          Passengers: {passengers}
        </p>

        <h2>
          Total: ₦
          {totalPrice.toLocaleString()}
        </h2>

        {/* PAYMENT BUTTON */}

        <button
          className="pay-button"
          onClick={payNow}
          disabled={loading || paymentDone}
        >

          {paymentDone ? (
            <>
              ✅ Done
            </>
          ) : loading ? (
            <>
              <FaSpinner className="spinner" />
              Processing...
            </>
          ) : (
            <>
              💳 Pay ₦
              {totalPrice.toLocaleString()}
              {" "}Now
            </>
          )}

        </button>

        {/* BACK TO HOME */}

        <button className="uwe"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default Confirmation;