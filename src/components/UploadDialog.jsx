import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadDialog = ({
  open,
  onClose,
  formData,
  onChange,
  onFileChange,
  onUpload,
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 800,
        }}
      >
        Upload New Document

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>

        <Grid container spacing={2}>

          {/* TITLE */}

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Note Title"
              name="title"
              value={formData.title}
              onChange={onChange}
            />

          </Grid>

          {/* DESCRIPTION */}

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={onChange}
            />

          </Grid>

          {/* BRANCH */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <TextField
              select
              fullWidth
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={onChange}
            >

              <MenuItem value="MCA">
                MCA
              </MenuItem>

              <MenuItem value="BCA">
                BCA
              </MenuItem>

              <MenuItem value="B.Tech">
                B.Tech
              </MenuItem>

              <MenuItem value="M.Tech">
                M.Tech
              </MenuItem>

            </TextField>

          </Grid>

          {/* SEMESTER */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <TextField
              select
              fullWidth
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={onChange}
            >

              {[1, 2, 3, 4, 5, 6].map(
                (semester) => (

                  <MenuItem
                    key={semester}
                    value={semester}
                  >
                    Semester {semester}
                  </MenuItem>

                )
              )}

            </TextField>

          </Grid>

          {/* SUBJECT */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >

            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={onChange}
            />

          </Grid>

          {/* FILE */}

          <Grid size={{ xs: 12 }}>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                textAlign: "center",
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#0795e8",
              }}
            >

              <FolderIcon
                sx={{
                  fontSize: 45,
                  color: "#0795e8",
                }}
              />

              <Typography fontWeight={700}>
                Select PDF File
              </Typography>

              <Button
                component="label"
                variant="outlined"
                sx={{
                  mt: 2,
                  textTransform: "none",
                }}
              >
                Choose File

                <input
                  hidden
                  type="file"
                  accept=".pdf"
                  onChange={onFileChange}
                />

              </Button>

              {formData.file && (

                <Box sx={{ mt: 2 }}>

                  <Typography
                    color="success.main"
                    fontWeight={600}
                  >
                    Selected:{" "}
                    {formData.file.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {(
                      formData.file.size / 1024
                    ).toFixed(2)} KB
                  </Typography>

                </Box>

              )}

            </Paper>

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions sx={{ p: 3 }}>

        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={onUpload}
          sx={{
            bgcolor: "#0795e8",
            textTransform: "none",
          }}
        >
          Upload Document
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default UploadDialog;