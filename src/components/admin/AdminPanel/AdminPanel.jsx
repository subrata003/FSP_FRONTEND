
import React, { useState } from "react";

import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Grid,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Description as DescriptionIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

import Dashboard from "../Dashboard/Dashboard";
import UserMangement from "../UserMangement/UserMangement";
import NoteManagement from "../NoteManagement/NoteManagement";

const drawerWidth = 240;

const AdminPanel = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");

    // Profile menu state
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        setMobileOpen(false);
    };

    // Open profile menu
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close profile menu
    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    // Logout
    const handleLogout = () => {
        setAnchorEl(null);
        console.log("Admin Logout");
    };

    // ==========================================
    // Render selected page
    // ==========================================

    const renderContent = () => {

        switch (activePage) {

            case "dashboard":
                return <Dashboard />;

            case "users":
                return <UserMangement />;

            case "notes":
                return <NoteManagement />;

            default:
                return <Dashboard />;
        }
    };

    // ==========================================
    // Drawer Content
    // ==========================================

    const drawer = (
        <Box
            sx={{
                height: "100%",
                backgroundColor: "#FFFFFF",
            }}
        >

            {/* Drawer Header */}

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: "#0F172A",
                    }}
                >
                    Admin Panel
                </Typography>

            </Toolbar>

            <Divider />

            <List
                sx={{
                    px: 1,
                    py: 2,
                }}
            >

                {/* Dashboard */}

                <ListItemButton
                    selected={activePage === "dashboard"}
                    onClick={() => handlePageChange("dashboard")}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,

                        "&.Mui-selected": {
                            backgroundColor: "#EFF6FF",
                            color: "#2563EB",
                        },

                        "&.Mui-selected:hover": {
                            backgroundColor: "#DBEAFE",
                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 40,
                            color:
                                activePage === "dashboard"
                                    ? "#2563EB"
                                    : "#64748B",
                        }}
                    >
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Dashboard"
                        primaryTypographyProps={{
                            fontWeight:
                                activePage === "dashboard"
                                    ? 600
                                    : 400,
                        }}
                    />

                </ListItemButton>


                {/* Users */}

                <ListItemButton
                    selected={activePage === "users"}
                    onClick={() => handlePageChange("users")}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,

                        "&.Mui-selected": {
                            backgroundColor: "#EFF6FF",
                            color: "#2563EB",
                        },

                        "&.Mui-selected:hover": {
                            backgroundColor: "#DBEAFE",
                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 40,
                            color:
                                activePage === "users"
                                    ? "#2563EB"
                                    : "#64748B",
                        }}
                    >
                        <PeopleIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Users"
                        primaryTypographyProps={{
                            fontWeight:
                                activePage === "users"
                                    ? 600
                                    : 400,
                        }}
                    />

                </ListItemButton>


                {/* Note Management */}

                <ListItemButton
                    selected={activePage === "notes"}
                    onClick={() => handlePageChange("notes")}
                    sx={{
                        borderRadius: 2,
                        mb: 0.5,

                        "&.Mui-selected": {
                            backgroundColor: "#EFF6FF",
                            color: "#2563EB",
                        },

                        "&.Mui-selected:hover": {
                            backgroundColor: "#DBEAFE",
                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 40,
                            color:
                                activePage === "notes"
                                    ? "#2563EB"
                                    : "#64748B",
                        }}
                    >
                        <DescriptionIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Note Management"
                        primaryTypographyProps={{
                            fontWeight:
                                activePage === "notes"
                                    ? 600
                                    : 400,
                        }}
                    />

                </ListItemButton>

            </List>

        </Box>
    );


    return (

        /*
        ==========================================
        MAIN ADMIN PANEL GRID
        ==========================================
        */

        <Grid
            container
            sx={{
                minHeight: "100vh",
                width: "100%",
                margin: 0,
                backgroundColor: "#F8FAFC",
            }}
        >

            {/* ==========================================
                TOP NAVBAR
            ========================================== */}

            <Grid
                size={12}
                sx={{
                    height: "64px",
                }}
            >

                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: `calc(100% - ${drawerWidth}px)`,
                        },

                        ml: {
                            xs: 0,
                            sm: `${drawerWidth}px`,
                        },

                        backgroundColor: "#1976D2",

                        borderBottom: "1px solid #1565C0",
                    }}
                >

                    <Toolbar>

                        {/* Mobile menu button */}

                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,

                                display: {
                                    xs: "flex",
                                    sm: "none",
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>


                        {/* Hello Admin */}

                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontStyle: "italic",
                                fontWeight: 500,
                                color: "#FFFFFF",
                            }}
                        >
                            Hello, Admin
                        </Typography>


                        {/* Spacer */}

                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />


                        {/* Admin Profile */}

                        <IconButton
                            onClick={handleProfileClick}
                            sx={{
                                p: 0.5,
                            }}
                        >

                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,

                                    backgroundColor: "#EDE9FE",
                                    color: "#7C3AED",

                                    fontWeight: 700,

                                    border: "2px solid #C4B5FD",

                                    transition: "all 0.2s ease",

                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        backgroundColor: "#DDD6FE",
                                    },
                                }}
                            >
                                A
                            </Avatar>

                        </IconButton>


                        {/* Profile Menu */}

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleProfileClose}

                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}

                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}

                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    minWidth: 150,
                                    borderRadius: 2,

                                    boxShadow:
                                        "0 8px 25px rgba(15, 23, 42, 0.15)",
                                },
                            }}
                        >

                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    color: "#DC2626",
                                    fontWeight: 500,
                                }}
                            >

                                <ListItemIcon>

                                    <LogoutIcon
                                        fontSize="small"
                                        sx={{
                                            color: "#DC2626",
                                        }}
                                    />

                                </ListItemIcon>

                                Logout

                            </MenuItem>

                        </Menu>

                    </Toolbar>

                </AppBar>

            </Grid>


            {/* ==========================================
                LEFT DRAWER
            ========================================== */}

            <Grid
                size={{
                    xs: 0,
                    sm: 3,
                }}
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    },

                    width: {
                        sm: `${drawerWidth}px`,
                    },

                    flexShrink: 0,
                }}
            >

                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: "none",
                            sm: "block",
                        },

                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",

                            borderRight:
                                "1px solid #E2E8F0",

                            backgroundColor: "#FFFFFF",

                            top: 0,
                        },
                    }}
                    open
                >

                    {drawer}

                </Drawer>

            </Grid>


            {/* ==========================================
                MOBILE DRAWER
            ========================================== */}

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}

                ModalProps={{
                    keepMounted: true,
                }}

                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#FFFFFF",
                    },
                }}
            >

                {drawer}

            </Drawer>


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <Grid
                size={{
                    xs: 12,
                    sm: 9,
                }}
                sx={{
                    minHeight: "100vh",

                    boxSizing: "border-box",

                    backgroundColor: "#F8FAFC",

                    padding: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    paddingTop: {
                        xs: "80px",
                        sm: "88px",
                    },
                }}
            >

                {/* ==========================================
                    CONTENT GRID
                ========================================== */}

                <Grid
                    container
                    spacing={3}
                    sx={{
                        width: "100%",
                        margin: 0,
                    }}
                >

                    <Grid
                        size={12}
                    >

                        {renderContent()}

                    </Grid>

                </Grid>

            </Grid>

        </Grid>
    );
};

export default AdminPanel;

