import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Loginpage from "./components/Loginpage";

// import AdminPanel from "./components/AdminPanel";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel"

// import ProtectedRoute from "./components/ProtectedRoute";
import Note from "./pages/Note";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload"
import Profile from "./pages/Profile"
import StudentDashboard from "./pages/StudentDashboard"


// ==========================================
// PROTECTED ROUTE
// ==========================================

const ProtectedRoute = ({ children, role }) => {

  const token = localStorage.getItem("token");

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );


  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!token || !loggedUser) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // ==========================================
  // WRONG ROLE
  // ==========================================

  if (
    role &&
    loggedUser.role !== role
  ) {

    if (loggedUser.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    if (loggedUser.role === "student") {
      return (
        <Navigate
          to="/student"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // ==========================================
  // ALLOW ACCESS
  // ==========================================

  return children;
};


// ==========================================
// APP
// ==========================================

const App = () => {


  return (
    <Routes>

      {/* =================================
          LOGIN
      ================================== */}

      <Route
        path="/"
        element={<Loginpage />}
      />


      {/* =================================
          ADMIN
      ================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPanel />
          </ProtectedRoute>
        }
      />


      {/* =================================
          STUDENT DASHBOARD
      ================================== */}

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          index
          element={<Dashboard />}
        />

        {/* Notes */}
        <Route
          path="notes"
          element={<Note />}
        />

        {/* Upload */}
        <Route
          path="upload"
          element={<Upload />}
        />

        {/* Profile */}
        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>


      {/* ================================
      STUDENT NOTES
  ================================= */}




    </Routes>
  );
};




export default App;