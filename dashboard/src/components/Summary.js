// src/pages/Summary.js
import React, { useState, useEffect } from "react";
import useGeneralContext from "./useGeneralContext";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";

const Summary = () => {
  const { username, token, logout } = useGeneralContext();
  const [orderB, setOrderB] = useState([]);
  const [orderS, setOrderS] = useState([]);
  const navigate = useNavigate();

  // ✅ Logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Fetch buy/sell orders if authenticated
  useEffect(() => {
    if (!token) return;

    Promise.all([
      axios.get(`${api}/userByuOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${api}/userSellOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([res2, res3]) => {
        setOrderB(res2.data);
        setOrderS(res3.data);
      })
      .catch((err) => console.error("Data fetch error", err));
  }, [token]);

  // ✅ Redirect if not authenticated


  return (
    <div className="summary">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
          alignItems: 'center',
          height: '50vh',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Card sx={{ maxWidth: "400px" }}>
          <h3 style={{ textAlign: 'center', color: 'GrayText' }}>
            <AccountCircleIcon />
          </h3>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hi, {username}!
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </CardActions>
        </Card>
      </div>

      <h3 className="title">
        {username}'s &nbsp;:- &nbsp; &nbsp;Buy Holdings ({orderB.length})
      </h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Mode</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderB.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.mode}</td>
                <td>{stock.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="title">
          {username}'s &nbsp;:- &nbsp; &nbsp;Sell Holdings ({orderS.length})
        </h3>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Mode</th>
              <th>Cheque</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderS.map((stock1, index) => (
              <tr key={index}>
                <td>{stock1.name}</td>
                <td>{stock1.qty}</td>
                <td>{stock1.mode}</td>
                <td>{stock1.cheque}</td>
                <td>{stock1.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
