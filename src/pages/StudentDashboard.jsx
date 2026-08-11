import React, { useState } from "react";
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
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Note from "./Note";
import Upload from "./Upload";

// Student Pages
// import Dashboard from "../student_pages/Dashboard";
// import Profile from "../student_pages/Profile";
// import Note from "../student_pages/Note";
// import Upload from "../student_pages/Upload";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Change sidebar page
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // Render selected page
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "profile":
        return <Profile />;

      case "notes":
        return <Note />;

      case "upload":
        return <Upload />;

      default:
        return <Dashboard />;
    }
  };

  // Sidebar menu style
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
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <Box
        sx={{
          width: 240,
          height: "100vh",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",

          position: "fixed",
          left: 0,
          top: 0,

          p: 2,
          boxSizing: "border-box",

          zIndex: 1000,
        }}
      >
        {/* Logo */}
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
              fontSize: 24,
              fontWeight: 800,
              color: "#1597f5",
              letterSpacing: 1,
            }}
          >
            ONSS
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation */}
        <List sx={{ p: 0 }}>
          {/* Dashboard */}
          <ListItemButton
            selected={activePage === "dashboard"}
            onClick={() => handlePageChange("dashboard")}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <DashboardIcon
                sx={{
                  color:
                    activePage === "dashboard"
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

          {/* Profile */}
          <ListItemButton
            selected={activePage === "profile"}
            onClick={() => handlePageChange("profile")}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <PeopleIcon
                sx={{
                  color:
                    activePage === "profile"
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

          {/* Upload */}
          <ListItemButton
            selected={activePage === "upload"}
            onClick={() => handlePageChange("upload")}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <CloudUploadIcon
                sx={{
                  color:
                    activePage === "upload"
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

          {/* Note Management */}
          <ListItemButton
            selected={activePage === "notes"}
            onClick={() => handlePageChange("notes")}
            sx={menuItemStyle}
          >
            <ListItemIcon sx={{ minWidth: 42 }}>
              <DescriptionIcon
                sx={{
                  color:
                    activePage === "notes"
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

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "240px",
          minHeight: "100vh",
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default StudentDashboard;

