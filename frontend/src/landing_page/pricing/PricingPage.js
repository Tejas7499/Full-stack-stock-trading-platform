import React from 'react';
import Hero from './Hero';
import OpenAccount from '../OpenAccount';
import Brokerage from './Brokerage';

function PricingPage() {
    return ( 
        <div className='container'>
            <Hero />
            <OpenAccount />
            <Brokerage />
        </div>
     );
}

export default PricingPage;