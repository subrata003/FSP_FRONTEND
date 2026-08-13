import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ==========================================
// PAGES / COMPONENTS
// ==========================================

import Loginpage from "./components/Loginpage";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";

import StudentDashboard from "./pages/StudentDashboard";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Note";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
// import Chatbot from "./components/chatbot/Chatbot";

// ==========================================
// PROTECTED ROUTE
// ==========================================

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  let loggedUser = null;

  try {
    loggedUser = JSON.parse(
      localStorage.getItem("loggedUser") || "null"
    );
  } catch (error) {
    console.error(
      "Invalid loggedUser data:",
      error
    );
  }

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
  // ROLE CHECK
  // ==========================================

  if (
    role &&
    loggedUser.role !== role
  ) {
    // Admin trying to access student route
    if (loggedUser.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    // Student trying to access admin route
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
  // ACCESS ALLOWED
  // ==========================================

  return children;
};

// ==========================================
// APP
// ==========================================

const App = () => {
  return (
    <> 
    <Routes>

      {/* =================================
          LOGIN
      ================================== */}

      <Route
        path="/"
        element={
          <Loginpage />
        }
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

        {/* ================================
            STUDENT DASHBOARD HOME
        ================================= */}

        <Route
          index
          element={
            <Dashboard />
          }
        />

        {/* ================================
            STUDENT NOTE MANAGEMENT
        ================================= */}

        <Route
          path="notes"
          element={
            <Note />
          }
        />

        {/* ================================
            STUDENT UPLOAD
        ================================= */}

        <Route
          path="upload"
          element={
            <Upload />
          }
        />

        {/* ================================
            STUDENT PROFILE
        ================================= */}

        <Route
          path="profile"
          element={
            <Profile />
          }
        />

      </Route>

      {/* =================================
          UNKNOWN URL
      ================================== */}

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
    
    </>
  );
};

export default App;