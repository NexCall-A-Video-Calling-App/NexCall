
import React from 'react';
import { Link } from 'react-router-dom';

const PricingPlans = () => {

    const pricingPlans = [
        {
            name: "Basic",
            price: "Free",
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
            price: "$15/month",
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
            price: "$30/month",
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
        <div id='pricing-plans' className="p-2 mb-10">
            <h2 className="text-3xl font-bold text-center mb-8">Our Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`rounded-2xl shadow-md border-2 ${plan.border} ${plan.bg} p-6 flex flex-col justify-between`}
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-center">{plan.name}</h3>
                            <p className="text-2xl font-bold text-center mb-4">{plan.price}</p>
                            <ul className="space-y-2 text-sm">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="text-primary mr-2 mt-0.5">✔</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link  to={'/payment'} state={{price:plan.price}} className="mt-6 bg-primary text-white py-2 rounded-xl hover:bg-primary/90 transition-all duration-300">
                            {plan.buttonText}
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PricingPlans;
