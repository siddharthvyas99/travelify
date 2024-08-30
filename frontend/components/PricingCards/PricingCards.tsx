import React from "react";

const PricingCards = () => {
  const cardData = [
    {
      image: "https://i.imgur.com/Ql4jRdB.png",
      title: "Silver",
      price: "$249",
      features: ["1 person", "1 trip", "India"],
    },
    {
      image: "https://i.imgur.com/pJNFEHR.png",
      title: "Gold",
      price: "$549",
      features: ["2 persons", "1 trip", "India"],
    },
    {
      image: "https://i.imgur.com/Hg0sUJP.png",
      title: "Platinum",
      price: "$1999",
      features: ["5 & more persons", "Unlimited trips", "The whole World"],
      discount: "20% OFF", // Added discount tag for the Platinum card
    },
  ];
  return (
    <div id="pricing">
      <h1 className="flex flexCenter bg-opacity-50 bg-white p-8 rounded-3xl text-black font-bold mb-4 lg:m-10 regular-24 xl:regular-40">
        Pricing
      </h1>
      <div className="w-full py-[6rem] px-4 bg-white">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`relative w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ${
                card?.discount ? "border-2 border-[#00df9a]" : ""
              }`}
            >
              <img
                className="w-20 mx-auto mt-[-3rem] bg-white"
                src={card.image}
                alt="/"
              />
              <h2 className="text-2xl font-bold text-center py-8">
                {card.title}
              </h2>
              <p className="text-center text-4xl font-bold">{card.price}</p>
              <div className="text-center font-medium">
                {card.features.map((feature, index) => (
                  <p
                    key={index}
                    className={`py-2 border-b mx-8 ${
                      index === 0 ? "mt-8" : ""
                    }`}
                  >
                    {feature}
                  </p>
                ))}
              </div>
              <button
                className={`bg-[#00df9a] hover:text-[#00df9a] hover:bg-gray-50 duration-150 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
              >
                Check it
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
