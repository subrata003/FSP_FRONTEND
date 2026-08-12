import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  Person,
  Email,
  Business,
  Badge,
  AdminPanelSettings,
  School,
  Logout,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
   const token = localStorage.getItem("token");
  // console.log("token is : ",token);

  // Get currently logged-in user
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );

  // If nobody is logged in
  if (!loggedUser) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Card sx={{ maxWidth: 450, width: "100%" }}>
          <CardContent sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="h5" fontWeight="bold">
              No User Logged In
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1, mb: 3 }}
            >
              Please login to view your profile.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Logout
  const handleLogout = () => {
 
    localStorage.removeItem("token");
    navigate("/");
  };

  // First letter of name
  const avatarLetter =
    loggedUser.name?.charAt(0).toUpperCase() || "U";

  const isAdmin = loggedUser.role === "admin";

 return (
  <Box
    sx={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #f4f7ff 0%, #f8fafc 50%, #eef4ff 100%)",
      py: {
        xs: 2,
        md: 5,
      },
      px: {
        xs: 2,
        md: 4,
      },
    }}
  >
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
      }}
    >
      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "#172033",
            fontSize: {
              xs: "1.8rem",
              md: "2.2rem",
            },
          }}
        >
          My Profile
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 0.7,
            fontSize: "0.95rem",
          }}
        >
          Manage your account and view your personal
          information.
        </Typography>
      </Box>

      {/* =====================================
          MAIN PROFILE CARD
      ====================================== */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          boxShadow:
            "0 20px 50px rgba(15,23,42,0.08)",
        }}
      >
        {/* =====================================
            PROFILE HERO
        ====================================== */}

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            px: {
              xs: 3,
              md: 5,
            },
            py: {
              xs: 4,
              md: 5,
            },

            background: isAdmin
              ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 55%, #2563eb 100%)"
              : "linear-gradient(135deg, #2563eb 0%, #4f46e5 55%, #6366f1 100%)",
          }}
        >
          {/* Decorative circles */}

          <Box
            sx={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.08)",
              right: -80,
              top: -120,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.06)",
              right: 120,
              bottom: -110,
            }}
          />

          {/* Profile content */}

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* AVATAR */}

            <Avatar
              sx={{
                width: {
                  xs: 85,
                  md: 105,
                },
                height: {
                  xs: 85,
                  md: 105,
                },
                fontSize: {
                  xs: 34,
                  md: 42,
                },
                fontWeight: 800,
                background: "#ffffff",
                color: isAdmin
                  ? "#6366f1"
                  : "#2563eb",
                border:
                  "5px solid rgba(255,255,255,0.25)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.18)",
              }}
            >
              {avatarLetter}
            </Avatar>

            {/* USER INFO */}

            <Box sx={{ color: "#fff" }}>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "1.7rem",
                    md: "2.1rem",
                  },
                }}
              >
                {loggedUser.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color:
                    "rgba(255,255,255,0.85)",
                  wordBreak: "break-word",
                }}
              >
                {loggedUser.email}
              </Typography>

              <Chip
                icon={
                  isAdmin ? (
                    <AdminPanelSettings />
                  ) : (
                    <School />
                  )
                }
                label={
                  isAdmin
                    ? "Administrator"
                    : "Student"
                }
                sx={{
                  mt: 2,
                  px: 1,
                  fontWeight: 700,
                  color: "#fff",
                  background:
                    "rgba(255,255,255,0.16)",
                  border:
                    "1px solid rgba(255,255,255,0.25)",
                  backdropFilter:
                    "blur(10px)",

                  "& .MuiChip-icon": {
                    color: "#fff",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* =====================================
            PROFILE CONTENT
        ====================================== */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 5,
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              color: "#172033",
              mb: 3,
            }}
          >
            Personal Information
          </Typography>

          <Grid
            container
            spacing={2.5}
          >
            {/* NAME */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: "100%",
                  borderRadius: 3,
                  border:
                    "1px solid #e5e7eb",
                  background: "#fafbff",
                  transition:
                    "all 0.25s",

                  "&:hover": {
                    transform:
                      "translateY(-3px)",
                    borderColor:
                      "#bfdbfe",
                    boxShadow:
                      "0 10px 25px rgba(37,99,235,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#e8f1ff",
                      color: "#2563eb",
                    }}
                  >
                    <Person />
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Full Name
                    </Typography>

                    <Typography
                      fontWeight={800}
                      sx={{
                        color: "#172033",
                        mt: 0.3,
                      }}
                    >
                      {loggedUser.name}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* EMAIL */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: "100%",
                  borderRadius: 3,
                  border:
                    "1px solid #e5e7eb",
                  background: "#fafbff",
                  transition:
                    "all 0.25s",

                  "&:hover": {
                    transform:
                      "translateY(-3px)",
                    borderColor:
                      "#bbf7d0",
                    boxShadow:
                      "0 10px 25px rgba(16,185,129,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#e9fbf3",
                      color: "#10b981",
                    }}
                  >
                    <Email />
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Email Address
                    </Typography>

                    <Typography
                      fontWeight={800}
                      sx={{
                        color: "#172033",
                        mt: 0.3,
                        wordBreak:
                          "break-word",
                      }}
                    >
                      {loggedUser.email}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

           

            {/* ACCOUNT TYPE */}

            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border:
                    "1px solid #e5e7eb",
                  background:
                    isAdmin
                      ? "#faf5ff"
                      : "#eff6ff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        isAdmin
                          ? "#f3e8ff"
                          : "#dbeafe",
                      color:
                        isAdmin
                          ? "#7c3aed"
                          : "#2563eb",
                    }}
                  >
                    {isAdmin ? (
                      <AdminPanelSettings />
                    ) : (
                      <School />
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Account Type
                    </Typography>

                    <Typography
                      fontWeight={800}
                      sx={{
                        color: "#172033",
                        mt: 0.3,
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {loggedUser.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* =====================================
              ACCOUNT ACTION
          ====================================== */}

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography
                fontWeight={800}
                sx={{ color: "#172033" }}
              >
                Account Security
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.4 }}
              >
                Sign out from your current account.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                minWidth: 140,
                borderRadius: 2.5,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",

                "&:hover": {
                  background: "#fef2f2",
                  borderColor: "#ef4444",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  </Box>
);
};

export default Profile;
