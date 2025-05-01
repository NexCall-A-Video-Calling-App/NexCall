import React from 'react';
import { FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLocationDot,FaPhoneVolume } from "react-icons/fa6"; 
import { IoIosMail } from "react-icons/io";
const Contact = () => {
    return (
        <div className='w-full bg-[#151515]'>
            <section className="py-20 px-8 container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Get in{" "}
                        <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and
                        we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-gray-900 bg-opacity-60 rounded-xl p-8 border border-gray-800">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc]"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc]"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject
                                </label>
                                <select className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc]">
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32c6fc] h-32"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>

                            <button className="w-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] text-white py-3 rounded-full hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 !rounded-button">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-8 border border-gray-800">
                            <h3 className="text-xl font-semibold mb-6 text-white">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="text-white w-12 h-12 rounded-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] flex items-center justify-center flex-shrink-0">
                                        <FaLocationDot/>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-white">Visit Us</h4>
                                        <p className="text-gray-400">
                                            123 Main Highway
                                            <br />
                                            Banani, Dhaka
                                            <br />
                                            Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="text-white w-12 h-12 rounded-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] flex items-center justify-center flex-shrink-0">
                                       <FaPhoneVolume/>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-white">Call Us</h4>
                                        <p className="text-gray-400">
                                            +8801515267655
                                            <br />
                                            Mon-Fri from 8am to 5pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="text-white w-12 h-12 rounded-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] flex items-center justify-center flex-shrink-0">
                                        <IoIosMail/>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-white">Email Us</h4>
                                        <p className="text-gray-400">
                                            support@nexcall.com
                                            <br />
                                            info@nexcall.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-8 border border-gray-800">
                            <h3 className="text-xl font-semibold mb-6 text-white">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="relative w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        <FaXTwitter />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </a>

                                <a
                                    href="#"
                                    className="relative w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        <FaGithub />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </a>
                                <a
                                    href="#"
                                    className="relative w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        <FaYoutube />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </a>
                                <a
                                    href="#"
                                    className="relative w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        <FaLinkedinIn />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </a>
                            </div>
                        </div>

                        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-8 border border-gray-800">
                            <h3 className="text-xl font-semibold mb-6">Business Hours</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Monday - Friday</span>
                                    <span className="text-white">8:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Saturday</span>
                                    <span className="text-white">10:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Sunday</span>
                                    <span className="text-white">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;