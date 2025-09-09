"use client"

import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const App = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [allExpanded, setAllExpanded] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: "⭐",
      description:
        "Ideal for multiple sites with storage, WordPress & Laravel features",
      monthlyPrice: "৳ 399",
      yearlyPrice: "৳ 3,595",
      isPopular: false,
      features: {
        "Features": [
          { text: "10 GB NVMe Storage", check: true },
          { text: "Increased Website Speed", check: true },
          { text: "5 Domain Hosted", check: true },
          { text: "Free .COM Domain", check: true },
          { text: "Lifetime Free SSL", check: true },
          { text: "One Click WordPress Install", check: true },
          { text: "Advanced Malware Scanner", check: true },
          { text: "Unlimited Bandwidth", check: true },
        ],
        "Primary": [
          { text: "Unlimited Subdomains", check: true },
          { text: "Unlimited Emails", check: true },
          { text: "Unlimited Databases", check: true },
          { text: "cPanel & WHM Control Panel", check: true },
          { text: "SitePad Website Builder", check: true },
          { text: "PHP & Laravel Support", check: true },
          { text: "Daily Backups", check: true },
        ],
        "Server": [
          { text: "1 GB Dedicated RAM", check: true },
          { text: "1 vCPU Core", check: true },
          { text: "30 Entry Processes", check: true },
          { text: "PHP Memory Limit: 512M", check: true },
          { text: "MySQL Databases", check: true },
          { text: "Inode Limit: 250,000", check: true },
        ],
        "Security": [
          { text: "Advanced Malware Scanner", check: true },
          { text: "Email Authentication", check: true },
          { text: "Two Factor Authentication", check: true },
          { text: "24/7 Security Monitoring", check: true },
          { text: "Automatic Backups", check: true },
          { text: "Free SSL Certificates", check: true },
        ],
        "Support": [
          { text: "24/7 Priority Email Support", check: true },
          { text: "30 Mins or Less Ticket Reply", check: true },
          { text: "24/7 Live Chat Support", check: true },
          { text: "Dedicated Account Manager", check: false },
          { text: "Daily Backups", check: true },
        ],
      },
    },
    {
      name: "Pro",
      icon: "🚀",
      description:
        "Best solution for eCommerce & product landing page websites",
      monthlyPrice: "৳ 549",
      yearlyPrice: "৳ 5,495",
      isPopular: true,
      features: {
        "Features": [
          { text: "20 GB NVMe Storage", check: true },
          { text: "Super Fast Website Speed", check: true },
          { text: "10 Domain Hosted", check: true },
          { text: "Free .COM Domain", check: true },
          { text: "Lifetime Free SSL", check: true },
          { text: "One Click WordPress Install", check: true },
          { text: "Advanced Malware Scanner", check: true },
          { text: "Unlimited Bandwidth", check: true },
        ],
        "Primary": [
          { text: "Unlimited Subdomains", check: true },
          { text: "Unlimited Emails", check: true },
          { text: "Unlimited Databases", check: true },
          { text: "cPanel & WHM Control Panel", check: true },
          { text: "SitePad Website Builder", check: true },
          { text: "PHP & Laravel Support", check: true },
          { text: "Free Site Migration", check: true },
          { text: "Daily Backups", check: true },
        ],
        "Server": [
          { text: "2 GB Dedicated RAM", check: true },
          { text: "2 vCPU Cores", check: true },
          { text: "45 Entry Processes", check: true },
          { text: "PHP Memory Limit: 1024M", check: true },
          { text: "MySQL Databases", check: true },
          { text: "Inode Limit: 500,000", check: true },
        ],
        "Security": [
          { text: "Advanced Malware Scanner", check: true },
          { text: "Email Authentication", check: true },
          { text: "Two Factor Authentication", check: true },
          { text: "24/7 Security Monitoring", check: true },
          { text: "Automatic Backups", check: true },
          { text: "Free SSL Certificates", check: true },
        ],
        "Support": [
          { text: "24/7 Priority Email Support", check: true },
          { text: "30 Mins or Less Ticket Reply", check: true },
          { text: "24/7 Live Chat Support", check: true },
          { text: "Dedicated Account Manager", check: false },
          { text: "Daily Backups", check: true },
        ],
      },
    },
    {
      name: "Ultimate",
      icon: "🔥",
      description:
        "Great for businesses with high traffic and focused on advertising",
      monthlyPrice: "৳ 799",
      yearlyPrice: "৳ 7,995",
      isPopular: false,
      features: {
        "Features": [
          { text: "50 GB NVMe Storage", check: true },
          { text: "Maximize Website Speed", check: true },
          { text: "Unlimited Domain Hosted", check: true },
          { text: "Free .COM Domain", check: true },
          { text: "Lifetime Free SSL", check: true },
          { text: "One Click WordPress Install", check: true },
          { text: "Advanced Malware Scanner", check: true },
          { text: "Unlimited Bandwidth", check: true },
        ],
        "Primary": [
          { text: "Unlimited Subdomains", check: true },
          { text: "Unlimited Emails", check: true },
          { text: "Unlimited Databases", check: true },
          { text: "cPanel & WHM Control Panel", check: true },
          { text: "SitePad Website Builder", check: true },
          { text: "PHP & Laravel Support", check: true },
          { text: "Dedicated Account Manager", check: true },
          { text: "Daily Backups", check: true },
        ],
        "Server": [
          { text: "4 GB Dedicated RAM", check: true },
          { text: "4 vCPU Cores", check: true },
          { text: "60 Entry Processes", check: true },
          { text: "PHP Memory Limit: 2048M", check: true },
          { text: "MySQL Databases", check: true },
          { text: "Inode Limit: 1,000,000", check: true },
        ],
        "Security": [
          { text: "Advanced Malware Scanner", check: true },
          { text: "Email Authentication", check: true },
          { text: "Two Factor Authentication", check: true },
          { text: "24/7 Security Monitoring", check: true },
          { text: "Automatic Backups", check: true },
          { text: "Free SSL Certificates", check: true },
        ],
        "Support": [
          { text: "24/7 Priority Email Support", check: true },
          { text: "30 Mins or Less Ticket Reply", check: true },
          { text: "24/7 Live Chat Support", check: true },
          { text: "Dedicated Account Manager", check: true },
          { text: "Daily Backups", check: true },
        ],
      },
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Choose Your Perfect Plan
        </h1>
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex space-x-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Yearly <span className="ml-1 text-green-300 text-xs">Save 76%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isExpanded = allExpanded;
            const featuresToDisplay = isExpanded 
              ? plan.features
              : { "Features": plan.features["Features"] };

            return (
              <div
                key={idx}
                className={`rounded-2xl border shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center ${
                  plan.isPopular
                    ? "border-blue-600 relative bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="flex flex-col items-center mb-6">
                  <span className="text-3xl">{plan.icon}</span>
                  <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                </div>

                <div className="mb-4">
                  <p className="text-4xl font-extrabold text-blue-600">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    per {billingCycle}
                  </p>
                </div>

                <div className="bg-green-100 text-green-700 text-sm font-medium py-2 px-4 rounded-lg mb-4 w-full">
                  30 Days Money back Guarantee
                </div>

                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Add to Cart
                </button>

                <div className="w-full text-left mt-6 flex-1">
                  {Object.entries(featuresToDisplay).map(([sectionTitle, featureList], sectionIdx) => (
                    <div key={sectionIdx} className="mb-4">
                      <h4 className="font-semibold mb-2">{sectionTitle}</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {featureList.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-center gap-2">
                            {feature.check ? (
                              <CheckCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            ) : (
                              <XCircleIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="w-full flex justify-center mt-auto pt-4">
                  <button
                    onClick={() => setAllExpanded(!allExpanded)}
                    className="text-blue-600 font-medium text-sm hover:underline"
                  >
                    {allExpanded ? "Show Less Features" : "Show More Features"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
