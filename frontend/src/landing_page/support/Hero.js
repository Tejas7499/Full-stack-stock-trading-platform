import React from 'react';

function Hero() {
    return ( 
        <div className="container-fluid" id="SupportHero">
            <div className="p-5" id="SupportWrapper">
                <h4>Support Portal</h4>
                <a href="">Track Tickets</a>
            </div>
            <div className="row" id="SupportContent">
                <div className="col-6">
                    <h1 className="fs-3">Search for an answer or browse help topics to create a ticket</h1>
                    <input placeholder='Eg: how do i activate F&O, why is my order getting rejected' className='m-3'/><br/>
                    <a href="">Track account opening</a>
                    <a href="">Track segment activation</a>
                    <a href="">Intraday</a><br/>
                    <a href="">Margins</a>
                    <a href="">Kite user manual</a>
                </div>
                <div className="col-6">
                    <h1 className="fs-3">Featured</h1>
                    <ol>
                        <li className='mb-3'><a href="">Current Takeovers and Delisting - January 2024</a></li>
                        <li><a href="">Latest intraday leverages - MIS & CO className="fs-4"</a></li>
                    </ol>
                </div>
            </div>
        </div>
     );
}

export default Hero;