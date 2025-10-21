import React from 'react';
import { useNavigate } from "react-router-dom";

function OpenAccount() {
    const navigate = useNavigate();


  const handleOpenAccountClick = (e) => { 
    e.preventDefault();
    navigate("/signup")
    
    }
    return ( 
       <div className='container text-center mb-5 p-5'>
        <h1 className="mt-5">Open a Zerodha account</h1>
        <p>
           Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button type= "submit" onClick={handleOpenAccountClick}
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
         
        >
          Sign up Now
        </button>
       </div>

     );
}

export default OpenAccount;