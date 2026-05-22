import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";  

function ProductsPage() {
    return(
        <div>
            <Hero/>
            <LeftSection 
                imageURL="media/images/kite.png"
                productName="Kite"
                productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your android and iOP devices."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />
            <RightSection
                imageURL="media/images/console.png"
                productName="Console"
                productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investment with in-depth reports and visualisations."
                tryDemo=""
                learnMore=""
            />
            <LeftSection 
                imageURL="media/images/coin.png"
                productName="Coin"
                productDescription="Buy direct mutual funds online, commission free, delivered directly to your Demat account. Enjoy the investment experience on your android and iOS devices."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />
            <RightSection
                imageURL="media/images/kiteconnect.png"
                productName="Kite Connect API"
                productDescription="Build poerful trading platforms and experiences with our super simple HTTP/JSON API. If you are a startup, nuild your investment app and showcase it to our clientbase."
                tryDemo=""
                learnMore=""
            />
            <LeftSection 
                imageURL="media/images/varsity.png"
                productName="Varsity mobile"
                productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into the bite-size cards to help you learn on the go."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />
            <p className='text-center mt-5 mb-5'>Want to know more about our technology stack? Check out the zerodha.tech blog.</p>
            <Universe/>
        </div>
    );
}

export default ProductsPage;