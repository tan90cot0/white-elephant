import React from 'react';
import { MapPin, Briefcase, Heart, Star, Coffee, Book } from 'lucide-react';

const AboutUs = () => {
  const familyMembers = [
    {
      name: "Jitesh",
      role: "Father & Family Patriarch",
      age: 50,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The wise leader of our family, Jitesh brings stability, wisdom, and endless dad jokes to our household. With years of experience in his professional field, he's always ready with advice and a warm hug.",
      interests: ["Reading", "Gardening", "Cooking", "Technology"],
      favoriteQuote: "Family is not an important thing, it's everything.",
      funFact: "Can solve any technical problem and makes the best weekend pancakes!",
      personality: ["Wise", "Caring", "Funny", "Reliable"],
      icon: Briefcase,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Anju",
      role: "Mother & Heart of the Home",
      age: 48,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c68e9b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The nurturing soul of our family, Anju fills our home with love, delicious food, and endless care. She has an incredible ability to make everyone feel special and loved.",
      interests: ["Cooking", "Gardening", "Music", "Family Time"],
      favoriteQuote: "A mother's love is the fuel that enables a normal human being to do the impossible.",
      funFact: "Remembers everyone's favorite dishes and can whip up a feast in no time!",
      personality: ["Loving", "Nurturing", "Creative", "Strong"],
      icon: Heart,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Aryan",
      role: "Elder Son & Tech Enthusiast",
      age: "Adult",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The tech-savvy member of the family who created this website! Passionate about technology, always exploring new innovations, and loves connecting the family through digital experiences.",
      interests: ["Programming", "Photography", "Travel", "Music"],
      favoriteQuote: "Technology is best when it brings people together.",
      funFact: "Built this family website from scratch and is always updating it with new features!",
      personality: ["Creative", "Analytical", "Innovative", "Thoughtful"],
      icon: Coffee,
      gradient: "from-purple-500 to-violet-600"
    },
    {
      name: "Sparsh",
      role: "Younger Son & The Energizer",
      age: 18,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The youngest and most energetic member of our family! Just turned 18 and ready to take on the world. Brings joy, laughter, and youthful energy to every family gathering.",
      interests: ["Sports", "Gaming", "Music", "Friends"],
      favoriteQuote: "Life is short, make it sweet!",
      funFact: "Can beat everyone in the family at video games and always knows the latest trends!",
      personality: ["Energetic", "Funny", "Social", "Adventurous"],
      icon: Star,
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  const familyValues = [
    {
      title: "Love & Support",
      description: "We believe in unconditional love and supporting each other through thick and thin.",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Togetherness",
      description: "Family time is sacred time. We prioritize being together and creating memories.",
      icon: MapPin,
      color: "text-blue-500"
    },
    {
      title: "Growth & Learning",
      description: "We encourage each other to learn, grow, and pursue our individual passions.",
      icon: Book,
      color: "text-green-500"
    },
    {
      title: "Fun & Laughter",
      description: "Life is better with laughter. We don't take ourselves too seriously!",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About the SAAJ Family</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are four unique individuals who come together to create something beautiful - a loving, supportive, 
            and joyful family. Get to know each of us a little better.
          </p>
        </div>

        {/* Family Members */}
        <div className="space-y-16">
          {familyMembers.map((member, index) => {
            const IconComponent = member.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={member.name} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                {/* Profile Image */}
                <div className="w-full lg:w-1/3">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      <div className={`absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="w-full lg:w-2/3">
                  <div className={`${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{member.name}</h2>
                    <p className={`text-lg font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
                      {member.role} • {member.age} years old
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                    
                    {/* Interests */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Interests</h3>
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                        {member.interests.map((interest, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Personality Traits */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Personality</h3>
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                        {member.personality.map((trait, idx) => (
                          <span key={idx} className={`px-3 py-1 bg-gradient-to-r ${member.gradient} text-white rounded-full text-sm font-medium shadow-sm`}>
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="italic text-gray-600 mb-4 text-lg">
                      "{member.favoriteQuote}"
                    </blockquote>

                    {/* Fun Fact */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-primary-500">
                      <p className="text-sm font-medium text-primary-600 mb-1">Fun Fact</p>
                      <p className="text-gray-700">{member.funFact}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Family Values */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Family Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These are the principles that guide us and bring us closer together as a family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {familyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                    <IconComponent size={24} className={value.color} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Family Quote */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <blockquote className="text-2xl md:text-3xl font-bold mb-4">
              "Family is where life begins and love never ends."
            </blockquote>
            <p className="text-lg opacity-90">- The SAAJ Family</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 