// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   Container,
// //   Divider,
// //   IconButton,
// //   InputAdornment,
// //   MenuItem,
// //   TextField,
// //   Typography,
// // } from "@mui/material";

// // import {
// //   Visibility,
// //   VisibilityOff,
// //   LockOutlined,
// //   PersonAdd,
// //   Login,
// // } from "@mui/icons-material";

// // import { useNavigate } from "react-router-dom";
// // import defaultUsers from "../../public/data/Userdata.js";

// // const Loginpage = () => {
// //   const navigate = useNavigate();

// //   const [isLogin, setIsLogin] = useState(true);

// //   // Login fields
// //   const [loginEmail, setLoginEmail] = useState("");
// //   const [loginPassword, setLoginPassword] = useState("");

// //   // Registration fields
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [department, setDepartment] = useState("");
// //   const [rollNumber, setRollNumber] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [showPassword, setShowPassword] = useState(false);

// //   // Initialize users in localStorage
// //   useEffect(() => {
// //     const storedUsers = localStorage.getItem("users");

// //     if (!storedUsers) {
// //       localStorage.setItem("users", JSON.stringify(defaultUsers));
// //     }
// //   }, []);

// //   // -----------------------------
// //   // LOGIN
// //   // -----------------------------
// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     if (!loginEmail || !loginPassword) {
// //       alert("Please enter email and password");
// //       return;
// //     }

// //     const storedUsers = JSON.parse(
// //       localStorage.getItem("users") || "[]"
// //     );

// //     const user = storedUsers.find(
// //       (item) =>
// //         item.email.toLowerCase() === loginEmail.toLowerCase() &&
// //         item.password === loginPassword
// //     );

// //     if (!user) {
// //       alert("Invalid email or password");
// //       return;
// //     }

// //     // Store currently logged-in user
// //     localStorage.setItem("loggedUser", JSON.stringify(user));

// //     // Redirect according to role
// //     if (user.role === "admin") {
// //       navigate("/admin");
// //     } else {
// //       navigate("/student");
// //     }
// //   };

// //   // -----------------------------
// //   // REGISTRATION
// //   // -----------------------------
// //   const handleRegister = (e) => {
// //     e.preventDefault();

// //     // Required field validation
// //     if (
// //       !name ||
// //       !email ||
// //       !department ||
// //       !rollNumber ||
// //       !password
// //     ) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     // Email validation
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //     if (!emailRegex.test(email)) {
// //       alert("Please enter a valid email address");
// //       return;
// //     }

// //     // Password exactly 8 characters
// //     if (password.length !== 8) {
// //       alert("Password must contain exactly 8 characters");
// //       return;
// //     }

// //     const storedUsers = JSON.parse(
// //       localStorage.getItem("users") || "[]"
// //     );

// //     // Check duplicate email
// //     const emailExists = storedUsers.some(
// //       (user) => user.email.toLowerCase() === email.toLowerCase()
// //     );

// //     if (emailExists) {
// //       alert("Email already registered");
// //       return;
// //     }

// //     // Check duplicate roll number
// //     const rollExists = storedUsers.some(
// //       (user) =>
// //         user.rollNumber.toLowerCase() === rollNumber.toLowerCase()
// //     );

// //     if (rollExists) {
// //       alert("Roll number already registered");
// //       return;
// //     }

// //     const newUser = {
// //       id: Date.now(),
// //       name,
// //       email,
// //       password,
// //       role: "student",
// //       department,
// //       rollNumber,
// //     };

// //     const updatedUsers = [...storedUsers, newUser];

// //     localStorage.setItem("users", JSON.stringify(updatedUsers));

// //     alert("Registration successful! Please login.");

// //     // Clear registration form
// //     setName("");
// //     setEmail("");
// //     setDepartment("");
// //     setRollNumber("");
// //     setPassword("");

// //     // Switch to login
// //     setIsLogin(true);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         background:
// //           "linear-gradient(135deg, #1976d2 0%, #6a1b9a 100%)",
// //         p: 2,
// //       }}
// //     >
// //       <Container maxWidth="sm">
// //         <Card
// //           elevation={12}
// //           sx={{
// //             borderRadius: 4,
// //             overflow: "hidden",
// //           }}
// //         >
// //           {/* Header */}
// //           <Box
// //             sx={{
// //               background:
// //                 "linear-gradient(135deg, #1565c0, #7b1fa2)",
// //               color: "white",
// //               textAlign: "center",
// //               p: 4,
// //             }}
// //           >
// //             {isLogin ? (
// //               <Login sx={{ fontSize: 50 }} />
// //             ) : (
// //               <PersonAdd sx={{ fontSize: 50 }} />
// //             )}

// //             <Typography variant="h4" fontWeight="bold">
// //               {isLogin ? "Welcome Back" : "Create Account"}
// //             </Typography>

// //             <Typography sx={{ mt: 1, opacity: 0.9 }}>
// //               {isLogin
// //                 ? "Login to your student portal"
// //                 : "Register your student account"}
// //             </Typography>
// //           </Box>

// //           <CardContent sx={{ p: 4 }}>
// //             {isLogin ? (
// //               // =========================
// //               // LOGIN FORM
// //               // =========================
// //               <Box component="form" onSubmit={handleLogin}>
// //                 <TextField
// //                   fullWidth
// //                   label="Email Address"
// //                   type="email"
// //                   value={loginEmail}
// //                   onChange={(e) => setLoginEmail(e.target.value)}
// //                   margin="normal"
// //                   required
// //                 />

// //                 <TextField
// //                   fullWidth
// //                   label="Password"
// //                   type={showPassword ? "text" : "password"}
// //                   value={loginPassword}
// //                   onChange={(e) =>
// //                     setLoginPassword(e.target.value)
// //                   }
// //                   margin="normal"
// //                   required
// //                   inputProps={{
// //                     maxLength: 8,
// //                   }}
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <LockOutlined />
// //                       </InputAdornment>
// //                     ),
// //                     endAdornment: (
// //                       <InputAdornment position="end">
// //                         <IconButton
// //                           onClick={() =>
// //                             setShowPassword(!showPassword)
// //                           }
// //                         >
// //                           {showPassword ? (
// //                             <VisibilityOff />
// //                           ) : (
// //                             <Visibility />
// //                           )}
// //                         </IconButton>
// //                       </InputAdornment>
// //                     ),
// //                   }}
// //                 />

// //                 <Button
// //                   type="submit"
// //                   fullWidth
// //                   variant="contained"
// //                   size="large"
// //                   sx={{
// //                     mt: 3,
// //                     py: 1.5,
// //                     borderRadius: 2,
// //                     fontSize: "16px",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Login
// //                 </Button>

// //                 <Divider sx={{ my: 3 }}>OR</Divider>

// //                 <Button
// //                   fullWidth
// //                   variant="outlined"
// //                   size="large"
// //                   onClick={() => setIsLogin(false)}
// //                 >
// //                   Create New Account
// //                 </Button>
// //               </Box>
// //             ) : (
// //               // =========================
// //               // REGISTRATION FORM
// //               // =========================
// //               <Box component="form" onSubmit={handleRegister}>
// //                 <TextField
// //                   fullWidth
// //                   label="Full Name"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   margin="normal"
// //                   required
// //                 />

// //                 <TextField
// //                   fullWidth
// //                   label="Email Address"
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   margin="normal"
// //                   required
// //                 />

// //                 <TextField
// //                   fullWidth
// //                   select
// //                   label="Department"
// //                   value={department}
// //                   onChange={(e) =>
// //                     setDepartment(e.target.value)
// //                   }
// //                   margin="normal"
// //                   required
// //                 >
// //                   <MenuItem value="Computer Science">
// //                     Computer Science
// //                   </MenuItem>

// //                   <MenuItem value="Information Technology">
// //                     Information Technology
// //                   </MenuItem>

// //                   <MenuItem value="Computer Applications">
// //                     Computer Applications
// //                   </MenuItem>

// //                   <MenuItem value="Electronics">
// //                     Electronics
// //                   </MenuItem>

// //                   <MenuItem value="Administration">
// //                     Administration
// //                   </MenuItem>
// //                 </TextField>

// //                 <TextField
// //                   fullWidth
// //                   label="Roll Number"
// //                   value={rollNumber}
// //                   onChange={(e) =>
// //                     setRollNumber(e.target.value)
// //                   }
// //                   margin="normal"
// //                   required
// //                 />

// //                 <TextField
// //                   fullWidth
// //                   label="Password"
// //                   type={showPassword ? "text" : "password"}
// //                   value={password}
// //                   onChange={(e) =>
// //                     setPassword(e.target.value)
// //                   }
// //                   margin="normal"
// //                   required
// //                   inputProps={{
// //                     maxLength: 8,
// //                     minLength: 8,
// //                   }}
// //                   helperText="Password must be exactly 8 characters"
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <LockOutlined />
// //                       </InputAdornment>
// //                     ),
// //                     endAdornment: (
// //                       <InputAdornment position="end">
// //                         <IconButton
// //                           onClick={() =>
// //                             setShowPassword(!showPassword)
// //                           }
// //                         >
// //                           {showPassword ? (
// //                             <VisibilityOff />
// //                           ) : (
// //                             <Visibility />
// //                           )}
// //                         </IconButton>
// //                       </InputAdornment>
// //                     ),
// //                   }}
// //                 />

// //                 <Button
// //                   type="submit"
// //                   fullWidth
// //                   variant="contained"
// //                   size="large"
// //                   sx={{
// //                     mt: 3,
// //                     py: 1.5,
// //                     borderRadius: 2,
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Register
// //                 </Button>

// //                 <Divider sx={{ my: 3 }}>OR</Divider>

// //                 <Button
// //                   fullWidth
// //                   variant="outlined"
// //                   size="large"
// //                   onClick={() => setIsLogin(true)}
// //                 >
// //                   Already Have an Account? Login
// //                 </Button>
// //               </Box>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Loginpage;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Divider,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   TextField,
//   Typography,
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
//   LockOutlined,
//   PersonAdd,
//   Login,
// } from "@mui/icons-material";

// import { useNavigate } from "react-router-dom";
// import defaultUsers from "../../public/data/Userdata.js";

// const Loginpage = () => {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   // Login
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Registration
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [department, setDepartment] = useState("");
//   const [rollNumber, setRollNumber] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   // Load default users into localStorage
//   useEffect(() => {
//     const storedUsers = localStorage.getItem("users");

//     if (!storedUsers) {
//       localStorage.setItem("users", JSON.stringify(defaultUsers));
//     }
//   }, []);

//   // ==========================================
//   // LOGIN
//   // ==========================================
// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     if (!loginEmail || !loginPassword) {
// //       alert("Please enter email and password");
// //       return;
// //     }

// //     const storedUsers = JSON.parse(
// //       localStorage.getItem("users") || "[]"
// //     );

// //     const user = storedUsers.find(
// //       (item) =>
// //         item.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
// //         item.password === loginPassword
// //     );

// //     if (!user) {
// //       alert("Invalid email or password");
// //       return;
// //     }

// //     // Save logged-in user
// //     localStorage.setItem("loggedUser", JSON.stringify(user));

// //     // ==========================================
// //     // CATEGORY / ROLE BASED LOGIN
// //     // ==========================================

// //     if (user.role === "admin") {
// //       // Admin → Admin Dashboard
// //       navigate("/admin");
// //     } else if (user.role === "student") {
// //       // Student → Student Dashboard
// //       navigate("/student");
// //     } else {
// //       alert("Invalid user role");
// //     }
// //   };
// const handleLogin = (e) => {
//   e.preventDefault();

//   const email = loginEmail.trim().toLowerCase();
//   const password = loginPassword.trim();

//   if (!email || !password) {
//     alert("Please enter email and password");
//     return;
//   }

//   // Get users from localStorage
//   let storedUsers = JSON.parse(
//     localStorage.getItem("users") || "[]"
//   );

//   // If localStorage is empty, use Userdata.js
//   if (storedUsers.length === 0) {
//     storedUsers = defaultUsers;

//     localStorage.setItem(
//       "users",
//       JSON.stringify(defaultUsers)
//     );
//   }

//   console.log("Users:", storedUsers);
//   console.log("Login email:", email);
//   console.log("Login password:", password);

//   // Find user
//   const user = storedUsers.find(
//     (item) =>
//       item.email &&
//       item.email.trim().toLowerCase() === email &&
//       item.password === password
//   );

//   console.log("Found user:", user);

//   // User not found
//   if (!user) {
//     alert("Invalid email or password");
//     return;
//   }

//   // Save logged user
//   localStorage.setItem(
//     "loggedUser",
//     JSON.stringify(user)
//   );

//   // =================================
//   // ROLE BASED LOGIN
//   // =================================

//   if (user.role === "admin") {
//     console.log("Admin login");
//     navigate("/admin");
//   } else if (user.role === "student") {
//     console.log("Student login");
//     navigate("/student");
//   } else {
//     alert("Invalid user role");
//   }
// };
//   // ==========================================
//   // REGISTRATION
//   // ==========================================
//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (
//       !name ||
//       !email ||
//       !department ||
//       !rollNumber ||
//       !password
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     // Exactly 8 characters
//     if (password.length !== 8) {
//       alert("Password must be exactly 8 characters");
//       return;
//     }

//     const storedUsers = JSON.parse(
//       localStorage.getItem("users") || "[]"
//     );

//     // Duplicate email
//     const emailExists = storedUsers.some(
//       (user) =>
//         user.email.toLowerCase() === email.trim().toLowerCase()
//     );

//     if (emailExists) {
//       alert("Email already registered");
//       return;
//     }

//     // Duplicate roll number
//     const rollExists = storedUsers.some(
//       (user) =>
//         user.rollNumber.toLowerCase() ===
//         rollNumber.trim().toLowerCase()
//     );

//     if (rollExists) {
//       alert("Roll number already registered");
//       return;
//     }

//     // ==========================================
//     // NEW USERS ARE STUDENTS
//     // ==========================================
//     const newUser = {
//       id: Date.now(),
//       name: name.trim(),
//       email: email.trim(),
//       password,
//       role: "student",
//       department,
//       rollNumber: rollNumber.trim(),
//     };

//     const updatedUsers = [...storedUsers, newUser];

//     localStorage.setItem(
//       "users",
//       JSON.stringify(updatedUsers)
//     );

//     alert("Registration successful! Please login.");

//     // Clear form
//     setName("");
//     setEmail("");
//     setDepartment("");
//     setRollNumber("");
//     setPassword("");

//     // Go to login
//     setIsLogin(true);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background:
//           "linear-gradient(135deg, #1976d2 0%, #6a1b9a 100%)",
//         p: 2,
//       }}
//     >
//       <Container maxWidth="sm">
//         <Card
//           elevation={12}
//           sx={{
//             borderRadius: 4,
//             overflow: "hidden",
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               background:
//                 "linear-gradient(135deg, #1565c0, #7b1fa2)",
//               color: "white",
//               textAlign: "center",
//               p: 4,
//             }}
//           >
//             {isLogin ? (
//               <Login sx={{ fontSize: 50 }} />
//             ) : (
//               <PersonAdd sx={{ fontSize: 50 }} />
//             )}

//             <Typography variant="h4" fontWeight="bold">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </Typography>

//             <Typography sx={{ mt: 1, opacity: 0.9 }}>
//               {isLogin
//                 ? "Login to your portal"
//                 : "Register your student account"}
//             </Typography>
//           </Box>

//           <CardContent sx={{ p: 4 }}>

//             {/* =====================================
//                 LOGIN FORM
//             ===================================== */}
//             {isLogin ? (
//               <Box component="form" onSubmit={handleLogin}>

//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   type="email"
//                   value={loginEmail}
//                   onChange={(e) =>
//                     setLoginEmail(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                 />

//                 <TextField
//                   fullWidth
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   value={loginPassword}
//                   onChange={(e) =>
//                     setLoginPassword(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                   inputProps={{
//                     maxLength: 8,
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockOutlined />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() =>
//                             setShowPassword(!showPassword)
//                           }
//                         >
//                           {showPassword ? (
//                             <VisibilityOff />
//                           ) : (
//                             <Visibility />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     mt: 3,
//                     py: 1.5,
//                     borderRadius: 2,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Login
//                 </Button>

//                 <Divider sx={{ my: 3 }}>
//                   OR
//                 </Divider>

//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   size="large"
//                   onClick={() => setIsLogin(false)}
//                 >
//                   Create New Account
//                 </Button>
//               </Box>
//             ) : (

//               /* =====================================
//                  REGISTRATION FORM
//               ===================================== */
//               <Box component="form" onSubmit={handleRegister}>

//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   value={name}
//                   onChange={(e) =>
//                     setName(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                 />

//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   type="email"
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                 />

//                 <TextField
//                   fullWidth
//                   select
//                   label="Department"
//                   value={department}
//                   onChange={(e) =>
//                     setDepartment(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                 >
//                   <MenuItem value="Computer Science">
//                     Computer Science
//                   </MenuItem>

//                   <MenuItem value="Information Technology">
//                     Information Technology
//                   </MenuItem>

//                   <MenuItem value="Computer Applications">
//                     Computer Applications
//                   </MenuItem>

//                   <MenuItem value="Electronics">
//                     Electronics
//                   </MenuItem>
//                 </TextField>

//                 <TextField
//                   fullWidth
//                   label="Roll Number"
//                   value={rollNumber}
//                   onChange={(e) =>
//                     setRollNumber(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                 />

//                 <TextField
//                   fullWidth
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(e.target.value)
//                   }
//                   margin="normal"
//                   required
//                   inputProps={{
//                     minLength: 8,
//                     maxLength: 8,
//                   }}
//                   helperText="Password must be exactly 8 characters"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockOutlined />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() =>
//                             setShowPassword(!showPassword)
//                           }
//                         >
//                           {showPassword ? (
//                             <VisibilityOff />
//                           ) : (
//                             <Visibility />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   sx={{
//                     mt: 3,
//                     py: 1.5,
//                     borderRadius: 2,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Register
//                 </Button>

//                 <Divider sx={{ my: 3 }}>
//                   OR
//                 </Divider>

//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   size="large"
//                   onClick={() => setIsLogin(true)}
//                 >
//                   Already Have an Account? Login
//                 </Button>
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default Loginpage;

import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  PersonAdd,
  Login,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import defaultUsers from "../../public/data/Userdata.js";

const Loginpage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // ================================
  // LOGIN STATE
  // ================================
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ================================
  // REGISTER STATE
  // ================================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // ================================
  // LOAD DEFAULT USERS
  // ================================
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) {
      localStorage.setItem(
        "users",
        JSON.stringify(defaultUsers)
      );
    }
  }, []);

  // ================================
  // LOGIN
  // ================================
  const handleLogin = (e) => {
    e.preventDefault();

    const emailValue = loginEmail.trim().toLowerCase();
    const passwordValue = loginPassword.trim();

    if (!emailValue || !passwordValue) {
      alert("Please enter email and password");
      return;
    }

    let storedUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // If localStorage is empty
    if (storedUsers.length === 0) {
      storedUsers = defaultUsers;

      localStorage.setItem(
        "users",
        JSON.stringify(defaultUsers)
      );
    }

    console.log("Users:", storedUsers);
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);

    // Find user
    const user = storedUsers.find(
      (item) =>
        item.email?.trim().toLowerCase() === emailValue &&
        item.password?.trim() === passwordValue
    );

    console.log("Logged user:", user);

    // Invalid login
    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "loggedUser",
      JSON.stringify(user)
    );

    // ================================
    // ROLE BASED REDIRECT
    // ================================

    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "student") {
      navigate("/student");
    } else {
      alert("Invalid user role");
    }
  };

  // ================================
  // REGISTER
  // ================================
  const handleRegister = (e) => {
    e.preventDefault();

    // Required validation
    if (
      !name.trim() ||
      !email.trim() ||
      !department ||
      !rollNumber.trim() ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length !== 8) {
      alert("Password must be exactly 8 characters");
      return;
    }

    // Get users
    const storedUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Check duplicate email
    const emailExists = storedUsers.some(
      (user) =>
        user.email?.trim().toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (emailExists) {
      alert("Email already registered");
      return;
    }

    // Check duplicate roll number
    const rollExists = storedUsers.some(
      (user) =>
        user.rollNumber?.trim().toLowerCase() ===
        rollNumber.trim().toLowerCase()
    );

    if (rollExists) {
      alert("Roll number already registered");
      return;
    }

    // ================================
    // CREATE NEW STUDENT
    // ================================
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: password,
      role: "student",
      department: department,
      rollNumber: rollNumber.trim(),
    };

    const updatedUsers = [
      ...storedUsers,
      newUser,
    ];

    // Save users
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert(
      "Registration successful! Please login."
    );

    // Clear form
    setName("");
    setEmail("");
    setDepartment("");
    setRollNumber("");
    setPassword("");

    // Go to login
    setIsLogin(true);
  };

  // ================================
  // UI
  // ================================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1976d2 0%, #6a1b9a 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #1565c0, #7b1fa2)",
              color: "white",
              textAlign: "center",
              p: 4,
            }}
          >
            {isLogin ? (
              <Login sx={{ fontSize: 50 }} />
            ) : (
              <PersonAdd sx={{ fontSize: 50 }} />
            )}

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mt: 1 }}
            >
              {isLogin
                ? "Welcome Back"
                : "Create Account"}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
              }}
            >
              {isLogin
                ? "Login to your portal"
                : "Register your student account"}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* ================================
                LOGIN FORM
            ================================= */}
            {isLogin ? (
              <Box
                component="form"
                onSubmit={handleLogin}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={loginEmail}
                  onChange={(e) =>
                    setLoginEmail(e.target.value)
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(e.target.value)
                  }
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>

                <Divider sx={{ my: 3 }}>
                  OR
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setIsLogin(false);
                    setShowPassword(false);
                  }}
                >
                  Create New Account
                </Button>
              </Box>
            ) : (
              /* ================================
                 REGISTER FORM
              ================================= */
              <Box
                component="form"
                onSubmit={handleRegister}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  margin="normal"
                  required
                >
                  <MenuItem value="Computer Science">
                    Computer Science
                  </MenuItem>

                  <MenuItem value="Information Technology">
                    Information Technology
                  </MenuItem>

                  <MenuItem value="Computer Applications">
                    Computer Applications
                  </MenuItem>

                  <MenuItem value="Electronics">
                    Electronics
                  </MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Roll Number"
                  value={rollNumber}
                  onChange={(e) =>
                    setRollNumber(e.target.value)
                  }
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  margin="normal"
                  required
                  inputProps={{
                    minLength: 8,
                    maxLength: 8,
                  }}
                  helperText="Password must be exactly 8 characters"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Button>

                <Divider sx={{ my: 3 }}>
                  OR
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setIsLogin(true);
                    setShowPassword(false);
                  }}
                >
                  Already Have an Account? Login
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Loginpage;