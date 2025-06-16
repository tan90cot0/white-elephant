import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, Camera, Calendar } from 'lucide-react';

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

  const quickLinks = [
    {
      title: 'Family Timeline',
      description: 'Explore our cherished memories and milestones',
      icon: Clock,
      path: '/timeline',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Photo Gallery',
      description: 'Browse through our beautiful moments captured',
      icon: Camera,
      path: '/gallery',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'About Our Family',
      description: 'Get to know each member of the SAAJ family',
      icon: Users,
      path: '/about',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Family Calendar',
      description: 'Keep track of important dates and events',
      icon: Calendar,
      path: '/calendar',
      color: 'from-orange-500 to-red-500'
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

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Family World</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive into different sections of our family website and discover the moments that make us who we are.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                        {link.title}
                      </h3>
                      <p className="text-gray-600">{link.description}</p>
                      <div className="flex items-center mt-3 text-primary-600 font-medium">
                        <span className="text-sm">Explore</span>
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 