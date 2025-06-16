import React from 'react';
import { MapPin, Briefcase, Heart, Star, Coffee, Book } from 'lucide-react';
import { useMemories } from '../context/MemoryContext';

const AboutUs = () => {
  const { familyData } = useMemories();

  const getIconComponent = (index) => {
    const icons = [Briefcase, Heart, Coffee, Star];
    return icons[index] || Briefcase;
  };

  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-pink-500 to-rose-600", 
      "from-purple-500 to-violet-600",
      "from-green-500 to-emerald-600"
    ];
    return gradients[index] || "from-gray-500 to-gray-600";
  };

  const valueIcons = [Heart, MapPin, Book, Star];
  const valueColors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500"];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Our Family</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are {familyData.members.length} unique individuals who come together to create something beautiful - a loving, supportive, 
            and joyful family. Get to know each of us a little better.
          </p>
        </div>

        {/* Family Members */}
        <div className="space-y-16">
          {familyData.members.map((member, index) => {
            const IconComponent = getIconComponent(index);
            const gradient = getGradient(index);
            const isEven = index % 2 === 0;
            
            return (
              <div key={member.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                {/* Profile Image */}
                <div className="w-full lg:w-1/3">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      <div className={`absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="w-full lg:w-2/3">
                  <div className={`${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{member.name}</h2>
                    <p className={`text-lg font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4`}>
                      {member.role} • {member.age}{typeof member.age === 'number' ? ' years old' : ''}
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
                          <span key={idx} className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white rounded-full text-sm font-medium shadow-sm`}>
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
            {familyData.values.map((value, index) => {
              const IconComponent = valueIcons[index];
              const color = valueColors[index];
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                    <IconComponent size={24} className={color} />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Family Motto</h2>
            <blockquote className="text-lg md:text-xl italic mb-4">
              "Together we create memories, share laughter, and build a legacy of love that will last for generations."
            </blockquote>
            <p className="text-primary-100">
              - The {familyData.members.map(m => m.name).join(', ').replace(/, ([^,]*)$/, ' & $1')} Family
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 