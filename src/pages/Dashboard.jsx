import React, { useMemo, useState, useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // =====================================================
  // DUMMY DATA
  // =====================================================



  // =====================================================
  // STATES
  // =====================================================

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [branch, setBranch] = useState("");

  const [semester, setSemester] = useState("");

  const [bookmarked, setBookmarked] = useState([]);

  // =====================================================
  // ONLY APPROVED NOTES
  // =====================================================

  const navigate = useNavigate();
  const loadNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/notes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load notes: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Approved Notes API Response:", data);

      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadNotes();
  }, []);

  const approvedNotes = useMemo(() => {
    return notes.filter(
      (note) => note.status === "APPROVED"
    );
  }, [notes]);

  // =====================================================
  // FILTER NOTES
  // =====================================================

  const filteredNotes = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return approvedNotes.filter((note) => {
      const searchMatch =
        !searchText ||
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
        note.uploadedBy?.name
          ?.toLowerCase()
          .includes(searchText);

      const branchMatch =
        branch === "" ||
        note.branch === branch;

      const semesterMatch =
        semester === "" ||
        String(note.semester) ===
        String(semester);

      return (
        searchMatch &&
        branchMatch &&
        semesterMatch
      );
    });
  }, [
    approvedNotes,
    search,
    branch,
    semester,
  ]);

  // =====================================================
  // TOTAL DOWNLOADS
  // =====================================================

  const totalDownloads = useMemo(() => {
    return approvedNotes.reduce(
      (total, note) =>
        total +
        Number(note.downloads || 0),
      0
    );
  }, [approvedNotes]);

  // =====================================================
  // ACTIVE CONTRIBUTORS
  // =====================================================

  const activeContributors = useMemo(() => {
    return new Set(
      approvedNotes
        .map(
          (note) =>
            note.uploadedBy?.id
        )
        .filter(Boolean)
    ).size;
  }, [approvedNotes]);

  // =====================================================
  // POPULAR NOTES
  // =====================================================

  const popularNotes = useMemo(() => {
    return [...approvedNotes]
      .sort(
        (a, b) =>
          Number(b.downloads || 0) -
          Number(a.downloads || 0)
      )
      .slice(0, 3);
  }, [approvedNotes]);

  // =====================================================
  // BOOKMARK
  // =====================================================

  const toggleBookmark = (id) => {
    setBookmarked((previous) => {
      if (previous.includes(id)) {
        return previous.filter(
          (item) => item !== id
        );
      }

      return [...previous, id];
    });
  };

  // =====================================================
  // VIEW PDF
  // =====================================================

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

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  const handleDownload = async (
    note
  ) => {
    if (!note?.id) {
      alert("Invalid note.");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

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

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        note.pdfName ||
        "note.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(
        url
      );

      // Update download count
      setNotes((previousNotes) =>
        previousNotes.map(
          (item) =>
            item.id === note.id
              ? {
                ...item,
                downloads:
                  Number(
                    item.downloads || 0
                  ) + 1,
              }
              : item
        )
      );
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert(
        "Unable to download note."
      );
    }
  };

  // =====================================================
  // CLEAR FILTER
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setBranch("");
    setSemester("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#f7faff 0%,#eef4fb 100%)",
        py: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* =================================================
            HERO
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 5,
            mb: 4,
            color: "white",
            background:
              "linear-gradient(135deg,#0f4c81,#087fba)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "rgba(255,255,255,.07)",
              right: -90,
              top: -120,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Discover & Share Notes 📚
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
                maxWidth: 700,
              }}
            >
              Find quality study materials
              shared by students, discover
              popular notes and download
              resources for your semester.
            </Typography>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => navigate("/student/upload")}
              sx={{
                mt: 3,
                bgcolor: "white",
                color: "#075985",
                fontWeight: 700,
                px: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
              }}
            >
              Share Your Notes
            </Button>
          </Box>
        </Paper>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >
          {[
            {
              title: "Approved Notes",
              value: approvedNotes.length,
              icon: (
                <DescriptionIcon />
              ),
            },
            {
              title: "Total Downloads",
              value: totalDownloads,
              icon: (
                <DownloadIcon />
              ),
            },
            {
              title: "Contributors",
              value: activeContributors,
              icon: <PersonIcon />,
            },
            {
              title: "My Bookmarks",
              value: bookmarked.length,
              icon: <BookmarkIcon />,
            },
          ].map((stat) => (
            <Grid
              key={stat.title}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border:
                    "1px solid #e2e8f0",
                  transition:
                    "all .25s",

                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    boxShadow:
                      "0 12px 30px rgba(15,76,129,.12)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        color="text.secondary"
                        fontWeight={600}
                      >
                        {stat.title}
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                          mt: 1,
                          color: "#0f4c81",
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        bgcolor:
                          "#e0f2fe",
                        color:
                          "#0284c7",
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 4,
            border:
              "1px solid #e2e8f0",
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search notes, subjects, students..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

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
                onChange={(e) =>
                  setBranch(
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  setSemester(
                    e.target.value
                  )
                }
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
                  borderRadius: 2,
                  textTransform:
                    "none",
                  fontWeight: 700,
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* =================================================
            POPULAR NOTES
        ================================================= */}

        {popularNotes.length > 0 && (
          <Box sx={{ mb: 6 }}>
            {/* SECTION HEADER */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg,#fff7ed,#ffedd5)",
                    }}
                  >
                    <TrendingUpIcon
                      sx={{
                        color: "#f97316",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      color: "#172033",
                    }}
                  >
                    Popular Notes
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.8, ml: 0.5 }}
                >
                  Most downloaded notes from the student
                  community
                </Typography>
              </Box>

              <Chip
                label="Trending Now"
                size="small"
                sx={{
                  fontWeight: 700,
                  color: "#c2410c",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 2,
                }}
              />
            </Stack>

            {/* POPULAR CARDS */}
            <Grid container spacing={3}>
              {popularNotes.map((note, index) => (
                <Grid
                  key={note.id}
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      background:
                        "linear-gradient(145deg,#ffffff 0%,#f8fbff 100%)",
                      transition:
                        "all .3s ease",

                      "&:hover": {
                        transform:
                          "translateY(-7px)",
                        boxShadow:
                          "0 18px 40px rgba(15,76,129,0.13)",
                        borderColor:
                          "#bae6fd",
                      },
                    }}
                  >
                    {/* TOP ACCENT */}
                    <Box
                      sx={{
                        height: 5,
                        width: "100%",
                        background:
                          index === 0
                            ? "linear-gradient(90deg,#f59e0b,#f97316)"
                            : "linear-gradient(90deg,#0ea5e9,#2563eb)",
                      }}
                    />

                    <CardContent
                      sx={{
                        p: 3,
                      }}
                    >
                      {/* RANK + ICON */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              background:
                                index === 0
                                  ? "linear-gradient(135deg,#fff7ed,#fed7aa)"
                                  : "linear-gradient(135deg,#e0f2fe,#dbeafe)",
                              color:
                                index === 0
                                  ? "#ea580c"
                                  : "#0369a1",
                            }}
                          >
                            <MenuBookIcon />
                          </Avatar>

                          <Box>
                            <Typography
                              variant="caption"
                              fontWeight={800}
                              sx={{
                                color:
                                  index === 0
                                    ? "#ea580c"
                                    : "#64748b",
                              }}
                            >
                              #{index + 1} TRENDING
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Study Material
                            </Typography>
                          </Box>
                        </Box>

                        {/* DOWNLOAD COUNT */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            px: 1,
                            py: 0.6,
                            borderRadius: 2,
                            backgroundColor:
                              "#f8fafc",
                          }}
                        >
                          <DownloadIcon
                            sx={{
                              fontSize: 17,
                              color: "#64748b",
                            }}
                          />

                          <Typography
                            variant="caption"
                            fontWeight={700}
                          >
                            {note.downloads}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* TITLE */}
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          mt: 2.5,
                          color: "#172033",
                        }}
                        noWrap
                      >
                        {note.title}
                      </Typography>

                      {/* SUBJECT */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          minHeight: 20,
                        }}
                      >
                        {note.subject}
                      </Typography>

                      {/* TAGS */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mt: 2,
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        <Chip
                          size="small"
                          label={note.branch}
                          sx={{
                            fontWeight: 700,
                            color: "#0369a1",
                            backgroundColor:
                              "#e0f2fe",
                            borderRadius: 1.5,
                          }}
                        />

                        <Chip
                          size="small"
                          label={`Semester ${note.semester}`}
                          sx={{
                            fontWeight: 600,
                            color: "#475569",
                            backgroundColor:
                              "#f1f5f9",
                            borderRadius: 1.5,
                          }}
                        />
                      </Stack>

                      <Divider
                        sx={{
                          my: 2.5,
                        }}
                      />

                      {/* UPLOADER */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.2}
                      >
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            fontSize: 14,
                            fontWeight: 800,
                            bgcolor: "#0f4c81",
                          }}
                        >
                          {note.uploadedBy?.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </Avatar>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            noWrap
                          >
                            {note.uploadedBy?.name ||
                              "Student"}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Student contributor
                          </Typography>
                        </Box>
                      </Stack>

                      {/* VIEW BUTTON */}
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={
                          <VisibilityIcon />
                        }
                        onClick={() =>
                          handleView(note)
                        }
                        sx={{
                          mt: 3,
                          py: 1.2,
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 800,
                          background:
                            "linear-gradient(135deg,#0f4c81,#087fba)",
                          boxShadow:
                            "0 6px 15px rgba(8,127,186,.2)",

                          "&:hover": {
                            background:
                              "linear-gradient(135deg,#075985,#0369a1)",
                            boxShadow:
                              "0 10px 22px rgba(8,127,186,.3)",
                          },
                        }}
                      >
                        View Note
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* =================================================
            LATEST NOTES HEADER
        ================================================= */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
            >
              Latest Notes
            </Typography>

            <Typography
              color="text.secondary"
            >
              Notes shared by the
              student community
            </Typography>
          </Box>

          <Chip
            color="primary"
            label={`${filteredNotes.length} Notes`}
            sx={{
              mt: {
                xs: 1,
                sm: 0,
              },
              fontWeight: 700,
            }}
          />
        </Stack>

        {/* =================================================
            NOTES
        ================================================= */}

        {filteredNotes.length > 0 ? (
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
                    sm: 6,
                    lg: 4,
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border:
                        "1px solid #e2e8f0",
                      transition:
                        "all .25s",

                      "&:hover": {
                        transform:
                          "translateY(-6px)",
                        boxShadow:
                          "0 15px 35px rgba(15,76,129,.12)",
                        borderColor:
                          "#bae6fd",
                      },
                    }}
                  >
                    <CardContent
                      sx={{ p: 3 }}
                    >
                      {/* CARD TOP */}

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              "#e0f2fe",
                            color:
                              "#0369a1",
                          }}
                        >
                          <DescriptionIcon />
                        </Avatar>

                        <IconButton
                          onClick={() =>
                            toggleBookmark(
                              note.id
                            )
                          }
                          sx={{
                            color:
                              bookmarked.includes(
                                note.id
                              )
                                ? "#f59e0b"
                                : "#94a3b8",
                          }}
                        >
                          {bookmarked.includes(
                            note.id
                          ) ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
                        </IconButton>
                      </Stack>

                      {/* TITLE */}

                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ mt: 2 }}
                        noWrap
                      >
                        {note.title}
                      </Typography>

                      {/* DESCRIPTION */}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          minHeight: 42,
                        }}
                      >
                        {
                          note.description
                        }
                      </Typography>

                      {/* TAGS */}

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mt: 2,
                          flexWrap:
                            "wrap",
                          gap: 1,
                        }}
                      >
                        <Chip
                          size="small"
                          icon={
                            <SchoolIcon />
                          }
                          label={
                            note.branch
                          }
                        />

                        <Chip
                          size="small"
                          label={`Sem ${note.semester}`}
                        />

                        <Chip
                          size="small"
                          label={
                            note.subject
                          }
                        />
                      </Stack>

                      <Divider
                        sx={{ my: 2 }}
                      />

                      {/* UPLOADER */}

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                      >
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            bgcolor:
                              "#0f4c81",
                            fontSize: 14,
                          }}
                        >
                          {note.uploadedBy?.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </Avatar>

                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                          >
                            {
                              note
                                .uploadedBy
                                ?.name
                            }
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Student
                            contributor
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            ml: "auto",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 0.5,
                          }}
                        >
                          <DownloadIcon
                            sx={{
                              fontSize: 16,
                              color:
                                "#64748b",
                            }}
                          />

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {
                              note.downloads
                            }
                          </Typography>
                        </Box>
                      </Stack>

                      {/* ACTIONS */}

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 3 }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={
                            <VisibilityIcon />
                          }
                          onClick={() =>
                            handleView(
                              note
                            )
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform:
                              "none",
                            fontWeight: 700,
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
                            borderRadius: 2,
                            textTransform:
                              "none",
                            fontWeight: 700,
                            bgcolor:
                              "#087fba",
                            "&:hover": {
                              bgcolor:
                                "#075985",
                            },
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
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <Paper
            elevation={0}
            sx={{
              mt: 4,
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              border:
                "1px solid #e2e8f0",
            }}
          >
            <DescriptionIcon
              sx={{
                fontSize: 60,
                color: "#94a3b8",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mt: 1 }}
            >
              No notes found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Try changing your search
              or filters.
            </Typography>

            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{
                mt: 2,
                textTransform:
                  "none",
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

export default Dashboard;