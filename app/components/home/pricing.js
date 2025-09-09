"use client";
import React, { useState } from "react";

const PricingPlan = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // default active monthly
  const [expanded, setExpanded] = useState({}); // track expanded state per plan

  const plans = [
    {
      name: "Starter",
      icon: "⭐",
      description:
        "Ideal for multiple sites with storage, WordPress & Laravel features",
      monthlyPrice: "৳ 399",
      yearlyPrice: "৳ 3,595",
      features: [
        "10 GB NVMe Storage",
        "Increased Website Speed",
        "5 Domain Hosted",
        "Free .COM Domain",
        "Lifetime Free SSL",
        "One Click WordPress Install",
        "Advanced Malware Scanner",
        "Unlimited Bandwidth",
        "Priority Email Support",
        "Daily Backups",
      ],
    },
    {
      name: "Pro",
      icon: "🚀",
      description:
        "Best solution for eCommerce & product landing page websites",
      monthlyPrice: "৳ 549",
      yearlyPrice: "৳ 5,495",
      features: [
        "20 GB NVMe Storage",
        "Super Fast Website Speed",
        "10 Domain Hosted",
        "Free .COM Domain",
        "Lifetime Free SSL",
        "One Click WordPress Install",
        "Advanced Malware Scanner",
        "Unlimited Bandwidth",
        "Free Site Migration",
        "Daily Backups",
      ],
    },
    {
      name: "Ultimate",
      icon: "🔥",
      description:
        "Great for businesses with high traffic and focused on advertising",
      monthlyPrice: "৳ 799",
      yearlyPrice: "৳ 7,995",
      features: [
        "50 GB NVMe Storage",
        "Maximize Website Speed",
        "Unlimited Domain Hosted",
        "Free .COM Domain",
        "Lifetime Free SSL",
        "One Click WordPress Install",
        "Advanced Malware Scanner",
        "Unlimited Bandwidth",
        "Dedicated Account Manager",
        "Daily Backups",
      ],
    },
  ];

  const toggleFeatures = (planName) => {
    setExpanded((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Choose Your Perfect Plan
      </h2>

      {/* Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="bg-gray-100 rounded-full p-1 flex space-x-2">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Yearly <span className="ml-1 text-green-500 text-sm">Save 76%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => {
          const isExpanded = expanded[plan.name] || false;
          const featuresToShow = isExpanded
            ? plan.features
            : plan.features.slice(0, 7);

          return (
            <div
              key={idx}
              className={`rounded-2xl border shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col ${
                plan.name === "Pro"
                  ? "border-blue-600 relative"
                  : "border-gray-200"
              }`}
            >
              {plan.name === "Pro" && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="flex flex-col items-center mb-6">
                <span className="text-3xl">{plan.icon}</span>
                <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm text-center mt-2">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-blue-600">
                  {billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                  <span className="text-base font-medium text-gray-600">
                    {" "}
                    /{billingCycle}
                  </span>
                </p>
              </div>

              {/* Guarantee */}
              <div className="bg-green-100 text-green-700 text-sm font-medium text-center py-2 rounded-lg mb-4">
                30 Days Money back Guarantee
              </div>

              {/* Button */}
              <button
                className={`w-full rounded-lg py-3 font-semibold transition-all ${
                  plan.name === "Pro"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                Add to Cart
              </button>

              {/* Features */}
              <div className="mt-6 flex-1">
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {featuresToShow.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>

                {/* Toggle Features */}
                {plan.features.length > 7 && (
                  <button
                    onClick={() => toggleFeatures(plan.name)}
                    className="mt-3 text-blue-600 font-medium text-sm hover:underline"
                  >
                    {isExpanded ? "Show Less" : "See More Features"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingPlan;
