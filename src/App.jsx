import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Loginpage from "./components/Loginpage";
// import AdminDashboard from "./components/AdminDashboard";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel"

import StudentDashboard from "./pages/StudentDashboard";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";


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

      {/* ================================
          LOGIN
      ================================= */}

      <Route
        path="/"
        element={
          <Loginpage />
        }
      />


      {/* ================================
          ADMIN DASHBOARD
      ================================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminPanel/>
          </ProtectedRoute>
        }
      />


      {/* ================================
          STUDENT DASHBOARD
      ================================= */}

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />


      {/* ================================
          STUDENT NOTE MANAGEMENT
      ================================= */}

      <Route
        path="/student-dashboard/notes"
        element={
          <ProtectedRoute role="student">
            <Upload />
          </ProtectedRoute>
        }
      />


      {/* ================================
          PROFILE
      ================================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* ================================
          OLD STUDENT PROFILE URL
      ================================= */}

      <Route
        path="/student-dashboard/profile"
        element={
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* ================================
          UNKNOWN URL
      ================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;