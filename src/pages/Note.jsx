
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";

const Note = () => {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");


  //GET ALL UPLOADED NOTES


  useEffect(() => {
    loadNotes();

    window.addEventListener(
      "storage",
      loadNotes
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadNotes
      );
    };
  }, []);
  // api callll this filed
  const loadNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/notes/my-notes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load notes: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("My Notes API Response:", data);

      // API returns:
      // {
      //   id,
      //   name,
      //   email,
      //   role,
      //   notes: [...]
      // }

      setNotes(
        Array.isArray(data.notes)
          ? data.notes
          : []
      );

    } catch (error) {
      console.error(
        "Error loading notes:",
        error
      );

      setNotes([]);
    }
  };
  useEffect(() => {
    loadNotes();
  }, []);

  // FILTER NOTES

  const filteredNotes = notes.filter((note) => {
    const text = search.toLowerCase().trim();

    const searchMatch =
      note.title?.toLowerCase().includes(text) ||
      note.description?.toLowerCase().includes(text) ||
      note.subject?.toLowerCase().includes(text) ||
      note.branch?.toLowerCase().includes(text) ||
      String(note.semester)
        .toLowerCase()
        .includes(text) ||
      note.pdfName?.toLowerCase().includes(text);

    const branchMatch =
      branch === "" ||
      note.branch === branch;

    const semesterMatch =
      semester === "" ||
      String(note.semester) === String(semester);

    return (
      searchMatch &&
      branchMatch &&
      semesterMatch
    );
  });


  // VIEW FILE


  const handleView = async (note) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/notes/file/${note.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load PDF: ${response.status}`
        );
      }

      const blob = await response.blob();

      const pdfUrl = URL.createObjectURL(blob);

      window.open(pdfUrl, "_blank");

      // Don't revoke immediately because the new tab
      // still needs the URL.
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 60000);

    } catch (error) {
      console.error("View PDF error:", error);

      alert("Unable to open PDF.");
    }
  };


  // DOWNLOAD FILE

  const handleDownload = async (note) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/notes/${note.id}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Download failed: ${response.status}`
        );
      }

      // Convert response to Blob
      const blob = await response.blob();

      // Create temporary URL
      const url = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");

      link.href = url;

      link.download =
        note.pdfName || "document.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      // Clean URL
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download error:", error);

      alert("Unable to download document.");
    }
  };


  // CLEAR FILTER


  const clearFilters = () => {
    setSearch("");
    setBranch("");
    setSemester("");
  };

  // RETURN

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #F8FAFC 0%, #EEF4FF 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="xl">

        {/* =========================
          PAGE HEADER
      ========================= */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              color: "#0F172A",
              letterSpacing: "-1px",
              fontSize: {
                xs: "2rem",
                md: "2.5rem",
              },
            }}
          >
            Explore Notes 📚
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#64748B",
              fontSize: "1rem",
            }}
          >
            Search, view and download study materials
            shared by you.
          </Typography>
        </Box>

        {/* =========================
          STATISTICS
      ========================= */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          {/* TOTAL NOTES */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 8px 30px rgba(15, 23, 42, 0.05)",
                background: "#FFFFFF",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#64748B",
                        fontWeight: 600,
                      }}
                    >
                      Total Notes
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={900}
                      sx={{
                        mt: 1,
                        color: "#0F172A",
                      }}
                    >
                      {notes.length}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "#10B981",
                        fontWeight: 600,
                      }}
                    >
                      Available documents
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #2563EB, #3B82F6)",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,0.25)",
                    }}
                  >
                    <DescriptionIcon
                      sx={{
                        color: "#FFFFFF",
                        fontSize: 30,
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* SEARCH RESULT */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 8px 30px rgba(15, 23, 42, 0.05)",
                background: "#FFFFFF",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#64748B",
                        fontWeight: 600,
                      }}
                    >
                      Search Results
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={900}
                      sx={{
                        mt: 1,
                        color: "#0F172A",
                      }}
                    >
                      {filteredNotes.length}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "#7C3AED",
                        fontWeight: 600,
                      }}
                    >
                      Matching notes
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #7C3AED, #8B5CF6)",
                      boxShadow:
                        "0 8px 20px rgba(124,58,237,0.25)",
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "#FFFFFF",
                        fontSize: 30,
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* DOWNLOADS */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 8px 30px rgba(15, 23, 42, 0.05)",
                background: "#FFFFFF",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#64748B",
                        fontWeight: 600,
                      }}
                    >
                      Total Downloads
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight={900}
                      sx={{
                        mt: 1,
                        color: "#0F172A",
                      }}
                    >
                      {notes.reduce(
                        (total, note) =>
                          total +
                          (note.downloads || 0),
                        0
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: "#F59E0B",
                        fontWeight: 600,
                      }}
                    >
                      Resources downloaded
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #F59E0B, #F97316)",
                      boxShadow:
                        "0 8px 20px rgba(245,158,11,0.25)",
                    }}
                  >
                    <DownloadIcon
                      sx={{
                        color: "#FFFFFF",
                        fontSize: 30,
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* =========================
          SEARCH & FILTER
      ========================= */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: 5,
            borderRadius: 4,
            border: "1px solid #E2E8F0",
            background: "#FFFFFF",
            boxShadow:
              "0 10px 35px rgba(15, 23, 42, 0.05)",
          }}
        >
          <Typography
            fontWeight={800}
            sx={{
              mb: 2,
              color: "#0F172A",
            }}
          >
            Find Study Material
          </Typography>

          <Grid
            container
            spacing={2}
          >

            {/* SEARCH */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search title, subject, file..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "#2563EB",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#F8FAFC",
                    "&:hover fieldset": {
                      borderColor: "#2563EB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563EB",
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>

            {/* BRANCH */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                label="Branch"
                value={branch}
                onChange={(event) =>
                  setBranch(event.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#F8FAFC",
                  },
                }}
              >
                <MenuItem value="">
                  All Branches
                </MenuItem>

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
                sm: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                label="Semester"
                value={semester}
                onChange={(event) =>
                  setSemester(event.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#F8FAFC",
                  },
                }}
              >
                <MenuItem value="">
                  All Semesters
                </MenuItem>

                {[1, 2, 3, 4, 5, 6].map(
                  (sem) => (
                    <MenuItem
                      key={sem}
                      value={sem}
                    >
                      Semester {sem}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* CLEAR */}

            <Grid
              size={{
                xs: 12,
                md: 2,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  height: 56,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#CBD5E1",
                  color: "#475569",

                  "&:hover": {
                    borderColor: "#2563EB",
                    color: "#2563EB",
                    background: "#EFF6FF",
                  },
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* =========================
          DOCUMENT HEADER
      ========================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={900}
              sx={{
                color: "#0F172A",
              }}
            >
              All Documents
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color: "#64748B",
              }}
            >
              Browse available study materials
            </Typography>
          </Box>

          <Chip
            label={`${filteredNotes.length} Notes`}
            sx={{
              fontWeight: 700,
              color: "#1D4ED8",
              background: "#DBEAFE",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* =========================
          NOTE CARDS
      ========================= */}

        <Grid
          container
          spacing={3}
        >
          {filteredNotes.map((note) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
              }}
              key={note.id}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #E2E8F0",
                  background: "#FFFFFF",
                  boxShadow:
                    "0 5px 20px rgba(15,23,42,0.04)",
                  transition:
                    "all 0.25s ease",

                  "&:hover": {
                    transform:
                      "translateY(-6px)",
                    boxShadow:
                      "0 18px 40px rgba(15,23,42,0.10)",
                    borderColor:
                      "#BFDBFE",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>

                  {/* ICON + TITLE */}

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2.5 }}
                  >
                    <Box
                      sx={{
                        width: 54,
                        height: 54,
                        flexShrink: 0,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, #DBEAFE, #EDE9FE)",
                      }}
                    >
                      <MenuBookIcon
                        sx={{
                          fontSize: 28,
                          color: "#2563EB",
                        }}
                      />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        fontWeight={900}
                        noWrap
                        sx={{
                          color: "#0F172A",
                          fontSize: "1.05rem",
                        }}
                      >
                        {note.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          color: "#64748B",
                          mt: 0.3,
                        }}
                      >
                        {note.pdfName}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* DESCRIPTION */}

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      lineHeight: 1.7,
                      minHeight: 48,
                      mb: 2.5,
                    }}
                  >
                    {note.description}
                  </Typography>

                  {/* TAGS */}

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2.5 }}
                  >
                    <Chip
                      size="small"
                      icon={<SchoolIcon />}
                      label={note.branch}
                      sx={{
                        background: "#EFF6FF",
                        color: "#1D4ED8",
                        fontWeight: 700,
                        "& .MuiChip-icon": {
                          color: "#2563EB",
                        },
                      }}
                    />

                    <Chip
                      size="small"
                      label={`Semester ${note.semester}`}
                      sx={{
                        background: "#F5F3FF",
                        color: "#6D28D9",
                        fontWeight: 700,
                      }}
                    />

                    <Chip
                      size="small"
                      label={note.subject}
                      sx={{
                        background: "#ECFDF5",
                        color: "#047857",
                        fontWeight: 700,
                      }}
                    />
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  {/* META */}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 2.5 }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#94A3B8",
                          display: "block",
                        }}
                      >
                        Downloads
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight={800}
                        sx={{
                          color: "#334155",
                        }}
                      >
                        {note.downloads || 0}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#94A3B8",
                          display: "block",
                        }}
                      >
                        Status
                      </Typography>

                      <Chip
                        size="small"
                        label={note.status || "AVAILABLE"}
                        sx={{
                          mt: 0.3,
                          height: 24,
                          fontWeight: 700,
                          background:
                            note.status === "PENDING"
                              ? "#FEF3C7"
                              : "#DCFCE7",
                          color:
                            note.status === "PENDING"
                              ? "#92400E"
                              : "#166534",
                        }}
                      />
                    </Box>
                  </Stack>

                  {/* BUTTONS */}

                  <Stack
                    direction="row"
                    spacing={1.5}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={
                        <VisibilityIcon />
                      }
                      onClick={() =>
                        handleView(note)
                      }
                      sx={{
                        height: 44,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 700,
                        borderColor: "#CBD5E1",
                        color: "#334155",

                        "&:hover": {
                          borderColor: "#2563EB",
                          color: "#2563EB",
                          background: "#EFF6FF",
                        },
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
                        handleDownload(note)
                      }
                      sx={{
                        height: 44,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg, #2563EB, #4F46E5)",
                        boxShadow:
                          "0 6px 15px rgba(37,99,235,0.25)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #1D4ED8, #4338CA)",
                          boxShadow:
                            "0 8px 20px rgba(37,99,235,0.35)",
                        },
                      }}
                    >
                      Download
                    </Button>
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* =========================
          EMPTY STATE
      ========================= */}

        {filteredNotes.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 7 },
              mt: 3,
              textAlign: "center",
              borderRadius: 4,
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#EFF6FF",
              }}
            >
              <FolderIcon
                sx={{
                  fontSize: 42,
                  color: "#2563EB",
                }}
              />
            </Box>

            <Typography
              variant="h6"
              fontWeight={900}
              sx={{
                color: "#0F172A",
              }}
            >
              No documents found
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#64748B",
              }}
            >
              Try changing your search or filters.
            </Typography>

            <Button
              variant="contained"
              onClick={clearFilters}
              sx={{
                mt: 3,
                borderRadius: 2.5,
                px: 3,
                textTransform: "none",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #2563EB, #4F46E5)",
              }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}

      </Container>
    </Box>
  );
};

export default Note;

