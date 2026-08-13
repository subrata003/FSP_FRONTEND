import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Chip,
  Snackbar,
  Alert

} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

const UserMangement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  // ==========================================
  // Notes Dialog States
  // ==========================================

  const [openNotesDialog, setOpenNotesDialog] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [studentNotes, setStudentNotes] =
    useState([]);

  const token = localStorage.getItem("token");

  console.log("token is:", token);

  // ==========================================
  // GET ALL STUDENTS
  // This API also returns notes array
  // ==========================================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.29.171:8080/api/admin/students",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Students API status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch students: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Students API Response:", data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error(
          "API did not return an array:",
          data
        );

        setUsers([]);
      }
    } catch (error) {
      console.error(
        "Error fetching students:",
        error
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH STUDENTS ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================================
  // VIEW PARTICULAR STUDENT NOTES
  // ==========================================
  const handleDeleteNote = async (noteId) => {
    console.log("niteid is ",noteId);
    

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("token");
      console.log("delete token : ",token);
      

      const response = await fetch(
        `http://192.168.29.171:8080/api/admin/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status}`
        );
      }

      // Remove from currently opened modal
      setStudentNotes((previousNotes) =>
        previousNotes.filter(
          (note) => note.id !== noteId
        )
      );

      // Also update users state
      setUsers((previousUsers) =>
        previousUsers.map((user) => {

          if (user.id === selectedStudent?.id) {

            return {
              ...user,

              notes: Array.isArray(user.notes)
                ? user.notes.filter(
                  (note) => note.id !== noteId
                )
                : [],
            };
          }

          return user;
        })
      );

      setSnackbar({
        open: true,
        message: "Note deleted successfully.",
        severity: "success",
      });

    } catch (error) {

      console.error(
        "Delete note error:",
        error
      );

      setSnackbar({
        open: true,
        message: "Failed to delete note.",
        severity: "error",
      });
    }
  };
  const handleViewNotes = (student) => {
    console.log(
      "Selected student:",
      student
    );

    console.log(
      "Student notes:",
      student.notes
    );

    setSelectedStudent(student);

    setStudentNotes(
      Array.isArray(student.notes)
        ? student.notes
        : []
    );

    setOpenNotesDialog(true);
  };

  // ==========================================
  // CLOSE NOTES DIALOG
  // ==========================================

  const handleCloseNotesDialog = () => {
    setOpenNotesDialog(false);
    setSelectedStudent(null);
    setStudentNotes([]);
  };

  // ==========================================
  // VIEW PDF
  // ==========================================

  const handleView = async (note) => {
    try {
      const token =
        localStorage.getItem("token");

      console.log(
        "Opening PDF for note:",
        note.id
      );

      const response = await fetch(
        `http://192.168.29.171:8080/api/notes/file/${note.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PDF API status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load PDF: ${response.status}`
        );
      }

      // Convert response into Blob
      const blob = await response.blob();

      console.log(
        "PDF Blob:",
        blob
      );

      // Create temporary browser URL
      const pdfUrl =
        URL.createObjectURL(blob);

      console.log(
        "Generated PDF URL:",
        pdfUrl
      );

      // Open PDF in new tab
      window.open(
        pdfUrl,
        "_blank"
      );

      // Don't revoke immediately.
      // New tab still needs this URL.
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 60000);

    } catch (error) {
      console.error(
        "View PDF error:",
        error
      );

      alert(
        "Unable to open PDF."
      );
    }
  };

  // ==========================================
  // DELETE STUDENT
  // ==========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
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
        alert("Authentication token not found.");
        return;
      }

      // ==========================================
      // Delete Student API
      // ==========================================

      const response = await fetch(
        `http://192.168.29.171:8080/api/admin/students/${id}`,
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
      // Remove Student From Frontend List
      // ==========================================

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user.id !== id
        )
      );

      // ==========================================
      // SUCCESS POPUP
      // ==========================================
      setSnackbar({
        open: true,
        message: "user delete successfully.",
        severity: "success",
      });



      // alert("Student deleted successfully.");

    } catch (error) {
      console.error(
        "Error deleting student:",
        error
      );

      // ==========================================
      // ERROR POPUP
      // ==========================================
      setSnackbar({
        open: true,
        message: "Failed to delete user.",
        severity: "error",
      });

      // alert("Failed to delete student.");
    }
  };

  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "success";

      case "REJECTED":
        return "error";

      case "PENDING":
        return "warning";

      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
      }}
    >
      {/* ==========================================
          PAGE TITLE
      ========================================== */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        User Management
      </Typography>

      {/* ==========================================
          STUDENT TABLE
      ========================================== */}

      {loading ? (
        <Typography>
          Loading users...
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table
            sx={{
              minWidth: 900,
            }}
          >
            {/* ==========================================
                TABLE HEADER
            ========================================== */}

            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>

                <TableCell>
                  <strong>Name</strong>
                </TableCell>

                <TableCell>
                  <strong>Email</strong>
                </TableCell>

                <TableCell>
                  <strong>Role</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>View Notes</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ==========================================
                TABLE BODY
            ========================================== */}

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                  >
                    <TableCell>
                      {user.id}
                    </TableCell>

                    <TableCell>
                      {user.name}
                    </TableCell>

                    <TableCell>
                      {user.email}
                    </TableCell>

                    <TableCell>
                      {user.role}
                    </TableCell>

                    {/* ==================================
                        VIEW NOTES BUTTON
                    ================================== */}

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={
                          <VisibilityIcon />
                        }
                        onClick={() =>
                          handleViewNotes(user)
                        }
                      >
                        View Notes
                      </Button>
                    </TableCell>

                    {/* ==================================
                        DELETE BUTTON
                    ================================== */}

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={
                          <DeleteIcon />
                        }
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ==================================================
          STUDENT NOTES DIALOG
      ================================================== */}

      <Dialog
        open={openNotesDialog}
        onClose={
          handleCloseNotesDialog
        }
        fullWidth
        maxWidth="md"
      >
        {/* ==========================================
            DIALOG HEADER
        ========================================== */}

        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              Student Notes
            </Typography>

            {selectedStudent && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Student:{" "}
                {selectedStudent.name}
                {" | "}
                {selectedStudent.email}
              </Typography>
            )}
          </Box>

          <IconButton
            onClick={handleCloseNotesDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        {/* ==========================================
            DIALOG CONTENT
        ========================================== */}

        <DialogContent>
          {studentNotes.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
              >
                No Notes Found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                This student has not
                uploaded any notes.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {studentNotes.map((note) => (
                <Paper
                  key={note.id}
                  elevation={2}
                  sx={{
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >

                    {/* NOTE INFORMATION */}

                    <Box sx={{ flex: 1 }}>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {note.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {note.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mt: 1.5,
                        }}
                      >
                        <Chip
                          label={`Subject: ${note.subject}`}
                          size="small"
                        />

                        <Chip
                          label={`Semester: ${note.semester}`}
                          size="small"
                        />

                        <Chip
                          label={`Branch: ${note.branch}`}
                          size="small"
                        />

                        <Chip
                          label={`Downloads: ${note.downloads}`}
                          size="small"
                        />

                        <Chip
                          label={note.status}
                          size="small"
                          color={getStatusColor(note.status)}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1.5,
                          wordBreak: "break-all",
                        }}
                      >
                        <strong>PDF:</strong>{" "}
                        {note.pdfName}
                      </Typography>

                    </Box>

                    {/* =================================
          NOTE ACTION BUTTONS
      ================================= */}

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        flexShrink: 0,
                      }}
                    >

                      {/* VIEW PDF */}

                      <Button
                        variant="outlined"
                        startIcon={<PictureAsPdfIcon />}
                        onClick={() => handleView(note)}
                      >
                        View PDF
                      </Button>

                      {/* DELETE NOTE */}

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          handleDeleteNote(note.id)
                        }
                      >
                        Delete
                      </Button>

                    </Stack>

                  </Box>
                </Paper>
              ))}
            </Stack>
          )}
        </DialogContent>

        {/* ==========================================
            DIALOG FOOTER
        ========================================== */}

        <DialogActions>
          <Button
            variant="contained"
            onClick={
              handleCloseNotesDialog
            }
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

export default UserMangement;