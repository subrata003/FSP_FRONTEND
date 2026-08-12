import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
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

    alert(
      "Document uploaded successfully!"
    );

  } catch (error) {

    console.error(
      "Upload error:",
      error
    );

    alert(
      error.message ||
      "Unable to upload document."
    );
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
        bgcolor: "#f5f7fb",
      }}
    >
      {/* HEADER */}

      <Header
        onUpload={handleOpenUpload}
      />

      {/* MAIN */}

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        {/* PAGE TITLE */}

        <Typography
          variant="h4"
          fontWeight={800}
        >
          Student Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Manage, search and download
          your study notes.
        </Typography>

        {/* ==================================
            STATISTICS
        ================================== */}

        <Grid
          container
          spacing={3}
          sx={{
            mt: 1,
          }}
        >
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
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
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <StatCard
              title="Downloads"
              value={totalDownloads}
              description="Total downloads"
              icon={
                <DownloadIcon />
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
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
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
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

        {/* ==================================
            SEARCH
        ================================== */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          onUpload={handleOpenUpload}
        />

        {/* ==================================
            NOTES
        ================================== */}

        <Box
          sx={{
            mt: 4,
          }}
        >
          {/* NOTES HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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

          {/* NO NOTES */}

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
                sx={{
                  mt: 2,
                }}
              >
                No notes found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Upload your first document.
              </Typography>
            </Paper>
          ) : (
            /* NOTES GRID */

            <Grid
              container
              spacing={3}
            >
              {filteredNotes.map(
                (note) => (
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
                      onDownload={
                        handleDownload
                      }
                    />
                  </Grid>
                )
              )}
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
        onClose={() =>
          setSelectedNote(null)
        }
        onDownload={handleDownload}
      />
    </Box>
  );
};

export default Upload;
