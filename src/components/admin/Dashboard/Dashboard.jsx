import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  // ==========================================
  // Dashboard State
  // ==========================================

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalNotes: 0,
    totalDownloads: 0,
    totalPendingNotes: 0,
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ==========================================
  // Get Dashboard Data
  // ==========================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ==========================================
        // API 1 - Get All Students
        // ==========================================

        const studentsResponse = await fetch(
          "http://192.168.29.171:8080/api/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!studentsResponse.ok) {
          throw new Error(
            `Students API Error: ${studentsResponse.status}`
          );
        }

        const studentsData = await studentsResponse.json();

        console.log("Students API:", studentsData);

        // ==========================================
        // API 2 - Get Pending Notes
        // ==========================================

        const pendingResponse = await fetch(
          "http://192.168.29.171:8080/api/admin/notes/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!pendingResponse.ok) {
          throw new Error(
            `Pending Notes API Error: ${pendingResponse.status}`
          );
        }

        const pendingData = await pendingResponse.json();

        console.log("Pending Notes API:", pendingData);

        // ==========================================
        // API 3 - Get All Approved Notes
        // ==========================================

        const approvedResponse = await fetch(
          "http://192.168.29.171:8080/api/notes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!approvedResponse.ok) {
          throw new Error(
            `Approved Notes API Error: ${approvedResponse.status}`
          );
        }

        const approvedData = await approvedResponse.json();

        console.log("Approved Notes API:", approvedData);

        // ==========================================
        // Convert API responses to arrays
        // ==========================================

        const students = Array.isArray(studentsData)
          ? studentsData
          : studentsData.students || studentsData.content || [];

        const pendingNotes = Array.isArray(pendingData)
          ? pendingData
          : pendingData.notes ||
            pendingData.content ||
            [];

        const approvedNotes = Array.isArray(approvedData)
          ? approvedData
          : approvedData.notes ||
            approvedData.content ||
            [];

        // ==========================================
        // Total Users
        // ==========================================

        const totalUsers = students.length;

        // ==========================================
        // Total Pending Notes
        // ==========================================

        const totalPendingNotes = pendingNotes.length;

        // ==========================================
        // Total Approved Notes
        // ==========================================

        const totalNotes = approvedNotes.length;

        // ==========================================
        // Total Downloads
        // ==========================================

        const totalDownloads = approvedNotes.reduce(
          (total, note) => {
            const downloads =
              Number(note.downloads) ||
              Number(note.downloadCount) ||
              0;

            return total + downloads;
          },
          0
        );

        // ==========================================
        // Set Dashboard Data
        // ==========================================

        setDashboardData({
          totalUsers,
          totalNotes,
          totalDownloads,
          totalPendingNotes,
        });

        console.log("Dashboard Data:", {
          totalUsers,
          totalNotes,
          totalDownloads,
          totalPendingNotes,
        });
      } catch (error) {
        console.error(
          "Error fetching dashboard data:",
          error
        );

        // Keep dashboard values at zero if API fails
        setDashboardData({
          totalUsers: 0,
          totalNotes: 0,
          totalDownloads: 0,
          totalPendingNotes: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // ==========================================
  // Statistics Cards
  // ==========================================

  const statistics = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      icon: <PeopleIcon />,
      color: "#2563EB",
      lightColor: "#EFF6FF",
    },

    {
      title: "Total Approved Notes",
      value: dashboardData.totalNotes,
      icon: <DescriptionIcon />,
      color: "#7C3AED",
      lightColor: "#F5F3FF",
    },

    {
      title: "Total Downloads",
      value: dashboardData.totalDownloads,
      icon: <DownloadIcon />,
      color: "#059669",
      lightColor: "#ECFDF5",
    },

    {
      title: "Pending Notes",
      value: dashboardData.totalPendingNotes,
      icon: <PendingActionsIcon />,
      color: "#EA580C",
      lightColor: "#FFF7ED",
    },
  ];

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#F8FAFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==========================================
  // Dashboard UI
  // ==========================================

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#F8FAFC",
        boxSizing: "border-box",
        pt: 0,
        overflowX: "hidden",
      }}
    >
      {/* ==========================================
          Dashboard Header
      ========================================== */}

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            mb: 0.5,
          }}
        >
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#64748B",
            fontWeight: 400,
          }}
        >
          Overview of your Note Sharing Application
        </Typography>
      </Box>

      {/* ==========================================
          Statistics Cards
      ========================================== */}

      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
        }}
      >
        {statistics.map((item) => (
          <Grid
            key={item.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderTop: `4px solid ${item.color}`,

                boxShadow:
                  "0 4px 12px rgba(15, 23, 42, 0.08)",

                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow:
                    "0 10px 25px rgba(15, 23, 42, 0.14)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,

                  "&:last-child": {
                    pb: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Card Text */}

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#0F172A",
                        fontWeight: 700,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {item.value.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Card Icon */}

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 2.5,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      backgroundColor: item.lightColor,
                      color: item.color,

                      transition: "all 0.3s ease",

                      "&:hover": {
                        transform: "scale(1.08)",
                      },
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: {
                        fontSize: 30,
                      },
                    })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ==========================================
          Circular Statistics Graph
      ========================================== */}

      <Card
        elevation={0}
        sx={{
          mt: 3,
          width: "100%",
          borderRadius: 3,

          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",

          boxShadow:
            "0 4px 12px rgba(15, 23, 42, 0.08)",

          transition: "all 0.3s ease",

          "&:hover": {
            boxShadow:
              "0 10px 25px rgba(15, 23, 42, 0.14)",
          },
        }}
      >
        <CardContent
          sx={{
            p: 3,

            "&:last-child": {
              pb: 3,
            },
          }}
        >
          {/* Circular Graph Header */}

          <Box
            sx={{
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#0F172A",
                fontWeight: 600,
              }}
            >
              Notes & User Status
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                mt: 0.5,
              }}
            >
              Users, approved notes and pending notes overview
            </Typography>
          </Box>

          {/* Circular Graph */}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              height: "300px",
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: dashboardData.totalUsers,
                      label: "Total Users",
                      color: "#2563EB",
                    },

                    {
                      id: 1,
                      value: dashboardData.totalNotes,
                      label: "Approved Notes",
                      color: "#059669",
                    },

                    {
                      id: 2,
                      value:
                        dashboardData.totalPendingNotes,
                      label: "Pending Notes",
                      color: "#EA580C",
                    },
                  ],

                  innerRadius: 65,
                  outerRadius: 105,
                  paddingAngle: 3,
                  cornerRadius: 6,

                  highlightScope: {
                    highlighted: "item",
                    faded: "global",
                  },
                },
              ]}
              width={500}
              height={280}
              slotProps={{
                legend: {
                  direction: "column",

                  position: {
                    vertical: "middle",
                    horizontal: "right",
                  },

                  padding: 10,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;