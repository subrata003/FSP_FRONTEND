import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Header = ({ onUpload }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#172033",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>
        <DashboardIcon
          sx={{
            color: "#0795e8",
            mr: 1,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ flexGrow: 1 }}
        >
          Online Notes Sharing System
        </Typography>

        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={onUpload}
          sx={{
            bgcolor: "#0795e8",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          Upload Document
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;