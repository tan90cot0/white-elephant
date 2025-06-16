import React, { createContext, useContext, useState } from 'react';

const MemoryContext = createContext();

export const useMemories = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return context;
};

// Family data structure - ready for backend
const familyData = {
  members: [
    {
      id: 1,
      name: "Jitesh",
      role: "Father & Family Patriarch",
      age: 50,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The wise leader of our family, Jitesh brings stability, wisdom, and endless dad jokes to our household. With years of experience in his professional field, he's always ready with advice and a warm hug.",
      interests: ["Reading", "Gardening", "Cooking", "Technology"],
      favoriteQuote: "Family is not an important thing, it's everything.",
      funFact: "Can solve any technical problem and makes the best weekend pancakes!",
      personality: ["Wise", "Caring", "Funny", "Reliable"]
    },
    {
      id: 2,
      name: "Anju",
      role: "Mother & Heart of the Home",
      age: 48,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c68e9b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The nurturing soul of our family, Anju fills our home with love, delicious food, and endless care. She has an incredible ability to make everyone feel special and loved.",
      interests: ["Cooking", "Gardening", "Music", "Family Time"],
      favoriteQuote: "A mother's love is the fuel that enables a normal human being to do the impossible.",
      funFact: "Remembers everyone's favorite dishes and can whip up a feast in no time!",
      personality: ["Loving", "Nurturing", "Creative", "Strong"]
    },
    {
      id: 3,
      name: "Aryan",
      role: "Elder Son & Tech Enthusiast",
      age: "Adult",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The tech-savvy member of the family who created this website! Passionate about technology, always exploring new innovations, and loves connecting the family through digital experiences.",
      interests: ["Programming", "Photography", "Travel", "Music"],
      favoriteQuote: "Technology is best when it brings people together.",
      funFact: "Built this family website from scratch and is always updating it with new features!",
      personality: ["Creative", "Analytical", "Innovative", "Thoughtful"]
    },
    {
      id: 4,
      name: "Sparsh",
      role: "Younger Son & The Energizer",
      age: 18,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "The youngest and most energetic member of our family! Just turned 18 and ready to take on the world. Brings joy, laughter, and youthful energy to every family gathering.",
      interests: ["Sports", "Gaming", "Music", "Friends"],
      favoriteQuote: "Life is short, make it sweet!",
      funFact: "Can beat everyone in the family at video games and always knows the latest trends!",
      personality: ["Energetic", "Funny", "Social", "Adventurous"]
    }
  ],
  values: [
    {
      title: "Love & Support",
      description: "We believe in unconditional love and supporting each other through thick and thin."
    },
    {
      title: "Togetherness",
      description: "Family time is sacred time. We prioritize being together and creating memories."
    },
    {
      title: "Growth & Learning",
      description: "We encourage each other to learn, grow, and pursue our individual passions."
    },
    {
      title: "Fun & Laughter",
      description: "Life is better with laughter. We don't take ourselves too seriously!"
    }
  ]
};

// Meal planning data structure - ready for backend
const mealData = {
  categories: [
    "Indian dishes",
    "Continental cuisine",
    "Breakfast items",
    "Healthy options",
    "Comfort food",
    "Quick meals",
    "Special occasion dishes"
  ],
  sampleMeals: {
    breakfast: ["Pancakes with berries", "Upma with chutney", "Toast with avocado", "Smoothie bowl"],
    lunch: ["Butter chicken with naan", "Vegetable stir-fry", "Chickpea curry", "Grilled chicken salad"],
    dinner: ["Dal tadka with rice", "Pasta with garlic bread", "Fish curry", "Homemade pizza"]
  },
  preferences: {
    "Jitesh": ["Salads", "Healthy options", "Traditional dishes"],
    "Anju": ["Home-cooked meals", "Indian cuisine", "Fresh ingredients"],
    "Aryan": ["Variety", "International cuisine", "Quick meals"],
    "Sparsh": ["Comfort food", "Snacks", "Popular dishes"]
  }
};

// Events data structure - ready for backend
const eventsData = [
  {
    id: 1,
    date: '2024-01-15',
    title: 'Dad\'s Birthday',
    type: 'birthday',
    time: '7:00 PM',
    location: 'Home',
    attendees: ['Sparsh', 'Anju', 'Aryan', 'Jitesh'],
    color: 'bg-pink-500'
  },
  {
    id: 2,
    date: '2024-01-20',
    title: 'Family Game Night',
    type: 'activity',
    time: '8:00 PM',
    location: 'Living Room',
    attendees: ['Sparsh', 'Anju', 'Aryan', 'Jitesh'],
    color: 'bg-blue-500'
  },
  {
    id: 3,
    date: '2024-01-25',
    title: 'Sparsh\'s College Interview',
    type: 'milestone',
    time: '10:00 AM',
    location: 'College Campus',
    attendees: ['Sparsh', 'Anju'],
    color: 'bg-green-500'
  },
  {
    id: 4,
    date: '2024-02-01',
    title: 'Family Vacation Planning',
    type: 'planning',
    time: '6:00 PM',
    location: 'Home',
    attendees: ['Sparsh', 'Anju', 'Aryan', 'Jitesh'],
    color: 'bg-purple-500'
  }
];

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "Father's Day Celebration",
      date: "June 18, 2023",
      category: "celebration",
      location: "Home",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Aryan",
      story: "A heartwarming Father's Day celebration where we surprised Dad with his favorite cake and heartfelt letters. The joy on his face was priceless as we gathered around the dinner table, sharing stories and expressing our gratitude for everything he has done for our family. It was a day filled with laughter, warm hugs, and the kind of love that makes a house a home. Dad's reaction when he saw the handmade card from Sparsh was absolutely priceless - he teared up and said it was the best gift he'd ever received.",
      tags: ["celebration", "father's day", "family time", "love"],
      image: "https://images.unsplash.com/photo-1567722681333-3115abe1a4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
    {
      id: 2,
      title: "Mom's Special Day - Women's Day",
      date: "March 8, 2023",
      category: "celebration",
      location: "Home",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Sparsh",
      story: "Celebrating our amazing mother on Women's Day with a surprise breakfast in bed and a handmade photo album filled with all our favorite family memories. Mom's eyes lit up as she flipped through each page, reliving the beautiful moments we've shared together. Her smile reminded us once again why she's the heart of our family. We spent the entire morning just talking, laughing, and sharing stories while she enjoyed her favorite tea and the pancakes we made from scratch.",
      tags: ["celebration", "women's day", "appreciation", "breakfast"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
    {
      id: 3,
      title: "Sparsh's 18th Birthday Milestone",
      date: "October 15, 2022",
      category: "milestone",
      location: "Home",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Anju",
      story: "Our youngest family member officially became an adult! We threw a wonderful birthday party with all his friends and family. Sparsh cut the cake with such happiness, and we couldn't be prouder of the young man he has become. The evening was filled with music, dancing, and endless stories about his childhood that had everyone in splits. The surprise video montage we created with clips from his childhood made everyone emotional, especially when we showed his first steps and first words.",
      tags: ["milestone", "birthday", "growing up", "celebration"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 4,
      title: "Family Vacation to Goa",
      date: "August 20, 2022",
      category: "travel",
      location: "Goa",
      coordinates: { lat: 15.2993, lng: 74.1240 }, // Goa coordinates
      author: "Jitesh",
      story: "An unforgettable week-long family vacation to the beautiful beaches of Goa. We stayed in a cozy beach resort, tried water sports, explored local markets, and enjoyed the most amazing seafood. The highlight was watching the sunset together on Baga Beach while dad told us stories from his own childhood vacations. These are the moments that bind us together. Sparsh learned to surf, Aryan tried parasailing, and Mom collected the most beautiful seashells. Every evening we'd sit on the beach and plan the next day's adventures.",
      tags: ["travel", "vacation", "beach", "bonding"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 5,
      title: "New Year's Family Resolution",
      date: "December 31, 2022",
      category: "milestone",
      location: "Living Room",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Aryan",
      story: "As we welcomed 2023, our family made a collective resolution to spend more quality time together and create lasting memories. We decided to have weekly family game nights, monthly outings, and to document our journey better. This website is actually a part of that resolution - a digital space to preserve and celebrate our family bond. We wrote down our individual goals and our family goals, sealing them in an envelope to open next New Year's Eve.",
      tags: ["resolution", "new year", "family goals", "tradition"],
      image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 6,
      title: "The Great Pizza Disaster of 2022",
      date: "September 15, 2022",
      category: "funny",
      location: "Kitchen",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Aryan",
      story: "It was a Saturday evening when Dad decided he was going to make the 'perfect homemade pizza' for the family. Armed with YouTube tutorials and unwavering confidence, he started the adventure. What followed was a comedy of errors - flour everywhere, dough stuck to the ceiling (yes, the ceiling!), and a smoke alarm that wouldn't stop beeping. Mom tried to help but was laughing too hard to be useful. Sparsh was recording everything for his social media. In the end, we ordered pizza delivery, but we gained a memory that still makes us laugh until our stomachs hurt. Dad's pizza-making attempts are now a running joke in our family.",
      tags: ["cooking", "family time", "laughter", "chaos"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 7,
      title: "Mom's Secret Garden Surprise",
      date: "April 22, 2023",
      category: "heartwarming",
      location: "Backyard",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Sparsh",
      story: "For months, Mom had been secretly planning something in the backyard. She would disappear for hours, coming back with dirt under her fingernails and a mysterious smile. We were all curious but she insisted it was a 'surprise for the family.' On Earth Day, she finally revealed her project - a beautiful vegetable garden with each section dedicated to one family member's favorite vegetables. There was a tomato section for Dad (he loves his salads), herbs for me (I'm the family's budding chef), carrots for Aryan (his childhood favorite), and chili peppers for her own cooking. The best part? She had made little signs with our names and photos from when we were kids. It wasn't just a garden; it was a love letter to each of us.",
      tags: ["love", "surprise", "gardening", "family", "thoughtful"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
    {
      id: 8,
      title: "The Midnight Board Game Championship",
      date: "December 31, 2022",
      category: "tradition",
      location: "Living Room",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Jitesh",
      story: "Every New Year's Eve, we have this tradition of staying up until midnight playing board games. This particular year, what started as a friendly game of Monopoly turned into an epic 6-hour championship battle. Anju was the property mogul, owning half the board by hour 3. Sparsh kept going to jail (ironically), and Aryan was the banker who somehow kept 'accidentally' giving himself extra money. I was just trying to survive! As midnight approached, we were all so invested in the game that we almost missed the countdown. We ended up welcoming the new year with dice in our hands and property cards scattered everywhere. The game? It's still technically ongoing - the board has been set up in the corner of our living room for over a year now.",
      tags: ["tradition", "games", "new year", "competition", "laughter"],
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 9,
      title: "Sparsh's Driving Test Adventure",
      date: "March 8, 2023",
      category: "milestone",
      location: "DMV",
      coordinates: { lat: 40.7505, lng: -73.9934 }, // Manhattan DMV coordinates
      author: "Anju",
      story: "The day Sparsh was scheduled to take his driving test, he was more nervous than we'd ever seen him. He had been practicing for months, but suddenly he was convinced he'd forget everything. The whole family decided to turn it into a support mission. We made encouraging signs, brought his favorite snacks, and created a playlist of 'confidence-boosting' songs for the car ride. When he came out of the test, his face was unreadable. He walked slowly toward us, and we all held our breath. Then, suddenly, he broke into the biggest grin and yelled 'I PASSED!' The DMV parking lot turned into our own little celebration party. Other families looked at us like we were crazy, but we didn't care. Our youngest had reached another milestone, and we were bursting with pride.",
      tags: ["milestone", "pride", "growing up", "achievement", "support"],
      image: "https://images.unsplash.com/photo-1570025330536-a4d5ad4d4d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
    {
      id: 10,
      title: "The Family Talent Show Nobody Asked For",
      date: "July 4, 2023",
      category: "funny",
      location: "Living Room",
      coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates as placeholder
      author: "Aryan",
      story: "It was a lazy Sunday afternoon when Sparsh declared that our family was 'too boring' and needed more excitement. His solution? An impromptu family talent show with himself as the host and judge. Mom performed a dramatic reading of a grocery list, complete with Shakespearean gestures. Dad did magic tricks that were more comedy than magic (his card tricks involved us 'picking a card, any card' from a deck that only had jokers). I attempted to beatbox while solving a Rubik's cube - it was as disastrous as it sounds. Sparsh saved his own performance for last: an interpretive dance routine to the theme song of his favorite cartoon. By the end, we were all crying from laughter. The 'winner' was declared to be the family as a whole, and the prize was ice cream for everyone. Sometimes the best entertainment is the kind you create yourself.",
      tags: ["entertainment", "creativity", "laughter", "spontaneous", "talent"],
      image: "https://images.unsplash.com/photo-1541696877-7b9f4a5d9ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    }
  ]);

  const [selectedMemoryForMap, setSelectedMemoryForMap] = useState(null);

  const addMemory = (newMemory) => {
    const memory = {
      ...newMemory,
      id: Date.now(),
      year: new Date(newMemory.date).getFullYear().toString()
    };
    setMemories(prev => [...prev, memory]);
  };

  const editMemory = (updatedMemory) => {
    setMemories(prev => prev.map(m => m.id === updatedMemory.id ? {
      ...updatedMemory,
      year: new Date(updatedMemory.date).getFullYear().toString()
    } : m));
  };

  const deleteMemory = (memoryId) => {
    setMemories(prev => prev.filter(m => m.id !== memoryId));
  };

  const value = {
    memories,
    addMemory,
    editMemory,
    deleteMemory,
    selectedMemoryForMap,
    setSelectedMemoryForMap,
    // Additional data for chatbot and other components
    familyData,
    mealData,
    eventsData
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
}; 