import React, { useState, useEffect} from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import useGeneralContext from "./useGeneralContext";




// import { holdings } from "../data/data";
const Holdings = () => {
  
const { token } = useGeneralContext();
const [allHoldings, setAllHoldings] = useState([]);
const [orderB, setOrderB] = useState([]);
const [orderS, setOrderS] = useState([]);


useEffect(() => {
  if (!token  ) return;
  const api = process.env.REACT_APP_API_URL;

  

  Promise.all([
    axios.get(`${api}/allHoldings`, { headers: { Authorization: `Bearer ${token}` } }),
    axios.get(`${api}/neworders`, { headers: { Authorization: `Bearer ${token}` } }),
    axios.get(`${api}/neworderSells`, { headers: { Authorization: `Bearer ${token}` } })
  ])
    .then(([res1, res2, res3]) => {
      setAllHoldings(res1.data);
      setOrderB(res2.data);
      setOrderS(res3.data);
    })
    .catch(err => {
      console.error("Data fetch error:", err);
    })
}, [token]);







  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };




  const totalInvestment = allHoldings.reduce(
  (sum, stock) => sum + stock.avg * stock.qty,
  0
);
const currentValue = allHoldings.reduce(
  (sum, stock) => sum + stock.price * stock.qty,
  0
);
const totalPL = currentValue - totalInvestment;
const plPercent = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);



  return (
    <>
  
      



      <h3 className="title"> All Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          </thead>
          <tbody>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
          </tbody>
        </table>

       
      <div className="orders ">
        <h3 className="title mt-5"> NEW Orders  BUY placed! ({orderB.length})</h3>
        <div className="order-table" >
          <table>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Mode</th>
              <th>Price</th>
            </tr>

            {orderB.map((stock1, index) => {
              return (
                <tr key={index}>
                  <td>{stock1.name}</td>
                  <td>{stock1.qty}</td>
                  <td>{stock1.mode}</td>
                  <td>{stock1.price}</td>
                
                </tr>
              );
            })}
          </table>

        </div>


   <h3 className="title mt-5"> NEW Orders  Sell placed! ({orderS.length})</h3>
        <div className="order-table" >
          <table>
            <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              
              <th>Mode</th>
              <th>cheque</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>

            {orderS.map((stock2, index) => {
              return (
                <tr key={index}>
                  <td>{stock2.name}</td>
                  <td>{stock2.qty}</td>
                  <td>{stock2.mode}</td>
                  <td>{stock2.cheque}</td>
                  <td>{stock2.price}</td>

                
                
                </tr>
              );
            })}
            </tbody>
          </table>

      


      </div>
<div className="row">
  <div className="col">
    <h5>{formatINR(totalInvestment)}</h5>
    <p>Total investment</p>
  </div>
  <div className="col">
    <h5>{formatINR(currentValue)}</h5>
    <p>Current value</p>
  </div>
  <div className="col">
    <h5>
      {formatINR(totalPL)} ({plPercent}%)
    </h5>
    <p>P&L</p>
  </div>
</div>
    



          <VerticalGraph data={data} />
        </div>
      </div>
      

    </>
  
  );
};

export default Holdings;
