import React from "react";
import Image from "next/image";

const CardSection = () => {
  const cards = [
    {
      icon: "/hero/1.svg",
      title: "Fastest Loading Speed",
      description:
        "You create your website and we take care of the rest. This is the promise of NVMe SSD of super fast enhanced website performance.",
    },
    {
      icon: "/hero/2.svg",
      title: "24/7 Dedicated Support",
      description:
        "We provide 24/7 LiveChat support for you to help anytime you need. Support is provided through calls, chat, and ticket systems.",
    },
    {
      icon: "/hero/3.svg",
      title: "99.9% Uptime Guarantee",
      description:
        "There is no way a professional website can go down. Stay always online with our web hosting with a 99.9% uptime guarantee.",
    },
  ];

  return (
    <div className="hostin-container px-4 -mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300"
        >
          {/* Icon circle */}
          <div className="bg-white shadow-md rounded-full p-3 mb-4">
            <Image
              src={card.icon}
              alt={card.title}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
