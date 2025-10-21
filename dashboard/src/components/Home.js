import React from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Dashboard Layout (watchlist + content) */}
      <Dashboard />
    </div>
  );
};

export default Home;
