import React from "react";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // GET ACTIVE PAGE FROM URL
  // ==========================================

  const getActivePage = () => {
    if (location.pathname === "/student") {
      return "dashboard";
    }

    if (
      location.pathname.startsWith(
        "/student/profile"
      )
    ) {
      return "profile";
    }

    if (
      location.pathname.startsWith(
        "/student/upload"
      )
    ) {
      return "upload";
    }

    if (
      location.pathname.startsWith(
        "/student/notes"
      )
    ) {
      return "notes";
    }

    return "dashboard";
  };

  const activePage = getActivePage();

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handlePageChange = (page) => {
    switch (page) {
      case "dashboard":
        navigate("/student");
        break;

      case "profile":
        navigate("/student/profile");
        break;

      case "upload":
        navigate("/student/upload");
        break;

      case "notes":
        navigate("/student/notes");
        break;

      default:
        navigate("/student");
    }
  };

  // ==========================================
  // SIDEBAR STYLE
  // ==========================================

  const menuItemStyle = {
    borderRadius: 2,
    mb: 1,

    "&.Mui-selected": {
      backgroundColor: "#eaf5ff",
      color: "#1597f5",
    },

    "&.Mui-selected:hover": {
      backgroundColor: "#eaf5ff",
    },

    "&:hover": {
      backgroundColor: "#f5f9fc",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Box
        sx={{
          width: 240,
          height: "100vh",

          backgroundColor: "#ffffff",

          borderRight:
            "1px solid #e5e7eb",

          position: "fixed",

          left: 0,
          top: 0,

          p: 2,

          boxSizing: "border-box",

          zIndex: 1000,

          overflowY: "auto",
        }}
      >

        {/* ==============================
            LOGO
        ============================== */}

        <Box
          sx={{
            height: 60,

            display: "flex",

            alignItems: "center",

            px: 1,

            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,

              fontWeight: 800,

              color: "#1597f5",

              letterSpacing: 1,
            }}
          >
            CampusNotes
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* ==============================
            NAVIGATION
        ============================== */}

        <List sx={{ p: 0 }}>

          {/* =================================
              DASHBOARD
          ================================= */}

          <ListItemButton
            selected={
              activePage === "dashboard"
            }
            onClick={() =>
              handlePageChange(
                "dashboard"
              )
            }
            sx={menuItemStyle}
          >
            <ListItemIcon
              sx={{ minWidth: 42 }}
            >
              <DashboardIcon
                sx={{
                  color:
                    activePage ===
                      "dashboard"
                      ? "#1597f5"
                      : "#555",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Dashboard"
              slotProps={{
                primary: {
                  fontWeight: 600,
                },
              }}
            />
          </ListItemButton>

          {/* =================================
              PROFILE
          ================================= */}

          <ListItemButton
            selected={
              activePage === "profile"
            }
            onClick={() =>
              handlePageChange(
                "profile"
              )
            }
            sx={menuItemStyle}
          >
            <ListItemIcon
              sx={{ minWidth: 42 }}
            >
              <PeopleIcon
                sx={{
                  color:
                    activePage ===
                      "profile"
                      ? "#1597f5"
                      : "#555",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Profile"
              slotProps={{
                primary: {
                  fontWeight: 600,
                },
              }}
            />
          </ListItemButton>

          {/* =================================
              UPLOAD
          ================================= */}

          <ListItemButton
            selected={
              activePage === "upload"
            }
            onClick={() =>
              handlePageChange(
                "upload"
              )
            }
            sx={menuItemStyle}
          >
            <ListItemIcon
              sx={{ minWidth: 42 }}
            >
              <CloudUploadIcon
                sx={{
                  color:
                    activePage ===
                      "upload"
                      ? "#1597f5"
                      : "#555",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Upload Notes"
              slotProps={{
                primary: {
                  fontWeight: 600,
                },
              }}
            />
          </ListItemButton>

          {/* =================================
              NOTE MANAGEMENT
          ================================= */}

          <ListItemButton
            selected={
              activePage === "notes"
            }
            onClick={() =>
              handlePageChange(
                "notes"
              )
            }
            sx={menuItemStyle}
          >
            <ListItemIcon
              sx={{ minWidth: 42 }}
            >
              <DescriptionIcon
                sx={{
                  color:
                    activePage ===
                      "notes"
                      ? "#1597f5"
                      : "#555",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Note Management"
              slotProps={{
                primary: {
                  fontWeight: 600,
                },
              }}
            />
          </ListItemButton>

        </List>
      </Box>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <Box
        component="main"
        sx={{
          marginLeft: "240px",

          minHeight: "100vh",

          boxSizing: "border-box",

          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >

        {/* 
          Child routes render here

          /student          -> Dashboard
          /student/profile  -> Profile
          /student/upload   -> Upload
          /student/notes    -> Note
        */}

        <Outlet />

      </Box>

    </Box>
  );
};

export default StudentDashboard;