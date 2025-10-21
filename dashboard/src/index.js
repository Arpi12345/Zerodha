import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { GeneralContextProvider } from "./components/GeneralContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";

import Summary from "./components/Summary";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";
import Apps from "./components/Apps";
import Profile from "./components/profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GeneralContextProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              {/* Nested inside Dashboard (via <Outlet />) */}
              <Route index element={<Summary />} />
              <Route path="orders" element={<Orders />} />
              <Route path="holdings" element={<Holdings />} />
              <Route path="positions" element={<Positions />} />
              <Route path="funds" element={<Funds />} />
              <Route path="apps" element={<Apps />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* fallback → redirect to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
