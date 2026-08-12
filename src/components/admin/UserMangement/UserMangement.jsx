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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const UserMangement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  console.log("token is : ",token);
  

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.171:8080/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch students: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("API Response:", data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("API did not return an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete user:", id);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        User Management
      </Typography>

      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
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
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id} hover>
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

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
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
                    colSpan={5}
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
    </Box>
  );
};

export default UserMangement;