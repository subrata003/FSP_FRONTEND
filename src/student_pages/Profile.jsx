// import React, { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Container,
//   Divider,
//   Typography,
// } from "@mui/material";

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("loggedInUser");

//     if (loggedInUser) {
//       try {
//         setUser(JSON.parse(loggedInUser));
//       } catch (error) {
//         console.error("Invalid loggedInUser:", error);
//       }
//     }
//   }, []);

//   if (!user) {
//     return (
//       <Container sx={{ py: 5 }}>
//         <Typography>
//           No user is currently logged in.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 5 }}>
//       <Card
//         elevation={0}
//         sx={{
//           border: "1px solid #e5e9ed",
//           borderRadius: 3,
//         }}
//       >
//         <CardContent sx={{ p: 4 }}>
//           {/* Profile Header */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               mb: 3,
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 75,
//                 height: 75,
//                 bgcolor: "#0796f5",
//                 fontSize: 30,
//                 fontWeight: 700,
//               }}
//             >
//               {user.name?.charAt(0)?.toUpperCase()}
//             </Avatar>

//             <Box>
//               <Typography variant="h5" fontWeight={800}>
//                 {user.name}
//               </Typography>

//               <Typography color="text.secondary">
//                 {user.role === "admin" ? "Administrator" : "Student"}
//               </Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           {/* Details */}
//           <Typography variant="h6" fontWeight={800} mb={2}>
//             Personal Information
//           </Typography>

//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: {
//                 xs: "1fr",
//                 sm: "1fr 1fr",
//               },
//               gap: 2,
//             }}
//           >
//             <InfoItem
//               label="Full Name"
//               value={user.name}
//             />

//             <InfoItem
//               label="Email"
//               value={user.email}
//             />

//             <InfoItem
//               label="Roll Number"
//               value={user.rollNumber}
//             />

//             <InfoItem
//               label="Department"
//               value={user.department}
//             />

//             <InfoItem
//               label="Role"
//               value={user.role}
//             />
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// const InfoItem = ({ label, value }) => {
//   return (
//     <Box
//       sx={{
//         p: 2,
//         bgcolor: "#f7f9fb",
//         borderRadius: 2,
//       }}
//     >
//       <Typography
//         variant="caption"
//         color="text.secondary"
//         fontWeight={600}
//       >
//         {label}
//       </Typography>

//       <Typography fontWeight={700} sx={{ mt: 0.5 }}>
//         {value || "N/A"}
//       </Typography>
//     </Box>
//   );
// };

// export default Profile;
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
    localStorage.removeItem("loggedUser");
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
        background: "#f5f7fb",
        p: {
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
        {/* ================================
            HEADER
        ================================= */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            My Profile
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            View your account information
          </Typography>
        </Paper>

        {/* ================================
            PROFILE CARD
        ================================= */}
        <Card
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              background: isAdmin
                ? "linear-gradient(135deg, #7b1fa2, #512da8)"
                : "linear-gradient(135deg, #1976d2, #0288d1)",
              color: "white",
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: 42,
                  fontWeight: "bold",
                  backgroundColor: "white",
                  color: isAdmin
                    ? "#7b1fa2"
                    : "#1976d2",
                  boxShadow: 3,
                }}
              >
                {avatarLetter}
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {loggedUser.name}
                </Typography>

                <Typography
                  sx={{
                    opacity: 0.9,
                    mt: 0.5,
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
                    color: "white",
                    backgroundColor:
                      "rgba(255,255,255,0.2)",
                    fontWeight: "bold",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              Personal Information
            </Typography>

            <Grid container spacing={3}>
              {/* NAME */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Person color="primary" />

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Full Name
                      </Typography>

                      <Typography
                        fontWeight="bold"
                      >
                        {loggedUser.name}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* EMAIL */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Email color="primary" />

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Email Address
                      </Typography>

                      <Typography
                        fontWeight="bold"
                        sx={{
                          wordBreak: "break-word",
                        }}
                      >
                        {loggedUser.email}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* DEPARTMENT */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Business color="primary" />

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Department
                      </Typography>

                      <Typography
                        fontWeight="bold"
                      >
                        {loggedUser.department ||
                          "Not Available"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* ROLL NUMBER */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Badge color="primary" />

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Roll Number / ID
                      </Typography>

                      <Typography
                        fontWeight="bold"
                      >
                        {loggedUser.rollNumber ||
                          "Not Available"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* ROLE */}
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {isAdmin ? (
                      <AdminPanelSettings color="primary" />
                    ) : (
                      <School color="primary" />
                    )}

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Account Type
                      </Typography>

                      <Typography
                        fontWeight="bold"
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {loggedUser.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* LOGOUT */}
            <Button
              variant="contained"
              color="error"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.2,
                fontWeight: "bold",
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
