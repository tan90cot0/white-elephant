import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Camera, Calendar, Heart, MessageCircle, Sparkles, MapPin } from 'lucide-react';

const Home = () => {
  const familyMembers = [
    {
      name: 'Jitesh',
      role: 'Father',
      age: 50,
      emoji: '👨‍💼',
      description: 'The wise patriarch of our family'
    },
    {
      name: 'Anju',
      role: 'Mother',
      age: 48,
      emoji: '👩‍🍳',
      description: 'The heart and soul of our home'
    },
    {
      name: 'Aryan',
      role: 'Elder Son',
      age: 'Adult',
      emoji: '👨‍💻',
      description: 'Tech enthusiast and family web developer'
    },
    {
      name: 'Sparsh',
      role: 'Younger Son',
      age: 18,
      emoji: '🎓',
      description: 'The energetic young spirit of our family'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">SAAJ</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A digital home for our family memories, stories, and the beautiful journey we share together. 
              Discover our timeline, browse through precious moments, and stay connected with the SAAJ family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/timeline"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Explore Timeline
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                View Gallery
                <Camera size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Family Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet the SAAJ Family</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four individuals, one beautiful family. Each bringing their unique personality and love to our shared story.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {member.emoji}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role} • {member.age}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Family World</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive into different sections of our family website and discover the moments that make us who we are.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Link to="/memories" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Memories & Timeline</h3>
                <p className="text-gray-600 mb-4">
                  Journey through our cherished family moments, celebrations, milestones, and stories that define us.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Explore our journey →
                </div>
              </div>
            </Link>

            <Link to="/gallery" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Photo Gallery</h3>
                <p className="text-gray-600 mb-4">
                  Browse through our beautiful collection of family photos organized in stunning albums.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  View photos →
                </div>
              </div>
            </Link>

            <Link to="/about" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">About Our Family</h3>
                <p className="text-gray-600 mb-4">
                  Get to know each member of the SAAJ family - our personalities, interests, and what makes us unique.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Meet the family →
                </div>
              </div>
            </Link>

            <Link to="/calendar" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Calendar & Meals</h3>
                <p className="text-gray-600 mb-4">
                  Keep track of important dates, plan family events, and organize our daily meals together.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Plan with us →
                </div>
              </div>
            </Link>

            <Link to="/chatbot" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Memory Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our AI assistant that knows all our family stories and can help with memories, events, and meals.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Start chatting →
                </div>
              </div>
            </Link>

            <Link to="/map" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Memory Map</h3>
                <p className="text-gray-600 mb-4">
                  Explore our family memories on an interactive map and see where our adventures took place.
                </p>
                <div className="text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Explore map →
                </div>
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg p-8 text-white text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Our Story</h3>
            <p className="text-white text-opacity-90 mb-4 max-w-2xl mx-auto">
              Welcome to the SAAJ family website - a digital home where we celebrate our bonds, preserve our memories, and plan our future together.
            </p>
            <div className="text-white font-medium">
              Made with ❤️ by Aryan • Maintained by SAAJ
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 