import React from 'react';
import Banner from './components/Banner';
import Schedule from './components/Schedule';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import GetStarted from './components/GettingStart';
import FAQ from './components/Faq';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto  bg-base-200'>
            <Banner />
            <Schedule />
            <FeaturesSection />
            <AboutSection />
            <GetStarted />
            <FAQ />
        </div>
    );
};

export default Home;