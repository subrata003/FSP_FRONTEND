
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

import { BarChart } from "@mui/x-charts/BarChart";


const Dashboard = () => {

  // ==========================================
  // Dashboard State
  // ==========================================

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalNotes: 0,
    totalDownloads: 0,
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
    };

    setDashboardData(sampleData);

  }, []);


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
      title: "Total Notes",
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

  ];


  return (

    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#F8FAFC",
        boxSizing: "border-box",
        pt:0,
        overflowX:"hidden",
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
              md: 4,
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

                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.10)",
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
          Chart
      ========================================== */}

      <Card
        elevation={0}
        sx={{
          mt: 3,

          width: "100%",

          borderRadius: 3,

          backgroundColor: "#FFFFFF",

          border: "1px solid #E2E8F0",

          transition: "all 0.3s ease",

          "&:hover": {
            boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
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

          {/* Chart Header */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >

            <Box>

              <Typography
                variant="h6"
                sx={{
                  color: "#0F172A",
                  fontWeight: 600,
                }}
              >
                Application Statistics
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#64748B",
                  mt: 0.5,
                }}
              >
                Users, notes and downloads overview
              </Typography>

            </Box>

          </Box>


          {/* Professional Bar Chart */}

          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
            }}
          >

            <BarChart
              xAxis={[
                {
                  scaleType: "band",

                  data: [
                    "Users",
                    "Notes",
                    "Downloads",
                  ],

                  tickLabelStyle: {
                    fill: "#64748B",
                    fontSize: 13,
                  },
                },
              ]}

              yAxis={[
                {
                  tickLabelStyle: {
                    fill: "#64748B",
                    fontSize: 12,
                  },
                },
              ]}

              series={[
                {
                  data: [
                    dashboardData.totalUsers,
                    dashboardData.totalNotes,
                    dashboardData.totalDownloads,
                  ],

                  label: "Total",

                  color: "#2563EB",

                  highlightScope: {
                    highlighted: "item",
                    faded: "global",
                  },
                },
              ]}

              height={360}

              borderRadius={8}

              grid={{
                horizontal: true,
              }}

              margin={{
                top: 20,
                bottom: 45,
                left: 60,
                right: 20,
              }}

              slotProps={{
                legend: {
                  position: {
                    vertical: "top",
                    horizontal: "right",
                  },
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
