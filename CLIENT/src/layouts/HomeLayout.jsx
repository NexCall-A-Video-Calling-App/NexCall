import React from 'react';
import Banner from '../pages/Home/Banner';
import Schedule from '../pages/Home/Schedule';
import Features from '../pages/Home/Features';
import About from '../pages/Home/About';
import GetStarted from '../pages/Home/GettingStart';
import FAQ from '../pages/Home/Faq';
import PricingPlans from '../pages/PricingPlans/PricingPlans';

const HomeLayout = () => {
    return (
        <div className='container mx-auto'>
            <Banner />
            <About />
            <Schedule />
            <Features />
            <GetStarted />
            <FAQ />
            <PricingPlans />
        </div>
    );
};

export default HomeLayout;