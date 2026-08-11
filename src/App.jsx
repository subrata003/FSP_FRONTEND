
// // // // // import React from "react";
// // // // // import { Routes, Route, Navigate } from "react-router-dom";

// // // // // import StudentDashboard from "./components/StudentDashboard";
// // // // // import Upload from "./student_pages/Upload";
// // // // // import Profile from "./student_pages/Profile";

// // // // // const App = () => {
// // // // //   return (
// // // // //     <Routes>
// // // // //         <Route
// // // // //           path="/student-dashboard"
// // // // //           element={<StudentDashboard />}
// // // // //         />

// // // // //       {/* <Route
// // // // //         path="/upload"
// // // // //         element={<Upload />}
// // // // //       /> */}
// // // // //         <Route
// // // // //         path="/student-dashboard/notes"
// // // // //         element={<Upload/>}
// // // // //       />

// // // // //       <Route
// // // // //         path="/student-dashboard/profile"
// // // // //         element={<Profile />}
// // // // //       />

// // // // //       {/* Default */}
// // // // //       <Route
// // // // //         path="/"
// // // // //         element={<Navigate to="/student-dashboard" replace />}
// // // // //       />

// // // // //       {/* Unknown URL */}
// // // // //       <Route
// // // // //         path="*"
// // // // //         element={<Navigate to="/student-dashboard" replace />}
// // // // //       />
// // // // //     </Routes>
// // // // //   );
// // // // // };

// // // // // export default App;
// // // // import React from "react";
// // // // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // // // import Loginpage from "./components/Loginpage";
// // // // import StudentDashboard from "./components/StudentDashboard";
// // // // import AdminDashboard from "./components/AdminDashboard"

// // // // const App = () => {
// // // //   return (
// // // //     <BrowserRouter>
// // // //       <Routes>
// // // //         <Route path="/" element={<Loginpage />} />

// // // //         <Route
// // // //           path="/student"
// // // //           element={<StudentDashboard />}
// // // //         />

// // // //         <Route
// // // //           path="/admin"
// // // //           element={<AdminDashboard />}
// // // //         />
// // // //       </Routes>
// // // //     </BrowserRouter>
// // // //   );
// // // // };

// // // // export default App;
// // // import React from "react";
// // // import {
// // //   BrowserRouter,
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // // } from "react-router-dom";

// // // import Loginpage from "./components/Loginpage";
// // // import StudentDashboard from "./components/StudentDashboard";
// // // import AdminDashboard from "./components/AdminDashboard";

// // // import Upload from "./student_pages/Upload";
// // // import Profile from "./student_pages/Profile";

// // // // ------------------------------------
// // // // Protected Route
// // // // ------------------------------------
// // // const ProtectedRoute = ({ children, role }) => {
// // //   const loggedUser = JSON.parse(
// // //     localStorage.getItem("loggedUser")
// // //   );

// // //   // Not logged in
// // //   if (!loggedUser) {
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   // Wrong role
// // //   if (loggedUser.role !== role) {
// // //     if (loggedUser.role === "admin") {
// // //       return <Navigate to="/admin" replace />;
// // //     }

// // //     return <Navigate to="/student" replace />;
// // //   }

// // //   return children;
// // // };

// // // // ------------------------------------
// // // // App
// // // // ------------------------------------
// // // const App = () => {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>

// // //         {/* =========================
// // //             LOGIN
// // //         ========================= */}
// // //         <Route path="/" element={<Loginpagea />} />


// // //         {/* =========================
// // //             ADMIN ROUTES
// // //         ========================= */}
// // //         <Route
// // //           path="/admin"
// // //           element={
// // //             <ProtectedRoute role="admin">
// // //               <AdminDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* =========================
// // //             STUDENT DASHBOARD
// // //         ========================= */}
// // //         <Route
// // //           path="/student"
// // //           element={
// // //             <ProtectedRoute role="student">
// // //               <StudentDashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* =========================
// // //             STUDENT NOTES / UPLOAD
// // //         ========================= */}
// // //         <Route
// // //           path="/student-dashboard/notes"
// // //           element={
// // //             <ProtectedRoute role="student">
// // //               <Upload />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* =========================
// // //             STUDENT PROFILE
// // //         ========================= */}
// // //         <Route
// // //           path="/student-dashboard/profile"
// // //           element={
// // //             <ProtectedRoute role="student">
// // //               <Profile />
// // //             </ProtectedRoute>
// // //           }
// // //         />


// // //         {/* =========================
// // //             UNKNOWN URL
// // //         ========================= */}
// // //         <Route
// // //           path="*"
// // //           element={<Navigate to="/" replace />}
// // //         />

// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // };

// // // export default App;
// // import React from "react";
// // import {
// //   Routes,
// //   Route,
// //   Navigate,
// // } from "react-router-dom";

// // import Loginpage from "./components/Loginpage";
// // import StudentDashboard from "./components/StudentDashboard";
// // import AdminDashboard from "./components/AdminDashboard";

// // import Upload from "./student_pages/Upload";
// // import Profile from "./student_pages/Profile";

// // // ==========================================
// // // PROTECTED ROUTE
// // // ==========================================
// // const ProtectedRoute = ({ children, role }) => {
// //   const loggedUser = JSON.parse(
// //     localStorage.getItem("loggedUser")
// //   );

// //   // Not logged in
// //   if (!loggedUser) {
// //     return <Navigate to="/" replace />;
// //   }

// //   // Wrong category
// //   if (loggedUser.role !== role) {
// //     if (loggedUser.role === "admin") {
// //       return <Navigate to="/admin" replace />;
// //     }

// //     return <Navigate to="/student" replace />;
// //   }

// //   return children;
// // };

// // const App = () => {
// //   return (
// //     <Routes>

// //       {/* ================================
// //           LOGIN
// //       ================================= */}
// //       <Route
// //         path="/"
// //         element={<Loginpage />}
// //       />

// //       {/* ================================
// //           ADMIN
// //       ================================= */}
// //       <Route
// //         path="/admin"
// //         element={
// //           <ProtectedRoute role="admin">
// //             <AdminDashboard />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* ================================
// //           STUDENT DASHBOARD
// //       ================================= */}
// //       <Route
// //         path="/student"
// //         element={
// //           <ProtectedRoute role="student">
// //             <StudentDashboard />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* ================================
// //           STUDENT NOTES
// //       ================================= */}
// //       <Route
// //         path="/student-dashboard/notes"
// //         element={
// //           <ProtectedRoute role="student">
// //             <Upload />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* ================================
// //           STUDENT PROFILE
// //       ================================= */}
// //       <Route
// //         path="/student-dashboard/profile"
// //         element={
// //           <ProtectedRoute role="student">
// //             <Profile />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* ================================
// //           UNKNOWN URL
// //       ================================= */}
// //       <Route
// //         path="*"
// //         element={
// //           <Navigate to="/" replace />
// //         }
// //       />

// //     </Routes>
// //   );
// // };

// // export default App;
// import React from "react";

// import {
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Loginpage from "./components/Loginpage";
// import StudentDashboard from "./components/StudentDashboard";
// import AdminDashboard from "./components/AdminDashboard";

// import Upload from "./student_pages/Upload";
// import Profile from "./student_pages/Profile";

// // ==========================================
// // PROTECTED ROUTE
// // ==========================================
// const ProtectedRoute = ({ children, role }) => {
//   const loggedUser = JSON.parse(
//     localStorage.getItem("loggedUser") || "null"
//   );

//   // User is not logged in
//   if (!loggedUser) {
//     return <Navigate to="/" replace />;
//   }

//   // User has wrong role
//   if (loggedUser.role !== role) {
//     if (loggedUser.role === "admin") {
//       return <Navigate to="/admin" replace />;
//     }

//     if (loggedUser.role === "student") {
//       return <Navigate to="/student" replace />;
//     }

//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// // ==========================================
// // APP
// // ==========================================
// const App = () => {
//   return (
//     <Routes>
//       {/* =====================================
//           LOGIN
//       ====================================== */}
//       <Route
//         path="/"
//         element={<Loginpage />}
//       />

//       {/* =====================================
//           ADMIN DASHBOARD
//       ====================================== */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute role="admin">
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* =====================================
//           STUDENT DASHBOARD
//       ====================================== */}
//       <Route
//         path="/student"
//         element={
//           <ProtectedRoute role="student">
//             <StudentDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* =====================================
//           STUDENT UPLOAD / NOTES
//       ====================================== */}
//       <Route
//         path="/student-dashboard/notes"
//         element={
//           <ProtectedRoute role="student">
//             <Upload />
//           </ProtectedRoute>
//         }
//       />

//       {/* =====================================
//           STUDENT PROFILE
//       ====================================== */}
//       <Route
//         path="/student-dashboard/profile"
//         element={
//           <ProtectedRoute role="student">
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       {/* =====================================
//           UNKNOWN URL
//       ====================================== */}
//       <Route
//         path="*"
//         element={
//           <Navigate to="/" replace />
//         }
//       />
//     </Routes>
//   );
// };

// export default App;
import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Loginpage from "./components/Loginpage";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

import Upload from "./student_pages/Upload";
import Profile from "./student_pages/Profile";

// ==========================================
// PROTECTED ROUTE
// ==========================================
const ProtectedRoute = ({ children, role }) => {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );

  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }

  if (role && loggedUser.role !== role) {
    if (loggedUser.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (loggedUser.role === "student") {
      return <Navigate to="/student" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={<Loginpage />}
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* STUDENT DASHBOARD */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* STUDENT NOTES */}
      <Route
        path="/student-dashboard/notes"
        element={
          <ProtectedRoute role="student">
            <Upload />
          </ProtectedRoute>
        }
      />

      {/* ==================================
          PROFILE FOR BOTH ADMIN + STUDENT
      =================================== */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* OLD STUDENT PROFILE URL */}
      <Route
        path="/student-dashboard/profile"
        element={
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* UNKNOWN URL */}
      <Route
        path="*"
        element={
          <Navigate to="/" replace />
        }
      />

    </Routes>
  );
};

export default App;