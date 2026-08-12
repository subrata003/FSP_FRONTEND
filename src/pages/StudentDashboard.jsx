import React from "react";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Stack,
  Avatar,
  Button,
   Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openUserMenu = Boolean(anchorEl);

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // ==========================================
  // GET LOGGED USER
  // ==========================================

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );

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
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");

    // Go back to login
    navigate("/", {
      replace: true,
    });
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

      {/* =================================================
          SIDEBAR
      ================================================= */}

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
              cursor: "pointer",
            }}
            onClick={() => navigate("/student") }
          >
            CampusNotes
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* ==============================
            NAVIGATION
        ============================== */}

        <List sx={{ p: 0 }}>

          {/* DASHBOARD */}

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

          {/* PROFILE */}

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

          {/* UPLOAD */}

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

          {/* NOTE MANAGEMENT */}

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


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box
        component="main"
        sx={{
          marginLeft: "240px",

          minHeight: "100vh",

          boxSizing: "border-box",

          backgroundColor: "#f5f7fa",
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <Box
          sx={{
            height: 72,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            position: "sticky",
            top: 0,
            zIndex: 900,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
          >
            {/* =================================
        USER AVATAR
    ================================= */}

            <Tooltip title="Account">
              <Avatar
                onClick={handleUserMenu}
                sx={{
                  width: 42,
                  height: 42,

                  cursor: "pointer",

                  background:
                    "linear-gradient(135deg,#1597f5,#2563eb)",

                  fontWeight: 700,

                  border: "2px solid #e0f2fe",

                  transition: "all .2s",

                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      "0 4px 12px rgba(21,151,245,.25)",
                  },
                }}
              >
                {loggedUser?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}
              </Avatar>
            </Tooltip>


            {/* =================================
        USER MENU
    ================================= */}

            <Menu
              anchorEl={anchorEl}
              open={openUserMenu}
              onClose={handleCloseUserMenu}

              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}

              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}

              PaperProps={{
                elevation: 4,
                sx: {
                  mt: 1,
                  minWidth: 210,
                  borderRadius: 2.5,
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                },
              }}
            >

              {/* USER INFORMATION */}

              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: "#f8fafc",
                }}
              >
                <Typography
                  fontWeight={700}
                  fontSize={14}
                >
                  {loggedUser?.name || "Student"}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    maxWidth: 175,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {loggedUser?.email || ""}
                </Typography>
              </Box>

              <Divider />


              {/* PROFILE */}

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/student/profile");
                }}
                sx={{
                  py: 1.3,
                  gap: 1.5,
                }}
              >
                <PersonIcon
                  fontSize="small"
                  sx={{
                    color: "#1597f5",
                  }}
                />

                <Typography fontSize={14}>
                  Profile
                </Typography>
              </MenuItem>


              {/* LOGOUT */}

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
                sx={{
                  py: 1.3,
                  gap: 1.5,
                  color: "#dc2626",

                  "&:hover": {
                    backgroundColor: "#fef2f2",
                  },
                }}
              >
                <LogoutIcon fontSize="small" />

                <Typography
                  fontSize={14}
                  fontWeight={600}
                >
                  Logout
                </Typography>
              </MenuItem>

            </Menu>
          </Stack>
        </Box>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >

          {/* 
            /student
              -> Dashboard

            /student/profile
              -> Profile

            /student/upload
              -> Upload

            /student/notes
              -> Note
          */}

          <Outlet />

        </Box>

      </Box>
    </Box>
  );
};

export default StudentDashboard;