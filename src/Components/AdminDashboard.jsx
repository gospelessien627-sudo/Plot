import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  FaPlane,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaSearch,
  FaTrash,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { db, auth } from "./firebase";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==============================
  // GET BOOKINGS FROM FIRESTORE
  // ==============================

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "bookings")
        );

        const bookingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(bookingList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ==============================
  // DELETE BOOKING
  // ==============================

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "bookings", id));

      setBookings((prev) =>
        prev.filter((booking) => booking.id !== id)
      );

      alert("Booking deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking.");
    }
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // ==============================
  // SEARCH
  // ==============================

  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    return (
      booking.bookingReference
        ?.toLowerCase()
        .includes(searchText) ||
      booking.bookingData?.firstName
        ?.toLowerCase()
        .includes(searchText) ||
      booking.bookingData?.lastName
        ?.toLowerCase()
        .includes(searchText) ||
      booking.flight?.flightNumber
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // ==============================
  // STATISTICS
  // ==============================

  const totalBookings = bookings.length;

  const totalPassengers = bookings.reduce(
    (total, booking) =>
      total + Number(booking.passengers || 1),
    0
  );

  const totalFlights = new Set(
    bookings
      .map((booking) => booking.flight?.flightNumber)
      .filter(Boolean)
  ).size;

  const totalRevenue = bookings.reduce(
    (total, booking) =>
      total +
      Number(
        booking.flight?.price || 0
      ) *
        Number(booking.passengers || 1),
    0
  );

  return (
    <div className="admin-dashboard">

      {/* ==============================
          MOBILE HEADER
      ============================== */}

      <div className="admin-mobile-header">

        <h2>Skywings</h2>

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        >
          {sidebarOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>

      {/* ==============================
          SIDEBAR
      ============================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "admin-sidebar-open" : ""
        }`}
      >

        <div className="admin-logo">
          <FaPlane />
          <span>Skywings</span>
        </div>

        <div className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div>
            <h4>Administrator</h4>
            <p>Admin Panel</p>
          </div>

        </div>

        <nav className="admin-nav">

          <button className="active">
            <FaPlane />
            Dashboard
          </button>

          <button>
            <FaTicketAlt />
            Bookings
          </button>

          <button>
            <FaUsers />
            Passengers
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      {/* ==============================
          MAIN CONTENT
      ============================== */}

      <main className="admin-main">

        <div className="admin-top">

          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Manage your Skywings flight bookings.
            </p>
          </div>

          <div className="admin-date">
            {new Date().toLocaleDateString()}
          </div>

        </div>

        {/* ==============================
            STATISTICS
        ============================== */}

        <section className="admin-stats">

          <div className="stat-card">

            <div className="stat-icon blue">
              <FaTicketAlt />
            </div>

            <div>
              <p>Total Bookings</p>
              <h2>{totalBookings}</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              <FaUsers />
            </div>

            <div>
              <p>Total Passengers</p>
              <h2>{totalPassengers}</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              <FaPlane />
            </div>

            <div>
              <p>Flights Booked</p>
              <h2>{totalFlights}</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              <FaMoneyBillWave />
            </div>

            <div>
              <p>Revenue</p>
              <h2>
                ₦{totalRevenue.toLocaleString()}
              </h2>
            </div>

          </div>

        </section>

        {/* ==============================
            BOOKINGS
        ============================== */}

        <section className="bookings-section">

          <div className="bookings-header">

            <div>
              <h2>Recent Bookings</h2>
              <p>
                View and manage customer bookings
              </p>
            </div>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search booking..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {loading ? (

            <div className="admin-loading">
              <div className="admin-spinner"></div>
              <p>Loading bookings...</p>
            </div>

          ) : filteredBookings.length === 0 ? (

            <div className="no-bookings">
              <FaTicketAlt />
              <h3>No bookings found</h3>
              <p>
                There are no bookings matching your search.
              </p>
            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>Reference</th>
                    <th>Passenger</th>
                    <th>Flight</th>
                    <th>Seat</th>
                    <th>Passengers</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map((booking) => (

                    <tr key={booking.id}>

                      <td>
                        <strong>
                          {booking.bookingReference ||
                            "N/A"}
                        </strong>
                      </td>

                      <td>
                        {booking.bookingData?.firstName}{" "}
                        {booking.bookingData?.lastName}
                      </td>

                      <td>
                        {booking.flight?.flightNumber ||
                          "N/A"}
                      </td>

                      <td>
                        {booking.selectedSeat ||
                          "N/A"}
                      </td>

                      <td>
                        {booking.passengers || 1}
                      </td>

                      <td>
                        ₦
                        {Number(
                          booking.flight?.price || 0
                        ).toLocaleString()}
                      </td>

                      <td>
                        <span className="status confirmed">
                          Confirmed
                        </span>
                      </td>

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteBooking(booking.id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;