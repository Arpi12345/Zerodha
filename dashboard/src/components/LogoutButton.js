// src/components/LogoutButton.js
import React from "react";
import { Button } from "@mui/material";
import useGeneralContext from "./useGeneralContext";

const LogoutButton = () => {
  const { logout } = useGeneralContext();

  return (
    <Button variant="contained" color="primary" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
