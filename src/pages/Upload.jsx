import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import UploadDialog from "../components/UploadDialog";
import ViewNoteDialog from "../components/ViewNoteDialog";

// import {
//   getNotes,
//   saveNotes,
// } from "../services/noteService";

const Upload = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [openUpload, setOpenUpload] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    branch: "",
    semester: "",
    subject: "",
    file: null,
  });

  // ==========================================
  // LOAD NOTES
  // ==========================================

  useEffect(() => {
    try {
      const savedNotes = getNotes();

      setNotes(Array.isArray(savedNotes) ? savedNotes : []);
    } catch (error) {
      console.error("Error loading notes:", error);
      setNotes([]);
    }
  }, []);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      file,
    }));
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      branch: "",
      semester: "",
      subject: "",
      file: null,
    });
  };

  // ==========================================
  // UPLOAD NOTE
  // ==========================================




  const handleUpload = async () => {

    // ============================
    // VALIDATION
    // ============================

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.branch ||
      !formData.semester ||
      !formData.subject.trim() ||
      !formData.file
    ) {
      alert("Please fill all fields and select a PDF file.");
      return;
    }

    // ============================
    // PDF CHECK
    // ============================

    if (formData.file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    try {

      // ============================
      // CREATE FORMDATA
      // ============================

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "subject",
        formData.subject.trim()
      );

      data.append(
        "semester",
        String(formData.semester)
      );

      data.append(
        "branch",
        formData.branch
      );

      data.append(
        "file",
        formData.file
      );

      // ============================
      // DEBUG
      // ============================

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      // ============================
      // GET JWT TOKEN
      // ============================

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) {
        alert("Please login again.");
        return;
      }

      // ============================
      // API CALL
      // ============================

      const response = await fetch(
        "http://localhost:8080/api/notes/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );

      // ============================
      // RESPONSE
      // ============================

      const responseText = await response.text();

      console.log(
        "Status:",
        response.status
      );

      console.log(
        "Response:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} - ${responseText}`
        );
      }

      // ============================
      // SUCCESS
      // ============================

      const savedNote = JSON.parse(responseText);

      console.log(
        "Saved Note:",
        savedNote
      );

      // Add uploaded note to UI
      setNotes((previousNotes) => [
        savedNote,
        ...previousNotes,
      ]);

      // Reset
      resetForm();

      setOpenUpload(false);

      setSnackbar({
        open: true,
        message: "Document uploaded successfully!",
        severity: "success",
      });

    } catch (error) {

      console.error(
        "Upload error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.message ||
          "Unable to upload document.",
        severity: "error",
      });
    }
  };





  // ==========================================
  // DOWNLOAD NOTE
  // ==========================================

  const handleDownload = (note) => {
    if (!note?.fileData) {
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

      // UPDATE DOWNLOAD COUNT

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

      saveNotes(updatedNotes);
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert("Unable to download file.");
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const searchText =
    search.toLowerCase().trim();

  const filteredNotes = notes.filter(
    (note) => {
      return (
        note.title
          ?.toLowerCase()
          .includes(searchText) ||

        note.description
          ?.toLowerCase()
          .includes(searchText) ||

        note.subject
          ?.toLowerCase()
          .includes(searchText) ||

        note.branch
          ?.toLowerCase()
          .includes(searchText) ||

        note.semester
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ==========================================
  // TOTAL DOWNLOADS
  // ==========================================

  const totalDownloads =
    notes.reduce(
      (total, note) =>
        total + (note.downloads || 0),
      0
    );

  // ==========================================
  // OPEN UPLOAD
  // ==========================================

  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  // ==========================================
  // CLOSE UPLOAD
  // ==========================================

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
      }}
    >
      {/* HEADER */}
      <Header onUpload={handleOpenUpload} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          severity={snackbar.severity}
          variant="filled"
          elevation={6}
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* MAIN */}
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* ==================================
          WELCOME / PAGE HEADER
      ================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            color: "#fff",
            background:
              "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              right: -60,
              top: -80,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              right: 120,
              bottom: -80,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  md: "2.2rem",
                },
              }}
            >
              Welcome Back 👋
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.85)",
                fontSize: "1rem",
              }}
            >
              Manage, search and download your
              study notes from one place.
            </Typography>

            <Button
              variant="contained"
              onClick={handleOpenUpload}
              startIcon={<CloudUploadIcon />}
              sx={{
                mt: 3,
                bgcolor: "#fff",
                color: "#2563eb",
                px: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#f8fafc",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              Upload New Note
            </Button>
          </Box>
        </Paper>

        <Box sx={{ mt: 4 }}>

          {/* SECTION HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  color: "#172033",
                }}
              >
                Recent Notes
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Your recently uploaded study materials
              </Typography>
            </Box>

            <Chip
              label={`${filteredNotes.length} Notes`}
              sx={{
                fontWeight: 700,
                bgcolor: "#e8f1ff",
                color: "#2563eb",
                borderRadius: 2,
                px: 1,
              }}
            />
          </Box>

          {/* ==================================
            EMPTY STATE
        ================================== */}

          {filteredNotes.length === 0 ? (

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 4,
                  md: 7,
                },
                textAlign: "center",
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  borderRadius: "50%",
                  bgcolor: "#e8f1ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon
                  sx={{
                    fontSize: 42,
                    color: "#2563eb",
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ mt: 3 }}
              >
                No notes found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  maxWidth: 450,
                  mx: "auto",
                }}
              >
                You haven't uploaded any notes yet.
                Start building your study library by
                uploading your first document.
              </Typography>

              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleOpenUpload}
                sx={{
                  mt: 3,
                  bgcolor: "#2563eb",
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,

                  "&:hover": {
                    bgcolor: "#1d4ed8",
                  },
                }}
              >
                Upload Your First Note
              </Button>
            </Paper>

          ) : (

            /* ==================================
                NOTES GRID
            ================================== */

            <Grid
              container
              spacing={3}
            >
              {filteredNotes.map((note) => (
                <Grid
                  key={note.id}
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4,
                  }}
                >
                  <NoteCard
                    note={note}
                    onView={setSelectedNote}
                    onDownload={handleDownload}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>

      {/* ==================================
        UPLOAD DIALOG
    ================================== */}

      <UploadDialog
        open={openUpload}
        onClose={handleCloseUpload}
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
      />

      {/* ==================================
        VIEW NOTE DIALOG
    ================================== */}

      <ViewNoteDialog
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onDownload={handleDownload}
      />
    </Box>
  );
};

export default Upload;
