import React from "react";

import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const SearchBar = ({
  search,
  setSearch,
  onUpload,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
      }}
    >
      <Grid
        container
        spacing={2}
      >
        {/* SEARCH INPUT */}

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <TextField
            fullWidth
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search notes..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>


        {/* UPLOAD BUTTON */}

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <CloudUploadIcon />
            }
            onClick={onUpload}
            sx={{
              height: 56,
              bgcolor: "#0795e8",
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                bgcolor: "#0786cf",
              },
            }}
          >
            Add New Document
          </Button>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default SearchBar;

