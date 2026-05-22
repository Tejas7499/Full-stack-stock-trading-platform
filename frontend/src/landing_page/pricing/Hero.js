import React from 'react';

function Hero() {
    return ( 
        <div className='container'>
            <div className='row p-5 mt-5 border-bottom text-center'>
                <h1>Pricing</h1>
                <h3 className='text-muted mt-3 fs-5'>Free equity investment and flat ₹20 intraday and F&O trades</h3>
            </div>
            <div className='row p-5 mt-5 border-bottom'>
                <div className='col-4 text-center p-4'>
                    <img src='media/images/pricingEquity.svg'/>
                    <h3>Free equity delivery</h3>
                    <p className='text-muted text-small'>All equity delivery investments (NSE, BSE), <br/>are absolutely free - ₹0 brokerage.</p>
                </div>
                <div className='col-4 text-center p-4'>
                    <img src='media/images/intradayTrades.svg'/>
                    <h3>Intraday and F&O trades</h3>
                    <p className='text-muted text-small'>Flat Rs. 20 or 0.03%(whichever is lower)<br/> per executed order on intraday trades<br/> across equity, currency and commodity<br/> trades.</p>
                </div>
                <div className='col-4 text-center p-4'>
                    <img src='media/images/pricingEquity.svg'/>
                    <h3>Free direct MF</h3>
                    <p className='text-muted text-small'>All direct mutual fund investments are<br/> absolutely free - ₹ 0 commissions & DP<br/> charges.</p>
                </div>
            </div>
        </div>
     );
}

export default Hero;