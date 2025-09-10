const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google Logo"
              className="h-6"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-xl">★★★★★</span>
          </div>
          <p className="mt-2 text-gray-700 font-medium">
            4.8 out of 5 based on 147+ reviews.
          </p>

          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">
            Hear from our happy customers
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Getting positive reviews from hundreds of clients means a lot to us.
            We care about every feedback and adjust our services accordingly.
          </p>

          {/* Avatars */}
          <div className="flex items-center mt-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="customer1"
              className="w-10 h-10 rounded-full border-2 border-white shadow -ml-0"
            />
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="customer2"
              className="w-10 h-10 rounded-full border-2 border-white shadow -ml-3"
            />
            <span className="ml-4 text-blue-600 cursor-pointer font-medium hover:underline">
              More Review
            </span>
          </div>
        </div>

        {/* Right Section - Testimonial */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Monayem Hossain"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Monayem Hossain
              </h3>
              <span className="text-yellow-400">★★★★★</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">
            I think that it's the best hosting site. Their service is very good.
            I am using the Premium Professional pack. It loads extremely
            quickly. They are very friendly. My love for them remained. The
            customer support team is exceptional and always responds promptly to
            any queries. The hosting performance exceeds my expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
