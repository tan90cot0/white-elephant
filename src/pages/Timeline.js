import React, { useState } from 'react';
import { Calendar, Heart, Gift, Cake, Star, Camera } from 'lucide-react';

const Timeline = () => {
  const [selectedYear, setSelectedYear] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      date: "June 18, 2023",
      title: "Father's Day Celebration",
      description: "A heartwarming Father's Day celebration where we surprised Dad with his favorite cake and heartfelt letters. The joy on his face was priceless as we gathered around the dinner table, sharing stories and expressing our gratitude for everything he has done for our family. It was a day filled with laughter, warm hugs, and the kind of love that makes a house a home.",
      image: "https://images.unsplash.com/photo-1567722681333-3115abe1a4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "celebration",
      year: "2023",
      icon: Cake
    },
    {
      id: 2,
      date: "March 8, 2023",
      title: "Mom's Special Day",
      description: "Celebrating our amazing mother on Women's Day with a surprise breakfast in bed and a handmade photo album filled with all our favorite family memories. Mom's eyes lit up as she flipped through each page, reliving the beautiful moments we've shared together. Her smile reminded us once again why she's the heart of our family.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "celebration",
      year: "2023",
      icon: Heart
    },
    {
      id: 3,
      date: "December 31, 2022",
      title: "New Year's Family Resolution",
      description: "As we welcomed 2023, our family made a collective resolution to spend more quality time together and create lasting memories. We decided to have weekly family game nights, monthly outings, and to document our journey better. This website is actually a part of that resolution - a digital space to preserve and celebrate our family bond.",
      image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "milestone",
      year: "2022",
      icon: Star
    },
    {
      id: 4,
      date: "October 15, 2022",
      title: "Sparsh's 18th Birthday",
      description: "Our youngest family member officially became an adult! We threw a wonderful birthday party with all his friends and family. Sparsh cut the cake with such happiness, and we couldn't be prouder of the young man he has become. The evening was filled with music, dancing, and endless stories about his childhood that had everyone in splits.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "birthday",
      year: "2022",
      icon: Gift
    },
    {
      id: 5,
      date: "August 20, 2022",
      title: "Family Vacation to Goa",
      description: "An unforgettable week-long family vacation to the beautiful beaches of Goa. We stayed in a cozy beach resort, tried water sports, explored local markets, and enjoyed the most amazing seafood. The highlight was watching the sunset together on Baga Beach while dad told us stories from his own childhood vacations. These are the moments that bind us together.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "travel",
      year: "2022",
      icon: Camera
    }
  ];

  const years = ['all', ...new Set(timelineEvents.map(event => event.year))];
  
  const filteredEvents = selectedYear === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.year === selectedYear);

  const getEventTypeColor = (type) => {
    const colors = {
      celebration: "bg-pink-500",
      milestone: "bg-purple-500",
      birthday: "bg-green-500",
      travel: "bg-blue-500",
      default: "bg-primary-500"
    };
    return colors[type] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Family Timeline</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A chronological journey through the precious moments, celebrations, and milestones that define the SAAJ family story.
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedYear === year
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              } border border-gray-200`}
            >
              {year === 'all' ? 'All Years' : year}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary-200 to-secondary-200 h-full"></div>

          {filteredEvents.map((event, index) => {
            const IconComponent = event.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={event.id} className={`relative flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-primary-200 flex items-center justify-center z-10">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 pl-12' : 'md:pl-8 pl-12'} ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium text-white ${getEventTypeColor(event.type)}`}>
                          <IconComponent size={14} />
                          <span className="capitalize">{event.type}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block md:w-2/12"></div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600">Try selecting a different year or check back later for more memories!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline; 