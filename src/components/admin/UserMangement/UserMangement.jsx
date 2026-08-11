
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
import DeleteIcon from "@mui/icons-material/Delete";

const UserMangement = () => {

  // ==========================================
  // Dummy Users
  // ==========================================
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Tamal Sarkar",
      email: "tamal@gmail.com",
      role: "USER",
      isActive: true,
    },
    {
      id: 2,
      name: "Rahul Das",
      email: "rahul@gmail.com",
      role: "USER",
      isActive: true,
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      role: "Student",
      isActive: false,
    },
    {
      id: 4,
      name: "Amit Roy",
      email: "amit@gmail.com",
      role: "ADMIN",
      isActive: true,
    },
    {
      id: 5,
      name: "Sneha Gupta",
      email: "sneha@gmail.com",
      role: "USER",
      isActive: false,
    },
  ]);

  // ==========================================
  // API - Fetch All Users
  // Currently commented
  // ==========================================

  /*
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  */


  // ==========================================
  // Delete User
  // Dummy functionality
  // ==========================================
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    // Remove user from dummy data
    setUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== id)
    );

    /*
    // API DELETE
    const deleteUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        setUsers((previousUsers) =>
          previousUsers.filter((user) => user.id !== id)
        );

      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    deleteUser();
    */
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
        User Management
      </Typography>


      {/* ==========================================
          User Table
      ========================================== */}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 2,
        }}
      >

        <Table>

          {/* Table Header */}
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


          {/* Table Body */}
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

                


                  {/* Delete Button */}
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

    </Box>
  );
};

export default UserMangement;

