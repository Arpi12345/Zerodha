import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { TextField, Button, Typography, Box } from "@mui/material";
import useGeneralContext from "./useGeneralContext";

 // backend API  
 const URL = process.env.REACT_APP_DASH_URL + "/login"; // ensure /login endpoint


const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { login } = useGeneralContext();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post(URL, {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        const res_data = response.data;

        login({
          token: res_data.token,
          username: res_data.username,
          userId: res_data.userId,
          isAdmin: res_data.isAdmin,
        });

        setUser({ email: "", password: "" });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
         backgroundColor: "rgb(70, 68, 66)",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          p: 3,
          borderRadius: 2,
          border: "2px solid black",
          backgroundColor: "white",
        }}
      >
        {/* Left image */}
        <Box sx={{ mr: 5 }}>
          <img
            src="/login.jpg"
            alt="login"
            width="400"
            height="400"
            style={{ border: "3px solid black", borderRadius: "10px" }}
          />
        </Box>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3}>
            Login Form
          </Typography>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%", alignSelf: "center" }}
          >
            Login
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
