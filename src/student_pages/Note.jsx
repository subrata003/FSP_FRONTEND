
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

  const [department, setDepartment] =
    useState("");

  const [semester, setSemester] =
    useState("");

  
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
  const loadNotes = () => {
    const savedNotes =
      localStorage.getItem(
        "uploadedNotes"
      );

    if (savedNotes) {
      try {
        setNotes(
          JSON.parse(savedNotes)
        );
      } catch (error) {
        console.error(
          "Error loading notes:",
          error
        );
      }
    } else {
      setNotes([]);
    }
  };

 
  // FILTER NOTES
 

  const filteredNotes = notes.filter(
    (note) => {
      const text =
        search.toLowerCase();

      const searchMatch =
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
          .includes(text) ||
        note.fileName
          ?.toLowerCase()
          .includes(text);

      const departmentMatch =
        department === "" ||
        note.department ===
          department;

      const semesterMatch =
        semester === "" ||
        note.semester === semester;

      return (
        searchMatch &&
        departmentMatch &&
        semesterMatch
      );
    }
  );

  
  // VIEW FILE
  

  const handleView = (note) => {
    if (!note.fileData) {
      alert(
        "File preview is not available."
      );
      return;
    }

    try {
      const byteCharacters =
        atob(note.fileData);

      const byteNumbers =
        new Array(
          byteCharacters.length
        );

      for (
        let i = 0;
        i <
        byteCharacters.length;
        i++
      ) {
        byteNumbers[i] =
          byteCharacters.charCodeAt(
            i
          );
      }

      const byteArray =
        new Uint8Array(
          byteNumbers
        );

      const blob = new Blob(
        [byteArray],
        {
          type:
            note.fileType ||
            "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(
          blob
        );

      window.open(
        url,
        "_blank"
      );
    } catch (error) {
      console.error(
        "View error:",
        error
      );

      alert(
        "Unable to open document."
      );
    }
  };

 
  // DOWNLOAD FILE
 
  const handleDownload = (
    note
  ) => {
    if (!note.fileData) {
      alert(
        "File is not available."
      );
      return;
    }

    try {
      const byteCharacters =
        atob(note.fileData);

      const byteNumbers =
        new Array(
          byteCharacters.length
        );

      for (
        let i = 0;
        i <
        byteCharacters.length;
        i++
      ) {
        byteNumbers[i] =
          byteCharacters.charCodeAt(
            i
          );
      }

      const byteArray =
        new Uint8Array(
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
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        note.fileName ||
        "document";

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(url);

      // Update download count
      const updatedNotes =
        notes.map((item) =>
          item.id === note.id
            ? {
                ...item,
                downloads:
                  (item.downloads ||
                    0) + 1,
              }
            : item
        );

      setNotes(updatedNotes);

      localStorage.setItem(
        "uploadedNotes",
        JSON.stringify(
          updatedNotes
        )
      );
    } catch (error) {
      console.error(
        "Download error:",
        error
      );

      alert(
        "Unable to download document."
      );
    }
  };


  // CLEAR FILTER


  const clearFilters = () => {
    setSearch("");
    setDepartment("");
    setSemester("");
  };

  // RETURN

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        py: 4,
      }}
    >
      <Container maxWidth="xl">

        {/* HEADER */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "#172033",
            }}
          >
            Notes
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            All uploaded study
            documents
          </Typography>
        </Box>

        {/* STAT */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                borderRadius: 3,
                border:
                  "1px solid #e5e7eb",
                boxShadow: "none",
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
                      Total Uploaded
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ mt: 1 }}
                    >
                      {notes.length}
                    </Typography>
                  </Box>

                  <DescriptionIcon
                    sx={{
                      fontSize: 45,
                      color:
                        "#0795e8",
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                borderRadius: 3,
                border:
                  "1px solid #e5e7eb",
                boxShadow: "none",
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
                      Search Result
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ mt: 1 }}
                    >
                      {
                        filteredNotes.length
                      }
                    </Typography>
                  </Box>

                  <SearchIcon
                    sx={{
                      fontSize: 45,
                      color:
                        "#0795e8",
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                borderRadius: 3,
                border:
                  "1px solid #e5e7eb",
                boxShadow: "none",
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
                      Downloads
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ mt: 1 }}
                    >
                      {notes.reduce(
                        (
                          total,
                          note
                        ) =>
                          total +
                          (note.downloads ||
                            0),
                        0
                      )}
                    </Typography>
                  </Box>

                  <DownloadIcon
                    sx={{
                      fontSize: 45,
                      color:
                        "#0795e8",
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* SEARCH */}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
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
              md={6}
            >
              <TextField
                fullWidth
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search title, subject, file..."
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
              sm={6}
              md={2}
            >
              <TextField
                select
                fullWidth
                label="Department"
                value={department}
                onChange={(event) =>
                  setDepartment(
                    event.target.value
                  )
                }
              >
                <MenuItem value="">
                  All
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
              item
              xs={12}
              sm={6}
              md={2}
            >
              <TextField
                select
                fullWidth
                label="Semester"
                value={semester}
                onChange={(event) =>
                  setSemester(
                    event.target.value
                  )
                }
              >
                <MenuItem value="">
                  All
                </MenuItem>

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

            <Grid
              item
              xs={12}
              md={2}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={
                  clearFilters
                }
                sx={{
                  height: 56,
                  textTransform:
                    "none",
                }}
              >
                Clear
              </Button>
            </Grid>

          </Grid>
        </Paper>

        {/* TITLE */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
          >
            All Documents
          </Typography>

          <Chip
            label={`${filteredNotes.length} Notes`}
            color="primary"
          />
        </Box>

        {/* NOTE CARDS */}

        <Grid
          container
          spacing={3}
        >
          {filteredNotes.map(
            (note) => (
              <Grid
                item
                xs={12}
                sm={6}
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

                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                      boxShadow:
                        "0 10px 25px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent>

                    {/* TITLE */}

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          bgcolor:
                            "#e8f4ff",
                          borderRadius: 2,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
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
                          {
                            note.title
                          }
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {
                            note.fileName
                          }
                        </Typography>
                      </Box>
                    </Stack>

                    {/* DESCRIPTION */}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        minHeight: 45,
                        mb: 2,
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
                      flexWrap="wrap"
                      useFlexGap
                      sx={{
                        mb: 2,
                      }}
                    >
                      <Chip
                        size="small"
                        icon={
                          <SchoolIcon />
                        }
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
                      sx={{
                        mb: 2,
                      }}
                    />

                    {/* DATE */}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Uploaded:{" "}
                      {note.date}
                    </Typography>

                    {/* BUTTONS */}

                    <Stack
                      direction="row"
                      spacing={1}
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

        {/* EMPTY */}

        {filteredNotes.length ===
          0 && (
          <Paper
            sx={{
              p: 6,
              mt: 3,
              textAlign:
                "center",
              borderRadius: 3,
            }}
          >
            <FolderIcon
              sx={{
                fontSize: 60,
                color:
                  "text.secondary",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              No documents found
            </Typography>

            <Typography
              color="text.secondary"
            >
              Upload a document
              or change your
              search.
            </Typography>
          </Paper>
        )}

      </Container>
    </Box>
  );
};

export default Note;

