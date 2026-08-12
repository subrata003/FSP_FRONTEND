
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { BarChart } from "@mui/x-charts/BarChart";
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


  // ==========================================
  // Get Dashboard Data
  // ==========================================

  useEffect(() => {

    // Sample data for now
    // Later replace this with Spring Boot API

    const sampleData = {
      totalUsers: 120,
      totalNotes: 250,
      totalDownloads: 1540,
      totalPendingNotes: 45,
    };

    setDashboardData(sampleData);

  }, []);


  // ==========================================
  // Active Notes
  // ==========================================

  const totalActiveNotes =
    dashboardData.totalNotes -
    dashboardData.totalPendingNotes;


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
      title: "Total Active Notes",
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

                borderTop:
                  `4px solid ${item.color}`,

                /* ==================================
                   CARD SHADOW
                ================================== */

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

                      backgroundColor:
                        item.lightColor,

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

          /* ======================================
             CIRCULAR GRAPH BOX SHADOW
          ====================================== */

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
              Users, active notes and pending notes overview
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
                      value:
                        dashboardData.totalUsers,
                      label: "Total Users",
                      color: "#2563EB",
                    },

                    {
                      id: 1,
                      value: totalActiveNotes,
                      label: "Active Notes",
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

