import React from 'react';
import Banner from '../pages/Home/Banner';
import Schedule from '../pages/Home/Schedule';
import Features from '../pages/Home/Features';
import About from '../pages/Home/About';
import GetStarted from '../pages/Home/GettingStart';
import FAQ from '../pages/Home/Faq';

const HomeLayout = () => {
    return (
        <div className='container mx-auto'>
            <Banner />
            <Schedule />
            <Features />
            <About />
            <GetStarted />
            <FAQ />
        </div>
    );
};

export default HomeLayout;