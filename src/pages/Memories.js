import React, { useState } from 'react';
import { Heart, Clock, MapPin, Quote, Calendar, Gift, Cake, Star, Camera } from 'lucide-react';

const Memories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const memories = [
    // Timeline Events (from old Timeline page)
    {
      id: 1,
      title: "Father's Day Celebration",
      date: "June 18, 2023",
      category: "celebration",
      location: "Home",
      author: "Aryan",
      story: "A heartwarming Father's Day celebration where we surprised Dad with his favorite cake and heartfelt letters. The joy on his face was priceless as we gathered around the dinner table, sharing stories and expressing our gratitude for everything he has done for our family. It was a day filled with laughter, warm hugs, and the kind of love that makes a house a home. Dad's reaction when he saw the handmade card from Sparsh was absolutely priceless - he teared up and said it was the best gift he'd ever received.",
      tags: ["celebration", "father's day", "family time", "love"],
      image: "https://images.unsplash.com/photo-1567722681333-3115abe1a4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023",
      icon: Cake
    },
    {
      id: 2,
      title: "Mom's Special Day - Women's Day",
      date: "March 8, 2023",
      category: "celebration",
      location: "Home",
      author: "Sparsh",
      story: "Celebrating our amazing mother on Women's Day with a surprise breakfast in bed and a handmade photo album filled with all our favorite family memories. Mom's eyes lit up as she flipped through each page, reliving the beautiful moments we've shared together. Her smile reminded us once again why she's the heart of our family. We spent the entire morning just talking, laughing, and sharing stories while she enjoyed her favorite tea and the pancakes we made from scratch.",
      tags: ["celebration", "women's day", "appreciation", "breakfast"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023",
      icon: Heart
    },
    {
      id: 3,
      title: "Sparsh's 18th Birthday Milestone",
      date: "October 15, 2022",
      category: "milestone",
      location: "Home",
      author: "Anju",
      story: "Our youngest family member officially became an adult! We threw a wonderful birthday party with all his friends and family. Sparsh cut the cake with such happiness, and we couldn't be prouder of the young man he has become. The evening was filled with music, dancing, and endless stories about his childhood that had everyone in splits. The surprise video montage we created with clips from his childhood made everyone emotional, especially when we showed his first steps and first words.",
      tags: ["milestone", "birthday", "growing up", "celebration"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022",
      icon: Gift
    },
    {
      id: 4,
      title: "Family Vacation to Goa",
      date: "August 20, 2022",
      category: "travel",
      location: "Goa",
      author: "Jitesh",
      story: "An unforgettable week-long family vacation to the beautiful beaches of Goa. We stayed in a cozy beach resort, tried water sports, explored local markets, and enjoyed the most amazing seafood. The highlight was watching the sunset together on Baga Beach while dad told us stories from his own childhood vacations. These are the moments that bind us together. Sparsh learned to surf, Aryan tried parasailing, and Mom collected the most beautiful seashells. Every evening we'd sit on the beach and plan the next day's adventures.",
      tags: ["travel", "vacation", "beach", "bonding"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022",
      icon: Camera
    },
    {
      id: 5,
      title: "New Year's Family Resolution",
      date: "December 31, 2022",
      category: "milestone",
      location: "Living Room",
      author: "Aryan",
      story: "As we welcomed 2023, our family made a collective resolution to spend more quality time together and create lasting memories. We decided to have weekly family game nights, monthly outings, and to document our journey better. This website is actually a part of that resolution - a digital space to preserve and celebrate our family bond. We wrote down our individual goals and our family goals, sealing them in an envelope to open next New Year's Eve.",
      tags: ["resolution", "new year", "family goals", "tradition"],
      image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022",
      icon: Star
    },
    // Original Memory Stories
    {
      id: 6,
      title: "The Great Pizza Disaster of 2022",
      date: "September 15, 2022",
      category: "funny",
      location: "Kitchen",
      author: "Aryan",
      story: "It was a Saturday evening when Dad decided he was going to make the 'perfect homemade pizza' for the family. Armed with YouTube tutorials and unwavering confidence, he started the adventure. What followed was a comedy of errors - flour everywhere, dough stuck to the ceiling (yes, the ceiling!), and a smoke alarm that wouldn't stop beeping. Mom tried to help but was laughing too hard to be useful. Sparsh was recording everything for his social media. In the end, we ordered pizza delivery, but we gained a memory that still makes us laugh until our stomachs hurt. Dad's pizza-making attempts are now a running joke in our family.",
      tags: ["cooking", "family time", "laughter", "chaos"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022",
      icon: Heart
    },
    {
      id: 7,
      title: "Mom's Secret Garden Surprise",
      date: "April 22, 2023",
      category: "heartwarming",
      location: "Backyard",
      author: "Sparsh",
      story: "For months, Mom had been secretly planning something in the backyard. She would disappear for hours, coming back with dirt under her fingernails and a mysterious smile. We were all curious but she insisted it was a 'surprise for the family.' On Earth Day, she finally revealed her project - a beautiful vegetable garden with each section dedicated to one family member's favorite vegetables. There was a tomato section for Dad (he loves his salads), herbs for me (I'm the family's budding chef), carrots for Aryan (his childhood favorite), and chili peppers for her own cooking. The best part? She had made little signs with our names and photos from when we were kids. It wasn't just a garden; it was a love letter to each of us.",
      tags: ["love", "surprise", "gardening", "family", "thoughtful"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023",
      icon: Heart
    },
    {
      id: 8,
      title: "The Midnight Board Game Championship",
      date: "December 31, 2022",
      category: "tradition",
      location: "Living Room",
      author: "Jitesh",
      story: "Every New Year's Eve, we have this tradition of staying up until midnight playing board games. This particular year, what started as a friendly game of Monopoly turned into an epic 6-hour championship battle. Anju was the property mogul, owning half the board by hour 3. Sparsh kept going to jail (ironically), and Aryan was the banker who somehow kept 'accidentally' giving himself extra money. I was just trying to survive! As midnight approached, we were all so invested in the game that we almost missed the countdown. We ended up welcoming the new year with dice in our hands and property cards scattered everywhere. The game? It's still technically ongoing - the board has been set up in the corner of our living room for over a year now.",
      tags: ["tradition", "games", "new year", "competition", "laughter"],
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022",
      icon: Star
    },
    {
      id: 9,
      title: "Sparsh's Driving Test Adventure",
      date: "March 8, 2023",
      category: "milestone",
      location: "DMV",
      author: "Anju",
      story: "The day Sparsh was scheduled to take his driving test, he was more nervous than we'd ever seen him. He had been practicing for months, but suddenly he was convinced he'd forget everything. The whole family decided to turn it into a support mission. We made encouraging signs, brought his favorite snacks, and created a playlist of 'confidence-boosting' songs for the car ride. When he came out of the test, his face was unreadable. He walked slowly toward us, and we all held our breath. Then, suddenly, he broke into the biggest grin and yelled 'I PASSED!' The DMV parking lot turned into our own little celebration party. Other families looked at us like we were crazy, but we didn't care. Our youngest had reached another milestone, and we were bursting with pride.",
      tags: ["milestone", "pride", "growing up", "achievement", "support"],
      image: "https://images.unsplash.com/photo-1570025330536-a4d5ad4d4d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023",
      icon: Gift
    },
    {
      id: 10,
      title: "The Family Talent Show Nobody Asked For",
      date: "July 4, 2023",
      category: "funny",
      location: "Living Room",
      author: "Aryan",
      story: "It was a lazy Sunday afternoon when Sparsh declared that our family was 'too boring' and needed more excitement. His solution? An impromptu family talent show with himself as the host and judge. Mom performed a dramatic reading of a grocery list, complete with Shakespearean gestures. Dad did magic tricks that were more comedy than magic (his card tricks involved us 'picking a card, any card' from a deck that only had jokers). I attempted to beatbox while solving a Rubik's cube - it was as disastrous as it sounds. Sparsh saved his own performance for last: an interpretive dance routine to the theme song of his favorite cartoon. By the end, we were all crying from laughter. The 'winner' was declared to be the family as a whole, and the prize was ice cream for everyone. Sometimes the best entertainment is the kind you create yourself.",
      tags: ["entertainment", "creativity", "laughter", "spontaneous", "talent"],
      image: "https://images.unsplash.com/photo-1541696877-7b9f4a5d9ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023",
      icon: Heart
    }
  ];

  const categories = [
    { value: 'all', label: 'All Memories', count: memories.length },
    { value: 'celebration', label: 'Celebrations', count: memories.filter(m => m.category === 'celebration').length },
    { value: 'milestone', label: 'Milestones', count: memories.filter(m => m.category === 'milestone').length },
    { value: 'funny', label: 'Funny', count: memories.filter(m => m.category === 'funny').length },
    { value: 'heartwarming', label: 'Heartwarming', count: memories.filter(m => m.category === 'heartwarming').length },
    { value: 'tradition', label: 'Traditions', count: memories.filter(m => m.category === 'tradition').length },
    { value: 'travel', label: 'Travel', count: memories.filter(m => m.category === 'travel').length }
  ];

  const years = ['all', ...new Set(memories.map(memory => memory.year))].sort().reverse();
  
  const filteredMemories = memories.filter(memory => {
    const matchesCategory = selectedCategory === 'all' || memory.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || memory.year === selectedYear;
    return matchesCategory && matchesYear;
  });

  const getCategoryColor = (category) => {
    const colors = {
      celebration: 'bg-pink-500',
      milestone: 'bg-green-500',
      funny: 'bg-yellow-500',
      heartwarming: 'bg-red-500',
      tradition: 'bg-blue-500',
      travel: 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      celebration: '🎉',
      milestone: '⭐',
      funny: '😄',
      heartwarming: '❤️',
      tradition: '🎯',
      travel: '✈️'
    };
    return icons[category] || '📝';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Memories & Timeline</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A chronological journey through our precious moments, celebrations, milestones, and the stories that define the SAAJ family. 
            These are the tales written by our hearts, for our hearts.
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8 space-y-4">
          {/* Year Filter */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Year</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedYear === year
                      ? 'bg-secondary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-secondary-50 hover:text-secondary-600'
                  } border border-gray-200 shadow-sm`}
                >
                  {year === 'all' ? 'All Years' : year}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  } border border-gray-200 shadow-sm`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-primary-600">{filteredMemories.length}</span> of {memories.length} memories
          </p>
        </div>

        {/* Memories Grid */}
        <div className="space-y-16">
          {filteredMemories
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((memory, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div key={memory.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-start`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                        <span className="text-2xl">{getCategoryIcon(memory.category)}</span>
                      </div>
                      <div className="absolute -bottom-4 -left-4 bg-white rounded-lg px-3 py-1 shadow-lg">
                        <span className="text-sm font-medium text-gray-600">{memory.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className={`${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                    {/* Category Badge */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4 ${getCategoryColor(memory.category)}`}>
                      {memory.category.toUpperCase()}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      {memory.title}
                    </h2>

                    {/* Metadata */}
                    <div className={`flex flex-wrap gap-4 mb-6 text-sm text-gray-600 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {memory.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {memory.location}
                      </div>
                      <div className="flex items-center">
                        <Quote size={16} className="mr-1" />
                        by {memory.author}
                      </div>
                    </div>

                    {/* Story */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500 mb-6">
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {memory.story}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                      {memory.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No memories found</h3>
            <p className="text-gray-600">Try selecting different filters or check back later for more stories!</p>
          </div>
        )}

        {/* Memory Statistics */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Memory Journey</h2>
            <p className="text-gray-600">The numbers behind our beautiful memories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {memories.length}
              </div>
              <div className="text-gray-600 text-sm">Total Memories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">
                {years.length - 1}
              </div>
              <div className="text-gray-600 text-sm">Years Documented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {[...new Set(memories.map(m => m.author))].length}
              </div>
              <div className="text-gray-600 text-sm">Storytellers</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Share Your Memory</h2>
          <p className="text-lg mb-6 opacity-90">
            Have a special family moment you'd like to add to our collection? 
            We'd love to hear your story and add it to our memory bank!
          </p>
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
            Submit a Memory
          </button>
        </div>
      </div>
    </div>
  );
};

export default Memories; 