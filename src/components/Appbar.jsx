import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Appbar() {
  const [openUpload, setOpenUpload] = useState(false);
 const handleOpenUpload = () => {
    setOpenUpload(true);
  };
 return (
  <AppBar
   position="static"
   elevation={0}
   sx={{
    bgcolor: "#fff",
    color: "#172033",
    borderBottom:
     "1px solid #e5e7eb",
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
     startIcon={
      <CloudUploadIcon />
     }
     onClick={handleOpenUpload}
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

  
 )
}

export default Appbar