"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Hero = () => {
  // Target countdown date (example: 24 hours from now)
  const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Card component
  const renderCard = (value, label) => (
    <div className="bg-white text-blue-900 rounded-lg flex flex-col items-center justify-center shadow-md w-[104px] h-[97px] sm:w-[90px] sm:h-[85px]">
      <p className="text-2xl font-bold">{value.toString().padStart(2, "0")}</p>
      <p className="text-sm">{label}</p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Flash Sale Bar */}
      <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-2 text-sm">
        <p className="font-semibold">
          24-Hour Flash Sale! Get 76% off Hosting plans + free Domain & SSL!
        </p>
        <div className="flex items-center space-x-2">
          {/* Top Countdown */}
          <div className="bg-white text-blue-600 rounded px-2 py-1 text-xs font-bold">
            {timeLeft.hours} Hour
          </div>
          <div className="bg-white text-blue-600 rounded px-2 py-1 text-xs font-bold">
            {timeLeft.minutes} Min
          </div>
          <div className="bg-white text-blue-600 rounded px-2 py-1 text-xs font-bold">
            {timeLeft.seconds} Sec
          </div>
          <a href="#" className="underline ml-2">
            View Details
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-6 md:py-12 px-2 md:px-16 !pb-40">
        <div className="hostin-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <p className="text-yellow-400 text-base lg:text-xl font-semibold mb-2">
              Expertly Crafted for Online Businesses
            </p>
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold leading-snug lg:leading-[60px]">
              Get Fastest Hosting <br /> Up to 76% Discount
            </h1>

            <ul className="mt-6 space-y-3 text-lg">
              <li>✔ Free .COM Domain on Trinnially</li>
              <li>✔ Genuine & Latest Control Panel</li>
              <li>✔ Free WildCard SSL for Lifetime</li>
            </ul>

            {/* Dynamic Countdown */}
            <div className="flex space-x-3 mt-8">
              {renderCard(timeLeft.days, "Days")}
              {renderCard(timeLeft.hours, "Hours")}
              {renderCard(timeLeft.minutes, "Minutes")}
              {renderCard(timeLeft.seconds, "Seconds")}
            </div>

            {/* CTA Button */}
            <button className="hover:scale-105 transition-all duration-300 border-2 border-blue-400 mt-5 md:mt-8 lg:mt-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg">
              ⚡ Claim Offer Now
            </button>
          </div>

          {/* Right Image / Illustration */}
          <div className="flex justify-center">
            <Image
              width={1000}
              height={1000}
              src="/hero/hero.png"
              alt="Hosting Servers"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
