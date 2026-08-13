import React, { useState } from "react";

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

const API_URL = "http://192.168.29.171:8080";

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
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailValue = loginEmail.trim().toLowerCase();
    const passwordValue = loginPassword;

    if (!emailValue || !passwordValue) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      // =================================================
      // SAVE JWT TOKEN
      // =================================================

      const user = {
        userId: data.userId,
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase()
      };

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
      );

      console.log("Login response:", data);
      console.log("Logged user:", user);

      // Role-based navigation
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "student") {
        navigate("/student");
      } else {
        alert("Invalid user role");
      }

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    // ================================
    // VALIDATION
    // ================================

    if (
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length !== 8) {
      alert("Password must be exactly 8 characters");
      return;
    }

    // ================================
    // REQUEST DATA
    // ================================

    const registerData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    console.log("Register Data:", registerData);

    try {
      setLoading(true);

      console.log("log 1");

      const response = await fetch(
        "http://192.168.29.171:8080/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(registerData),
        }
      );

      console.log("log 2");
      console.log("Status:", response.status);

      // Read response ONLY ONCE
      const data = await response.json();

      console.log("Register response:", data);

      // ================================
      // ERROR
      // ================================

      if (!response.ok) {
        alert(
          data.message ||
          data.error ||
          "Registration failed"
        );
        return;
      }

      console.log("log 3");

      // ================================
      // TOKEN
      // ================================

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );

        console.log(
          "Token:",
          data.token
        );
      }

      // ================================
      // SUCCESS
      // ================================

      alert(
        data.message ||
        "Registration successful! Please login."
      );

      setName("");
      setEmail("");
      setPassword("");

      setIsLogin(true);

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

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

            {/* =================================================
                LOGIN FORM
            ================================================= */}

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
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
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

              /* =================================================
                 REGISTER FORM
              ================================================= */

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
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                  }}
                >
                  {loading
                    ? "Registering..."
                    : "Register"}
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