import React from 'react';
function Hero() {
    return ( 
       <div className='container text-center '>
        
            <div className='row mt-5 p-5 border-bottom'>
           <h1 className=' fs-4 mb-3'>Pricing</h1>
            <h3 className="text-muted mt-3  fs-5  ">
          Free equity investments and flat ₹20 traday and F&O trades
        </h3>
        </div>
        <div className='row mt-5 p-5 flex' >
            <div className='col-4  p-4  '>
                <img src='media/images/pricing0.svg' alt='pricing' />
                <h1 className='fs-4'>Free equity delivery</h1>
            
                <p className='text-muted fs-5' > All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.</p>

            </div>
            <div className='col-4  p-4'>
                 <img src='media/images/intradayTrades.svg' alt='pricingEquity'/>
                 <h1 className='fs-4'>Intraday and F&O trades</h1>
               <p className='text-muted f-5'> Flat Rs. 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades.</p>

            </div>
            <div className='col-4  p-4'>
                 <img src='media/images/pricing0.svg' alt='intradayTrades'/>
                 <h1 className='fs-4'>Free direct MF</h1>
                <p className='text-muted fs-5'> All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.</p>
            </div>
        </div>
        </div>
    
     );
}

export default Hero;