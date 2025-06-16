export default function CtaSection() {
    return (
      <section className=" py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-blue-600 text-lg lg:text-xl font-semibold mb-2">Join Us Today</h3>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-6">
                Trusted by millions from
                <br />
                all <span className="text-orange-500">around the world!</span>
              </h2>
              <p className="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed">
                Our dedicated team works with among the best courier services in the world making sure your product is
                delivered safe and on time.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 lg:px-10 lg:py-4 rounded-lg text-lg transition-colors duration-300">
                Join Martstick
              </button>
            </div>
  
            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=350"
                  alt="Happy delivery person giving thumbs up"
                  className="w-80 h-96 lg:w-96 lg:h-[450px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  