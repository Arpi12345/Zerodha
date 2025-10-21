import React, { useEffect, useState } from "react";
import axios from "axios";
import useGeneralContext from './useGeneralContext';

// adjust path if needed

const Orders = () => {
  const [orderB, setOrderB] = useState([]);
  const [orderS, setOrderS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const { isAuthenticated,token} = useGeneralContext();

  useEffect(() => {
    if (!isAuthenticated) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get("http://localhost:3002/neworders", { headers }),
      axios.get("http://localhost:3002/neworderSells", { headers })
    ])
      .then(([buyRes, sellRes]) => {
        setOrderB(buyRes.data);
        setOrderS(sellRes.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [isAuthenticated, token]);

  if (!isAuthenticated) return <p>Please log in to view orders.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="orders">
      <h3 className="title mt-5">🟢 New Buy Orders ({orderB.length})</h3>
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
                <td>{stock.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="title mt-5">🔴 New Sell Orders ({orderS.length})</h3>
      <div className="order-table">
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
            {orderS.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.mode}</td>
                <td>{stock.cheque}</td>
                <td>{stock.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
