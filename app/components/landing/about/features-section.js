export default function FeaturesSection() {
    const features = [
      {
        icon: (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        ),
        title: "Over 1+ Million",
        subtitle: "Regular Customers",
        description: "You receive your product on time regardless of your location Conditions applied.",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 3V1h2v2h6V1h2v2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4zm0 2H3v16h18V5h-4v2h-2V5H9v2H7V5z" />
            </svg>
          </div>
        ),
        title: "Regulars",
        subtitle: "Offers & Discounts",
        description: "We are in collaboration with among the finest brands all around the both sellers",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        ),
        title: "International",
        subtitle: "Brands",
        description: "Our tools are designed based on the best e-commerce experience for both sellers",
      },
      {
        icon: (
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
        ),
        title: "Worldwide",
        subtitle: "Free Shipping",
        description: "You receive your product on time regardless of your location. Conditions applied.",
        highlighted: true,
      },
    ]
  
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-blue-600 text-lg lg:text-xl font-semibold mb-2">Our Specialties</h3>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">
              Eason you should shop from <span className="text-orange-500">Martstick</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-base lg:text-lg">
              Collective experience of our team members and the years we have spent in the business allowed us to develop
              a vast network of suppliers, ensuring that our customers will always find what they are looking for.
            </p>
          </div>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 lg:p-8 rounded-lg border-2 text-center ${
                  feature.highlighted ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"
                } hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">{feature.title}</h4>
                <h5 className="text-lg lg:text-xl font-semibold text-gray-700 mb-3">{feature.subtitle}</h5>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  