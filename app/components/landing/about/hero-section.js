import Image from "next/image";

export default function HeroSection() {
    return (
      <section className=" py-12 lg:py-20">
        <div className="container  px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6">
                About <span className="text-orange-500">Martstick</span>
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl mb-6 leading-relaxed">
                A revolution in the e-commerce industry since 2022. The best online shopping experience.
              </p>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                Martstick Multivendor E-Commerce gives you a chance to quickly and easily find the product you want and
                have it delivered to your home in no time, wherever you are, giving you the best online shopping
                experience.
              </p>
            </div>
  
            {/* Right Image */}
            <div className="flex-1 bg-gradient-to-r from-[#ffff] to-[#d9d9d9] flex justify-center lg:justify-end">
              <div className="flex justify-center items-center">
                <Image
                  src="/about.png"
                  alt="Happy customer pointing"
                  width={1000}
                  height={1000}
                  className="w-80 h-96 lg:w-96 lg:h-[450px] object-cover rounded-lgflex justify-center items-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  