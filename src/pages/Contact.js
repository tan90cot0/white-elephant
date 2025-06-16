import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Contact = () => {
  const familyContacts = [
    {
      name: "Jitesh",
      role: "Father",
      email: "jitesh.saaj@email.com",
      phone: "+1 (555) 123-4567",
      bio: "Always available for a chat or if you need any fatherly advice!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: {
        linkedin: "https://linkedin.com/in/jitesh-saaj"
      },
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Anju",
      role: "Mother",
      email: "anju.saaj@email.com",
      phone: "+1 (555) 123-4568",
      bio: "Feel free to reach out anytime - I love connecting with people!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c68e9b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: {
        instagram: "https://instagram.com/anju.saaj"
      },
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Aryan",
      role: "Elder Son & Web Developer",
      email: "aryan.saaj@email.com",
      phone: "+1 (555) 123-4569",
      bio: "Tech enthusiast and creator of this website. Let's connect and talk tech!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: {
        github: "https://github.com/aryan-saaj",
        linkedin: "https://linkedin.com/in/aryan-saaj",
        twitter: "https://twitter.com/aryan_saaj"
      },
      gradient: "from-purple-500 to-violet-600"
    },
    {
      name: "Sparsh",
      role: "Younger Son",
      email: "sparsh.saaj@email.com",
      phone: "+1 (555) 123-4570",
      bio: "The youngest but always up for making new friends and connections!",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: {
        instagram: "https://instagram.com/sparsh_saaj",
        twitter: "https://twitter.com/sparsh_saaj"
      },
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  const getSocialIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      github: Github
    };
    return icons[platform] || MessageCircle;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you're a friend, family member, or just someone who stumbled upon our little corner of the internet, 
            don't hesitate to reach out to any of us.
          </p>
        </div>

        {/* Family Address */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin size={32} className="mr-3" />
              <h2 className="text-2xl font-bold">The SAAJ Family Home</h2>
            </div>
            <p className="text-lg opacity-90 mb-2">
              123 Family Lane, Happiness Valley
            </p>
            <p className="text-lg opacity-90 mb-4">
              Love City, LC 12345, United States
            </p>
            <p className="text-sm opacity-80">
              Our door is always open for friends and family! ❤️
            </p>
          </div>
        </div>

        {/* Individual Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {familyContacts.map((contact, index) => (
            <div key={contact.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-24 bg-gradient-to-r ${contact.gradient}`}></div>
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="absolute -top-12 left-6">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${contact.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-sm font-bold">{contact.name[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-16">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{contact.name}</h3>
                  <p className={`text-sm font-medium bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent mb-3`}>
                    {contact.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {contact.bio}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-3 text-primary-600" />
                      <a href={`mailto:${contact.email}`} className="hover:text-primary-600 transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-3 text-primary-600" />
                      <a href={`tel:${contact.phone}`} className="hover:text-primary-600 transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex space-x-3">
                    {Object.entries(contact.social).map(([platform, url]) => {
                      const IconComponent = getSocialIcon(platform);
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
                        >
                          <IconComponent size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-gray-600">
              Have something to say? We'd love to hear from you! Drop us a message and we'll get back to you as soon as we can.
            </p>
          </div>

          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Fun Family Note */}
        <div className="mt-12 text-center bg-primary-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">A Note from the SAAJ Family</h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Thank you for taking the time to visit our family website! Whether you're here to catch up with us, 
            learn more about our adventures, or just browsing around, we're thrilled to have you. 
            Our family believes in the power of connections, stories, and shared experiences. 
            Don't be a stranger - we'd love to be part of your story too! 
          </p>
          <div className="mt-6 text-2xl">
            💖 With love, The SAAJ Family 💖
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 