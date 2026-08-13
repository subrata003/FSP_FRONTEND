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
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Chatbot from "../components/chatbot/Chatbot";

const SIDEBAR_WIDTH = 240;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  // Mobile check
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Sidebar mobile state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // User menu state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openUserMenu = Boolean(anchorEl);

  // ==========================================
  // GET LOGGED USER
  // ==========================================

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );

  // ==========================================
  // USER MENU
  // ==========================================

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // ==========================================
  // MOBILE SIDEBAR
  // ==========================================

  const handleDrawerToggle = () => {
    setMobileOpen((previous) => !previous);
  };

  const closeMobileDrawer = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // ==========================================
  // GET ACTIVE PAGE
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
    closeMobileDrawer();

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
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");

    setAnchorEl(null);
    setMobileOpen(false);

    navigate("/", {
      replace: true,
    });
  };

  // ==========================================
  // SIDEBAR STYLE
  // ==========================================

  const menuItemStyle = {
    borderRadius: 2.5,
    mb: 1,

    minHeight: 46,

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

  // ==========================================
  // SIDEBAR CONTENT
  // ==========================================

  const sidebarContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
        p: 2,
      }}
    >
      {/* ======================================
          LOGO
      ====================================== */}

      <Box
        sx={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          mb: 2,
        }}
      >
        <Typography
          onClick={() => {
            navigate("/student");
            closeMobileDrawer();
          }}
          sx={{
            fontSize: 22,
            fontWeight: 800,
            color: "#1597f5",
            letterSpacing: 0.5,
            cursor: "pointer",
          }}
        >
          CampusNotes
        </Typography>

        {/* Close button only mobile */}

        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              color: "#64748b",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <List sx={{ p: 0 }}>

        {/* DASHBOARD */}

        <ListItemButton
          selected={activePage === "dashboard"}
          onClick={() =>
            handlePageChange("dashboard")
          }
          sx={menuItemStyle}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
            }}
          >
            <DashboardIcon
              sx={{
                color:
                  activePage === "dashboard"
                    ? "#1597f5"
                    : "#64748b",
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
          selected={activePage === "profile"}
          onClick={() =>
            handlePageChange("profile")
          }
          sx={menuItemStyle}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
            }}
          >
            <PeopleIcon
              sx={{
                color:
                  activePage === "profile"
                    ? "#1597f5"
                    : "#64748b",
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
          selected={activePage === "upload"}
          onClick={() =>
            handlePageChange("upload")
          }
          sx={menuItemStyle}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
            }}
          >
            <CloudUploadIcon
              sx={{
                color:
                  activePage === "upload"
                    ? "#1597f5"
                    : "#64748b",
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
          selected={activePage === "notes"}
          onClick={() =>
            handlePageChange("notes")
          }
          sx={menuItemStyle}
        >
          <ListItemIcon
            sx={{
              minWidth: 42,
            }}
          >
            <DescriptionIcon
              sx={{
                color:
                  activePage === "notes"
                    ? "#1597f5"
                    : "#64748b",
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
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      {!isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            height: "100vh",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: SIDEBAR_WIDTH,
              boxShadow:
                "4px 0 25px rgba(15,23,42,0.12)",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box
        component="main"
        sx={{
          marginLeft: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },

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
            height: {
              xs: 64,
              md: 72,
            },

            backgroundColor: "#ffffff",

            borderBottom:
              "1px solid #e5e7eb",

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            px: {
              xs: 1.5,
              sm: 2.5,
              md: 4,
            },

            position: "sticky",

            top: 0,

            zIndex: 900,
          }}
        >

          {/* =========================================
              MOBILE MENU BUTTON
          ========================================= */}

          {isMobile ? (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1597f5",
                }}
              >
                CampusNotes
              </Typography>
            </Stack>
          ) : (
            <Box />
          )}

          {/* =========================================
              USER AVATAR
          ========================================= */}

          <Tooltip title="Account">
            <Avatar
              onClick={handleUserMenu}
              sx={{
                width: {
                  xs: 38,
                  md: 42,
                },

                height: {
                  xs: 38,
                  md: 42,
                },

                cursor: "pointer",

                background:
                  "linear-gradient(135deg,#1597f5,#2563eb)",

                fontWeight: 700,

                border:
                  "2px solid #e0f2fe",

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

          {/* =========================================
              USER MENU
          ========================================= */}

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

                width: {
                  xs: 210,
                  sm: 230,
                },

                borderRadius: 2.5,

                border:
                  "1px solid #e5e7eb",

                overflow: "hidden",
              },
            }}
          >

            {/* USER INFO */}

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
                {loggedUser?.name ||
                  "Student"}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  maxWidth: 190,
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

                navigate(
                  "/student/profile"
                );
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
                  backgroundColor:
                    "#fef2f2",
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
        </Box>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 4,
            },

            width: "100%",

            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>

      </Box>
       <Chatbot/>
    </Box>
  );
};

export default StudentDashboard;