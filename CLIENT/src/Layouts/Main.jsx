import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto mt-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
