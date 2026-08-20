import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase";
import "./ProtectedAdminRoute.css";

function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        try {
          const adminRef = doc(
            db,
            "admins",
            user.uid
          );

          const adminSnap = await getDoc(adminRef);

          console.log(
            "Checking admin UID:",
            user.uid
          );

          console.log(
            "Admin exists:",
            adminSnap.exists()
          );

          if (adminSnap.exists()) {
            const adminData = adminSnap.data();

            console.log(
              "Admin data:",
              adminData
            );

            if (adminData.role === "admin") {
              setIsAdmin(true);
              return;
            }
          }

          setIsAdmin(false);

        } catch (error) {
          console.error(
            "Admin verification failed:",
            error
          );

          setIsAdmin(false);

        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="admin-auth-loading">
        <div className="admin-auth-spinner"></div>
        <p>Checking admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/flights"
        replace
      />
    );
  }

  return children;
}

export default ProtectedAdminRoute;