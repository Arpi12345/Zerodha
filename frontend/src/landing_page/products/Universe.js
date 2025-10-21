import React from 'react';
import { useNavigate } from "react-router-dom";

function Universe() {
    const navigate = useNavigate();


  const handleOpenAccountClick = (e) => { 
    e.preventDefault();
    navigate("/signup")
  }
    return ( <div className='container text-center mt-5 p-5'>
        <div className='row p-5'>
            <h1 className='fs-4'>The Zerodha Universe</h1>
            <p className='mt-3 fs-6 text-muted'> Extend your trading and investment experience even further with our
          partner platforms</p>
         
          <div className='col-4 mt-5 p-3'>
            <img src='media/images/smallcaseLogo.png' style={{width: "30%" }} alt="smallcaseLogo" />
            <p className='mt-3 text-small text-muted '>Thematic investment platform</p>
          </div>
           <div className='col-4  mt-5 p-3'>
             <img src='media/images/streakLogo.png' style={{width: "30%"}} alt="streakLogo" />
            <p className='mt-3 text-small text-muted'> Alog & strategy platform</p>
           </div>
            <div className='col-4  mt-5 p-3'>
                 <img src='media/images/sensibullLogo.svg' style={{width: "30%"}} alt="sensibullLogo" />
            <p className='mt-3 text-small text-muted'> Op</p>
            </div>
            <div className='col-4 mt-3  p-3'>
                 <img src='media/images/zerodhaFundhouse.png' style={{width: "30%"}} alt="zerodhaFundhouse" />
            <p className='mt-3 text-small text-muted'> Asset management</p>
            </div>
            <div className='col-4  mt-3 p-3'>
                 <img src='media/images/goldenpiLogo.png' style={{width: "30%"}} alt="goldenpiLogo" />
            <p className='mt-3 text-small text-muted'> Bonds trading platform</p>
            </div>
            <div className='col-4  mt-3 p-3'>
                 <img src='media/images/dittoLogo.png' style={{width: "30%"}} alt="dittoLogo" />
            <p className=' mt-3 text-small text-muted'> Insurance</p>
            </div>
        </div>
        <button
          className="p-2 btn btn-primary fs-5" type= "submit" onClick={handleOpenAccountClick}
          style={{ width: "20%", margin: "0 auto" }}
        >
          sign up now
        </button>

    </div>
        
     );
}

export default Universe; 