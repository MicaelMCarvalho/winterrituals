import React from 'react';

const Home: React.FC = () => {
  const categories = [
    {
      title: "Interactive Map",
      description: "Explore festivals across the Iberian Peninsula",
      image: "/api/placeholder/600/400",
      link: "#"
    },
    {
      title: "Cultural Stories",
      description: "Discover the rich history behind each tradition",
      image: "/api/placeholder/600/400",
      link: "#"
    },
    {
      title: "Local Traditions",
      description: "Learn about authentic regional celebrations",
      image: "/api/placeholder/600/400",
      link: "#"
    },
    {
      title: "Community",
      description: "Connect with fellow tradition enthusiasts",
      image: "/api/placeholder/600/400",
      link: "#"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] -mt-8 mb-12">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/500"
            alt="Winter festivities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/40"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Iberian Winter Traditions
            </h1>
            <p className="text-xl mb-8">
              Explore the rich cultural heritage of winter festivities across Portugal and Spain
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Start Exploring
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <a 
                key={index}
                href={category.link}
                className="group block"
              >
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Featured Story</h2>
              <p className="text-gray-600">
                Discover how ancient winter rituals have evolved into modern-day celebrations,
                keeping cultural heritage alive through generations.
              </p>
              <button className="text-gray-900 font-medium hover:underline">
                Read more →
              </button>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/800/450"
                alt="Featured story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our newsletter to receive updates about upcoming festivals and cultural events
            across the Iberian Peninsula.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900"
            />
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
