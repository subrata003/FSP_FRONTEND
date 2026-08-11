
import React, { useState } from "react";
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
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const NoteManagement = () => {

  // ==========================================
  // Dummy Notes
  // ==========================================

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Java Programming Notes",
      subject: "Java",
      semester: "1st Semester",
      branch: "MCA",
      uploadedBy: "Tamal Sarkar",
      pdfUrl: "#",
      status: "PENDING",
    },
    {
      id: 2,
      title: "Data Structures Notes",
      subject: "DSA",
      semester: "2nd Semester",
      branch: "MCA",
      uploadedBy: "Rahul Das",
      pdfUrl: "#",
      status: "PENDING",
    },
    {
      id: 3,
      title: "Database Management System",
      subject: "DBMS",
      semester: "2nd Semester",
      branch: "MCA",
      uploadedBy: "Priya Sharma",
      pdfUrl: "#",
      status: "PENDING",
    },
    {
      id: 4,
      title: "Computer Networks",
      subject: "Networking",
      semester: "3rd Semester",
      branch: "MCA",
      uploadedBy: "Amit Roy",
      pdfUrl: "#",
      status: "PENDING",
    },
  ]);


  // ==========================================
  // API - Fetch All Notes
  // Currently commented
  // ==========================================

  /*
  const fetchNotes = async () => {
    try {

      const response = await fetch(
        "http://localhost:8080/api/notes"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();

      setNotes(data);

    } catch (error) {

      console.error(
        "Error fetching notes:",
        error
      );

    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  */


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

    // ==========================================
    // Dummy Approve
    // ==========================================

    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id
          ? {
            ...note,
            status: "APPROVED",
          }
          : note
      )
    );


    /*
    // ==========================================
    // API - Approve Note
    // ==========================================

    try {

      const response = await fetch(
        `http://localhost:8080/api/notes/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to approve note"
        );
      }

      // Update UI
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === id
            ? {
                ...note,
                status: "APPROVED",
              }
            : note
        )
      );

    } catch (error) {

      console.error(
        "Error approving note:",
        error
      );

    }
    */
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


    // ==========================================
    // Dummy Reject
    // Remove note from list
    // ==========================================

    setNotes((previousNotes) =>
      previousNotes.filter(
        (note) => note.id !== id
      )
    );


    /*
    // ==========================================
    // API - Reject/Delete Note
    // ==========================================

    try {

      const response = await fetch(
        `http://localhost:8080/api/notes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to reject note"
        );
      }

      // Remove note from UI
      setNotes((previousNotes) =>
        previousNotes.filter(
          (note) => note.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error rejecting note:",
        error
      );

    }
    */
  };


  // ==========================================
  // View PDF
  // ==========================================

  const handleViewPdf = (pdfUrl) => {

    if (pdfUrl && pdfUrl !== "#") {
      window.open(
        pdfUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      alert("PDF is not available in dummy data.");
    }
  };


  return (
    <Box sx={{ p: 3 }}>

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

          {/* ==========================================
              Table Header
          ========================================== */}

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


          {/* ==========================================
              Table Body
          ========================================== */}

          <TableBody>

            {notes.length > 0 ? (

              notes.map((note) => (

                <TableRow
                  key={note.id}
                  hover
                  sx={{
                    height: "40px",
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


                  {/* ==========================================
                      View PDF
                  ========================================== */}

                  <TableCell>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={
                        <VisibilityIcon />
                      }
                      onClick={() =>
                        handleViewPdf(
                          note.pdfUrl
                        )
                      }
                    >
                      View PDF
                    </Button>

                  </TableCell>


                  {/* ==========================================
                      Status
                  ========================================== */}

                  <TableCell>

                    <Chip
                      label={note.status}
                      color={
                        note.status === "APPROVED"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />

                  </TableCell>


                  {/* ==========================================
                      Admin Actions
                  ========================================== */}

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
                        startIcon={
                          <CheckCircleIcon />
                        }
                        disabled={
                          note.status ===
                          "APPROVED"
                        }
                        onClick={() =>
                          handleApprove(
                            note.id
                          )
                        }
                      >
                        Approve
                      </Button>


                      {/* Reject */}

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={
                          <CancelIcon />
                        }
                        onClick={() =>
                          handleReject(
                            note.id
                          )
                        }
                      >
                        Reject
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

    </Box>
  );
};

export default NoteManagement;

