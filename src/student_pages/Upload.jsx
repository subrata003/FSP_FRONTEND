import React, { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Stack,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

const Upload = () => {
  // ==============================
  // STATE
  // ==============================

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [openUpload, setOpenUpload] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    semester: "",
    subject: "",
    file: null,
  });

  // ==============================
  // DEBUG FORM DATA
  // ==============================

  useEffect(() => {
    console.log("FORM DATA UPDATED:", formData);
  }, [formData]);

  // ==============================
  // LOAD SAVED NOTES
  // ==============================

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("uploadedNotes");

      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);

        console.log("LOADED NOTES:", parsedNotes);

        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      localStorage.removeItem("uploadedNotes");
    }
  }, []);

  // ==============================
  // HANDLE TEXT INPUT
  // ==============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log("INPUT CHANGED");
    console.log("NAME:", name);
    console.log("VALUE:", value);

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==============================
  // HANDLE FILE
  // ==============================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log("FILE SELECTED:", file);

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      file: file,
    }));
  };

  // ==============================
  // OPEN UPLOAD DIALOG
  // ==============================

  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  // ==============================
  // CLOSE UPLOAD DIALOG
  // ==============================

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  // ==============================
  // UPLOAD DOCUMENT
  // ==============================

  const handleUpload = () => {
    console.log("================================");
    console.log("UPLOAD BUTTON CLICKED");
    console.log("FORM DATA BEFORE UPLOAD:");
    console.log(formData);
    console.log("================================");

    // Validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.department ||
      !formData.semester ||
      !formData.subject.trim() ||
      !formData.file
    ) {
      alert("Please fill all fields and select a file.");
      return;
    }

    console.log("VALIDATION SUCCESS");

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result;

        // Remove "data:application/pdf;base64,"
        const base64Data =
          typeof result === "string"
            ? result.split(",")[1]
            : "";

        const newNote = {
          id: Date.now(),

          title: formData.title.trim(),

          description: formData.description.trim(),

          department: formData.department,

          semester: formData.semester,

          subject: formData.subject.trim(),

          fileName: formData.file.name,

          fileType:
            formData.file.type ||
            "application/octet-stream",

          fileSize: formData.file.size,

          fileData: base64Data,

          date: new Date().toISOString(),

          downloads: 0,
        };

        // ==============================
        // LOG FINAL UPLOAD DATA
        // ==============================

        
        console.log("NEW UPLOAD DATA:");
        console.log(newNote);
    

        
        // GET OLD NOTES
       

        const savedNotes =
          localStorage.getItem("uploadedNotes");

        const oldNotes = savedNotes
          ? JSON.parse(savedNotes)
          : [];

       
        // ADD NEW NOTE
     

        const updatedNotes = [
          newNote,
          ...oldNotes,
        ];

        
        // LOG ALL NOTES
      

        console.log("ALL UPLOADED NOTES:");
        console.log(updatedNotes);

    
        // SAVE TO LOCAL STORAGE
        

        localStorage.setItem(
          "uploadedNotes",
          JSON.stringify(updatedNotes)
        );

        
        // UPDATE UI
      

        setNotes(updatedNotes);

  
        // RESET FORM
      

        setFormData({
          title: "",
          description: "",
          department: "",
          semester: "",
          subject: "",
          file: null,
        });

        // Close dialog
        setOpenUpload(false);

        alert("Document uploaded successfully!");

        console.log("UPLOAD SUCCESS");
      } catch (error) {
        console.error(
          "Error saving uploaded note:",
          error
        );

        alert("Unable to save document.");
      }
    };

    reader.onerror = () => {
      console.error("FileReader error");

      alert("Unable to read the selected file.");
    };

    // Convert file into Base64
    reader.readAsDataURL(formData.file);
  };


  // DOWNLOAD DOCUMENT


  const handleDownload = (note) => {
    console.log("DOWNLOADING:", note);

    if (!note.fileData) {
      alert("File data not available.");
      return;
    }

    try {
      const byteCharacters = atob(note.fileData);

      const byteNumbers = new Array(
        byteCharacters.length
      );

      for (
        let i = 0;
        i < byteCharacters.length;
        i++
      ) {
        byteNumbers[i] =
          byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(
        byteNumbers
      );

      const blob = new Blob(
        [byteArray],
        {
          type:
            note.fileType ||
            "application/octet-stream",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        note.fileName || "document";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      // Update download count
      const updatedNotes = notes.map(
        (item) =>
          item.id === note.id
            ? {
                ...item,
                downloads:
                  (item.downloads || 0) + 1,
              }
            : item
      );

      setNotes(updatedNotes);

      localStorage.setItem(
        "uploadedNotes",
        JSON.stringify(updatedNotes)
      );

      console.log(
        "DOWNLOAD SUCCESS:",
        note.fileName
      );
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert(
        "Unable to download file."
      );
    }
  };

  // ==============================
  // SEARCH NOTES
  // ==============================

  const filteredNotes = notes.filter(
    (note) => {
      const text =
        search.toLowerCase().trim();

      return (
        note.title
          ?.toLowerCase()
          .includes(text) ||
        note.description
          ?.toLowerCase()
          .includes(text) ||
        note.subject
          ?.toLowerCase()
          .includes(text) ||
        note.department
          ?.toLowerCase()
          .includes(text) ||
        note.semester
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

  // ==============================
  // STAT CARD
  // ==============================

  const StatCard = ({
    title,
    value,
    description,
    icon,
  }) => {
    return (
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          border:
            "1px solid #e5e7eb",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
              >
                {title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ mt: 1 }}
              >
                {value}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {description}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: 2,
                bgcolor: "#e8f4ff",
                color: "#0795e8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
      }}
    >
      {/* ==============================
          HEADER
      ============================== */}

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

      {/* ==============================
          MAIN
      ============================== */}

      <Container
        maxWidth="xl"
        sx={{ py: 4 }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
        >
          Student Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Manage, search and download
          your study notes.
        </Typography>

        {/* ==============================
            STATISTICS
        ============================== */}

        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <StatCard
              title="Total Uploaded Notes"
              value={notes.length}
              description="All documents"
              icon={
                <DescriptionIcon />
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <StatCard
              title="Downloads"
              value={notes.reduce(
                (total, note) =>
                  total +
                  (note.downloads || 0),
                0
              )}
              description="Total downloads"
              icon={
                <DownloadIcon />
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <StatCard
              title="View Notes"
              value={notes.length}
              description="Available notes"
              icon={
                <VisibilityIcon />
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
          >
            <StatCard
              title="Recent Uploads"
              value={Math.min(
                notes.length,
                5
              )}
              description="Recently added"
              icon={
                <AccessTimeIcon />
              }
            />
          </Grid>
        </Grid>

        {/* ==============================
            SEARCH
        ============================== */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 3,
            border:
              "1px solid #e5e7eb",
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search notes..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={
                  <CloudUploadIcon />
                }
                onClick={handleOpenUpload}
                sx={{
                  height: 56,
                  bgcolor: "#0795e8",
                  textTransform:
                    "none",
                  fontWeight: 700,
                }}
              >
                Add New Document
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* ==============================
            NOTES
        ============================== */}

        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
            >
              Recent Notes
            </Typography>

            <Chip
              label={`${filteredNotes.length} Notes`}
              color="primary"
            />
          </Box>

          {filteredNotes.length === 0 ? (
            <Paper
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <DescriptionIcon
                sx={{
                  fontSize: 60,
                  color: "text.secondary",
                }}
              />

              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                No notes found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Upload your first document.
              </Typography>
            </Paper>
          ) : (
            <Grid
              container
              spacing={3}
            >
              {filteredNotes.map(
                (note) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={note.id}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        border:
                          "1px solid #e5e7eb",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems:
                              "center",
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              bgcolor:
                                "#e8f4ff",
                              borderRadius: 2,
                              display: "flex",
                              justifyContent:
                                "center",
                              alignItems:
                                "center",
                              mr: 2,
                            }}
                          >
                            <MenuBookIcon
                              sx={{
                                color:
                                  "#0795e8",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              fontWeight={800}
                              noWrap
                            >
                              {note.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {note.fileName}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            minHeight: 45,
                            mb: 2,
                          }}
                        >
                          {note.description}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                          sx={{
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label={
                              note.department
                            }
                          />

                          <Chip
                            size="small"
                            label={
                              note.semester
                            }
                          />

                          <Chip
                            size="small"
                            label={
                              note.subject
                            }
                          />
                        </Stack>

                        <Divider
                          sx={{ mb: 2 }}
                        />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Uploaded:{" "}
                          {note.date
                            ? new Date(
                                note.date
                              ).toLocaleDateString()
                            : "N/A"}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 2 }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={
                              <VisibilityIcon />
                            }
                            onClick={() =>
                              setSelectedNote(
                                note
                              )
                            }
                            sx={{
                              textTransform:
                                "none",
                            }}
                          >
                            View
                          </Button>

                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={
                              <DownloadIcon />
                            }
                            onClick={() =>
                              handleDownload(
                                note
                              )
                            }
                            sx={{
                              bgcolor:
                                "#0795e8",
                              textTransform:
                                "none",
                            }}
                          >
                            Download
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Box>
      </Container>

      {/* ==============================
          UPLOAD DIALOG
      ============================== */}

      <Dialog
        open={openUpload}
        onClose={handleCloseUpload}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            fontWeight: 800,
          }}
        >
          Upload New Document

          <IconButton
            onClick={handleCloseUpload}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <Grid
            container
            spacing={2}
          >
            {/* TITLE */}

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Note Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            {/* DESCRIPTION */}

            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
              />
            </Grid>

            {/* DEPARTMENT */}

            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={
                  formData.department
                }
                onChange={handleChange}
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
              item
              xs={12}
              md={4}
            >
              <TextField
                select
                fullWidth
                label="Semester"
                name="semester"
                value={
                  formData.semester
                }
                onChange={handleChange}
              >
                <MenuItem value="Semester 1">
                  Semester 1
                </MenuItem>

                <MenuItem value="Semester 2">
                  Semester 2
                </MenuItem>

                <MenuItem value="Semester 3">
                  Semester 3
                </MenuItem>

                <MenuItem value="Semester 4">
                  Semester 4
                </MenuItem>

                <MenuItem value="Semester 5">
                  Semester 5
                </MenuItem>

                <MenuItem value="Semester 6">
                  Semester 6
                </MenuItem>
              </TextField>
            </Grid>

            {/* SUBJECT */}

            <Grid
              item
              xs={12}
              md={4}
            >
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Grid>

            {/* FILE */}

            <Grid
              item
              xs={12}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderStyle:
                    "dashed",
                  borderWidth: 2,
                  borderColor:
                    "#0795e8",
                }}
              >
                <FolderIcon
                  sx={{
                    fontSize: 45,
                    color: "#0795e8",
                  }}
                />

                <Typography
                  fontWeight={700}
                >
                  Select Notes File
                </Typography>

                <Button
                  component="label"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    textTransform:
                      "none",
                  }}
                >
                  Choose File

                  <input
                    hidden
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={
                      handleFileChange
                    }
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
                      Size:{" "}
                      {(
                        formData.file.size /
                        1024
                      ).toFixed(2)}{" "}
                      KB
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseUpload}
            sx={{
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={
              <CloudUploadIcon />
            }
            onClick={handleUpload}
            sx={{
              bgcolor: "#0795e8",
              textTransform: "none",
            }}
          >
            Upload Document
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==============================
          VIEW DIALOG
      ============================== */}

      <Dialog
        open={Boolean(selectedNote)}
        onClose={() =>
          setSelectedNote(null)
        }
        fullWidth
        maxWidth="sm"
      >
        {selectedNote && (
          <>
            <DialogTitle
              sx={{ fontWeight: 800 }}
            >
              {selectedNote.title}
            </DialogTitle>

            <DialogContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Description"
                    secondary={
                      selectedNote.description
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Department"
                    secondary={
                      selectedNote.department
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <MenuBookIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Semester"
                    secondary={
                      selectedNote.semester
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <MenuBookIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Subject"
                    secondary={
                      selectedNote.subject
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <FolderIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="File"
                    secondary={
                      selectedNote.fileName
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <DownloadIcon color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Downloads"
                    secondary={
                      selectedNote.downloads ||
                      0
                    }
                  />
                </ListItem>
              </List>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() =>
                  setSelectedNote(null)
                }
              >
                Close
              </Button>

              <Button
                variant="contained"
                startIcon={
                  <DownloadIcon />
                }
                onClick={() =>
                  handleDownload(
                    selectedNote
                  )
                }
                sx={{
                  bgcolor: "#0795e8",
                }}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Upload;

