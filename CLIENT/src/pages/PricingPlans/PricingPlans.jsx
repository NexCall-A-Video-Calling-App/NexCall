
import React from 'react';
import { Link } from 'react-router-dom';

const PricingPlans = () => {

    const pricingPlans = [
        {
            name: "Basic",
            price: 0.00,
            buttonText: "Get Started",
            features: [
                "1:1 Video Call (Max 40 mins per call)",
                "Group Call (Max 40 mins per call)",
                "Screen Sharing",
                "End-to-End Encryption",
                "Text Messaging (Max 80 messages per session)",
                "View Chat History (Last 3 days)",
                "Chat Download (Last 10 messages)",
            ],
            bg: "bg-green-100",
            border: "border-green-400"
        },
        {
            name: "Premium",
            price: 15.00,
            buttonText: "Upgrade to Premium",
            features: [
                "1:1 Video Call (Max 1 hour 20 mins per calls)",
                "Group Call (Max 1 hour 20 mins per calls)",
                "Screen Sharing",
                "End-to-End Encryption",
                "Text Messaging (Max 150 messages per session)",
                "View Chat History (Last 30 days)",
                "Chat Download (Full session)",
            ],
            bg: "bg-yellow-100",
            border: "border-yellow-400"
        },
        {
            name: "Diamond",
            price: 30.00,
            buttonText: "Go Diamond",
            features: [
                "All Premium Features",
                "Unlimited 1:1 Video Call",
                "Unlimited Group Call",
                "Screen Sharing",
                "Call Recording",
                "End-to-End Encryption",
                "Unlimited Messaging",
                "View All Chat History",
                "Chat Download (Unlimited)",
                "Ads Free"
            ],
            bg: "bg-blue-100",
            border: "border-blue-400"
        }
    ];


    return (
        <div className="bg-[#151515]">
            <div id='pricing-plans' className="py-10 container mx-auto md:w-11/12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Our{" "}
                        <span className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent">
                            Plans
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your communication needs
                    </p>
                </div>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`shadow-md bg-[#12161f] p-6 flex flex-col justify-between text-white`}
                        >
                            <div>
                                <div className="w-full flex justify-center">
                                    <h3 className="text-3xl font-bold mb-2 animated-gradient-text">{plan.name}</h3>
                                </div>
                                <p className="text-2xl font-bold text-center mb-4">${plan.price}/month</p>
                                <ul className="space-y-2 text-sm">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-[17px] pb-2">
                                            <span className="text-primary mr-2 mt-0.5">✔</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <div className='btn bg-gradient-to-r from-[#32c6fc] to-[#8659d3] border-none'>
                                <Link to={'/payment'} state={{ price: plan.price, name: plan.name }} >
                                    
                                </Link>
                            </div> */}
                            <Link to={'/payment'} className='btn bg-gradient-to-r from-[#32c6fc] to-[#8659d3] border-none'>
                                <div className='!font-semibold text-white !rounded-none'>
                                    {plan.buttonText}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PricingPlans;