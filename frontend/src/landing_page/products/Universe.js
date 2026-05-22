import React from 'react';
import { Link } from 'react-router-dom';

function Universe() {
    return(
        <div className='container mt-5'>
            <div className='row text-center'>
                <h1>The Zerodha Universe</h1>
                <p>Extend your trading and investment experience even further with our partner platforms</p>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/smallcaseLogo.png'/>
                    <p className='text-small text-muted'>Thematic Investment Platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/streakLogo.png' style={{ width: '40%'}}/>
                    <p className='text-small text-muted'>Algo and strategy platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/sensibullLogo.svg' style={{ width: '150px'}}/>
                    <p className='text-small text-muted'>Options trading platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/goldenpiLogo.png'/>
                    <p className='text-small text-muted'>Bonds trading platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/zerodhaFundhouse.png' style={{ width: '50%'}}/>
                    <p className='text-small text-muted'>Asset management</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/dittoLogo.png' style={{ width: '40%'}}/>
                    <p className='text-small text-muted'>Insurance</p>
                </div>
                <Link to="/signup">
                    <button className='btn btn-primary mt-5 mb-5' style={{width: "175px", height: "40px", margin: "auto", display: "block"}}>Sign up now</button>
                </Link>
            </div>
        </div>
    )
}

export default Universe;