import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";


const NoteManagement = () => {
  const [notes, setNotes] = useState([]);


  const token = localStorage.getItem("token");

  // ==========================================
  // Snackbar State
  // ==========================================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ==========================================
  // Close Snackbar
  // ==========================================

  const handleCloseSnackbar = () => {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  // ==========================================
  // Fetch Pending Notes
  // ==========================================

  


  // ==========================================
  // Filter State
  // ==========================================

  const [selectedBranch, setSelectedBranch] =
    useState("");

  const [selectedSemester, setSelectedSemester] =
    useState("");

  // ==========================================
  // Filter Notes
  // ==========================================

  const filteredNotes = notes.filter((note) => {
    const branchMatch =
      selectedBranch === "" ||
      note.branch === selectedBranch;

    const semesterMatch =
      selectedSemester === "" ||
      note.semester === selectedSemester;

    return branchMatch && semesterMatch;
  });

  // ==========================================
  // Approve Note
  // ==========================================

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this note?"
    );

    if (!confirmApprove) {
      return;
    }

    try {
      if (!token) {
        setSnackbar({
          open: true,
          message: "Authentication token not found.",
          severity: "error",
        });

        return;
      }

      // ==========================================
      // Approve API
      // ==========================================

      const response = await fetch(
        `http://192.168.29.171:8080/api/admin/notes/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Approve failed: ${response.status}`
        );
      }

      // ==========================================
      // Success Message
      // ==========================================

      setSnackbar({
        open: true,
        message: "Note approved successfully.",
        severity: "success",
      });
      await fetchNotes();

      // ==========================================
      // Refresh Page After Snackbar
      // ==========================================


    } catch (error) {
      console.error(
        "Error approving note:",
        error
      );

      setSnackbar({
        open: true,
        message: "Failed to approve note.",
        severity: "error",
      });
    }
  };
 
    

  // ==========================================
  // Reject Note
  // ==========================================

  const handleReject = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this note?"
    );

    if (!confirmReject) {
      return;
    }

    try {
      if (!token) {
        setSnackbar({
          open: true,
          message: "Authentication token not found.",
          severity: "error",
        });

        return;
      }

      // ==========================================
      // Reject API
      // ==========================================

      const response = await fetch(
        `http://192.168.29.171:8080/api/admin/notes/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Reject failed: ${response.status}`
        );
      }

      // ==========================================
      // Success Message
      // ==========================================

      setSnackbar({
        open: true,
        message: "Note rejected successfully.",
        severity: "success",
      });
      await fetchNotes();

      // ==========================================
      // Refresh Page After Snackbar
      // ==========================================


    } catch (error) {
      console.error(
        "Error rejecting note:",
        error
      );

      setSnackbar({
        open: true,
        message: "Failed to reject note.",
        severity: "error",
      });
    }
  };

  // ==========================================
  // Delete Note
  // ==========================================

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    // ==========================================
    // Get JWT Token
    // ==========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setSnackbar({
        open: true,
        message: "Authentication token not found.",
        severity: "error",
      });

      return;
    }

    // ==========================================
    // Delete API
    // ==========================================

    const response = await fetch(
      `http://192.168.29.171:8080/api/admin/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ==========================================
    // Check API Response
    // ==========================================

    if (!response.ok) {
      throw new Error(
        `Delete failed: ${response.status}`
      );
    }

    // ==========================================
    // Remove Note From Frontend List
    // ==========================================

    setNotes((previousNotes) =>
      previousNotes.filter(
        (note) => note.id !== id
      )
    );

    // ==========================================
    // Success Message
    // ==========================================

    setSnackbar({
      open: true,
      message: "Note deleted successfully.",
      severity: "success",
    });
    await fetchNotes();

  } catch (error) {
    console.error(
      "Error deleting note:",
      error
    );

    // ==========================================
    // Error Message
    // ==========================================

    setSnackbar({
      open: true,
      message: "Failed to delete note.",
      severity: "error",
    });
  }
};
const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.171:8080/api/admin/notes/pending",
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
            `Failed to fetch notes: ${response.status}`
          );
        }

        const data = await response.json();

        

        const formattedNotes = data.map((note) => ({
          id: note.id,
          title: note.title,
          description: note.description,
          subject: note.subject,

          semester:
            note.semester === 1
              ? "1st Semester"
              : note.semester === 2
                ? "2nd Semester"
                : note.semester === 3
                  ? "3rd Semester"
                  : note.semester === 4
                    ? "4th Semester"
                    : note.semester === 5
                      ? "5th Semester"
                      : note.semester === 6
                        ? "6th Semester"
                        : `${note.semester}th Semester`,

          branch: note.branch,

          uploadedBy:
            note.uploadedBy?.name || "Unknown",

          pdfName: note.pdfName,

          pdfUrl: note.pdfUrl || "#",

          downloads: note.downloads,

          status: note.status,

          createdAt: note.createdAt,

          updatedAt: note.updatedAt,
        }));

        setNotes(formattedNotes);
      } catch (error) {
        console.error(
          "Error fetching pending notes:",
          error
        );
      }
    };
    
useEffect(() => {

    fetchNotes();
  }, [token]);


  // ==========================================
  // View PDF
  // ==========================================

  const handleView = async (note) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://192.168.29.171:8080/api/notes/file/${note.id}`,
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

      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 60000);

    } catch (error) {
      console.error(
        "View PDF error:",
        error
      );

      setSnackbar({
        open: true,
        message: "Unable to open PDF.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      {/* ==========================================
          Page Header
      ========================================== */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Note Management
      </Typography>

      {/* ==========================================
          Search / Filter Section
      ========================================== */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: 220,
          }}
        >
          <InputLabel>
            Branch
          </InputLabel>

          <Select
            value={selectedBranch}
            label="Branch"
            onChange={(event) =>
              setSelectedBranch(
                event.target.value
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
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{
            minWidth: 220,
          }}
        >
          <InputLabel>
            Semester
          </InputLabel>

          <Select
            value={selectedSemester}
            label="Semester"
            onChange={(event) =>
              setSelectedSemester(
                event.target.value
              )
            }
          >
            <MenuItem value="">
              All Semesters
            </MenuItem>

            <MenuItem value="1st Semester">
              1st Semester
            </MenuItem>

            <MenuItem value="2nd Semester">
              2nd Semester
            </MenuItem>

            <MenuItem value="3rd Semester">
              3rd Semester
            </MenuItem>

            <MenuItem value="4th Semester">
              4th Semester
            </MenuItem>

            <MenuItem value="5th Semester">
              5th Semester
            </MenuItem>

            <MenuItem value="6th Semester">
              6th Semester
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ==========================================
          Notes Table
      ========================================== */}

      <TableContainer
        component={Paper}
        sx={{
          width: "108%",
          borderRadius: 2,
          boxShadow: 2,
          minHeight: "500px",
        }}
      >
        <Table
          sx={{
            minWidth: 1200,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>

              <TableCell>
                <strong>Note Title</strong>
              </TableCell>

              <TableCell>
                <strong>Subject</strong>
              </TableCell>

              <TableCell>
                <strong>Semester</strong>
              </TableCell>

              <TableCell>
                <strong>Branch</strong>
              </TableCell>

              <TableCell>
                <strong>Uploaded By</strong>
              </TableCell>

              <TableCell>
                <strong>PDF</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <TableRow
                  key={note.id}
                  hover
                  sx={{
                    height: "40px",
                    backgroundColor:
                      note.status === "APPROVED"
                        ? "#F0FDF4"
                        : note.status ===
                            "REJECTED"
                          ? "#FEF2F2"
                          : "inherit",
                  }}
                >
                  <TableCell>
                    {note.id}
                  </TableCell>

                  <TableCell>
                    {note.title}
                  </TableCell>

                  <TableCell>
                    {note.subject}
                  </TableCell>

                  <TableCell>
                    {note.semester}
                  </TableCell>

                  <TableCell>
                    {note.branch}
                  </TableCell>

                  <TableCell>
                    {note.uploadedBy}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={
                        <VisibilityIcon />
                      }
                      onClick={() =>
                        handleView(note)
                      }
                    >
                      View PDF
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={note.status}
                      color={
                        note.status ===
                        "APPROVED"
                          ? "success"
                          : note.status ===
                              "REJECTED"
                            ? "error"
                            : "warning"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent:
                          "center",
                      }}
                    >
                      {/* Approve */}

                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          handleApprove(
                            note.id
                          )
                        }
                        sx={{
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <CheckCircleIcon />
                      </Button>

                      {/* Reject */}

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleReject(
                            note.id
                          )
                        }
                        sx={{
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <CancelIcon />
                      </Button>

                      {/* Delete */}

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleDelete(
                            note.id
                          )
                        }
                        sx={{
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                >
                  No notes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ==========================================
          MUI Success/Error Snackbar
      ========================================== */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NoteManagement;