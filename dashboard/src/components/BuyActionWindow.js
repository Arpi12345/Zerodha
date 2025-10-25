import React, { useState} from "react";


import axios from "axios";

import useGeneralContext from "./useGeneralContext";

import "./BuyActionWindow.css";



const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { username,closeBuyWindow} = useGeneralContext();
    const api = process.env.REACT_APP_API_URL;

  const handleBuyClick = () => {
    axios.post(`${api}/Orders`,{
    name: uid,
    price: stockPrice,
    qty: stockQuantity,
    mode: "Buy",
    username
    });

   closeBuyWindow();
  };
   const handleCancelClick = () => {
   
    closeBuyWindow();
  };

  



  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
</div>


    </div>


  )  
};

export default BuyActionWindow ;






