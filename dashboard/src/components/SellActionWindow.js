import React, { useState} from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useGeneralContext from "./useGeneralContext";



const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [chequeValue, setchequeValue] = useState(0.0);
  const { username, closeSellWindow } = useGeneralContext();
  
  const handlSellClick = () => {
    axios.post('http://localhost:3002/OrderSells',{
    name: uid,
    price: stockPrice,
    qty: stockQuantity,
    mode: "Sell",
    cheque: chequeValue,
    username:username,
    });

   closeSellWindow();
  };

  const handleCancelClick = () => {
 
  closeSellWindow();
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

          <fieldset>
            <legend>cheque</legend>
            <input
              type="number"
              name="cheque"
              id="cheque"
              onChange={(e) => setchequeValue(e.target.value)}
              value={chequeValue}
            />
          </fieldset>
        </div>
      </div>

  
        <div className="buttons">
          <span>Margin required ₹140.65</span>
          <div>
            <Link className="btn btn-blue" onClick={handlSellClick}>
              Sell
            </Link>
            <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </Link>
          </div>
  </div>
  
  
      </div>
  
  
    )  
};

export default SellActionWindow ;
