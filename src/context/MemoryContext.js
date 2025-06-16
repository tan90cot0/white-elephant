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
  ],
  // Summary data for Home page
  summary: [
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
  },
  // Meal plans for calendar
  plans: {
    '2024-01-15': {
      breakfast: 'Pancakes with maple syrup and fresh berries',
      lunch: 'Grilled chicken salad with quinoa',
      dinner: 'Birthday special - Dad\'s favorite butter chicken with naan'
    },
    '2024-01-16': {
      breakfast: 'Oatmeal with nuts and honey',
      lunch: 'Vegetable stir-fry with brown rice',
      dinner: 'Spaghetti bolognese with garlic bread'
    },
    '2024-01-17': {
      breakfast: 'Toast with avocado and eggs',
      lunch: 'Chickpea curry with chapati',
      dinner: 'Fish curry with steamed rice'
    },
    '2024-01-18': {
      breakfast: 'Smoothie bowl with granola',
      lunch: 'Paneer tikka with mint chutney',
      dinner: 'Dal tadka with jeera rice'
    },
    '2024-01-19': {
      breakfast: 'Upma with coconut chutney',
      lunch: 'Rajma with basmati rice',
      dinner: 'Pizza night - homemade margherita'
    },
    '2024-01-20': {
      breakfast: 'French toast with berries',
      lunch: 'Chole bhature',
      dinner: 'Game night snacks - sandwiches and nachos'
    },
    '2024-01-21': {
      breakfast: 'Idli sambhar with chutney',
      lunch: 'Biryani with raita',
      dinner: 'Grilled vegetables with quinoa'
    }
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

// Gallery data structure - ready for backend
const galleryData = {
  photoAlbums: [
    {
      id: 1,
      name: "Bangalore",
      description: "Family moments in Bangalore",
      thumbnail: "https://i.postimg.cc/L85P5SRq/Screenshot-2025-06-16-at-5-40-47-PM.png",
      photoCount: 156,
      date: "July 2023",
      category: "Home",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/fHRaNbnY6iAjGcT48"
    },
    {
      id: 2,
      name: "Parents on Campus",
      description: "When mumma and papa were on campus (Cheena didi ki shaadi ke time)",
      thumbnail: "https://i.postimg.cc/25BBdx1r/Screenshot-2025-06-16-at-5-40-55-PM.png",
      photoCount: 5,
      date: "Nov 26, 2024",
      category: "IITD",
      coordinates: { lat: 28.5449, lng: 77.1928 }, // IIT Delhi coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/kAGP9Rbd9T1119Ur6"
    },
    {
      id: 3,
      name: "Cheena Shaadi",
      description: "Cheena didi's wedding celebration - a beautiful family gathering",
      thumbnail: "https://i.postimg.cc/L5vq4CbB/Screenshot-2025-06-16-at-5-41-05-PM.png",
      photoCount: 22,
      date: "Nov 28 2024",
      category: "celebrations",
      coordinates: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/7aNJXU1GwuZBXmKW6"
    },
    {
      id: 4,
      name: "Mom's Birthday 2024",
      description: "Celebrating our amazing mother's special day with love and joy",
      thumbnail: "https://i.postimg.cc/T3KyGcqg/Screenshot-2025-06-16-at-5-41-13-PM.png",
      photoCount: 4,
      date: "Oct 28 2024",
      category: "celebrations",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/gWxzMcJaRm2E16MX6"
    },
    {
      id: 5,
      name: "IIM Car Show",
      description: "Fun times at the IIM car show - exploring cars and making memories",
      thumbnail: "https://i.postimg.cc/Dzs84yNz/Screenshot-2025-06-16-at-5-41-20-PM.png",
      photoCount: 25,
      date: "Oct 1 2023",
      category: "adventures",
      coordinates: { lat: 12.9716, lng: 77.5946 }, // Bangalore coordinates (assuming IIM Bangalore)
      googlePhotosUrl: "https://photos.app.goo.gl/RnLGW99Vgtu3j3mj8"
    },
    {
      id: 6,
      name: "UB City",
      description: "Family outing to UB City - shopping, dining, and quality time together",
      thumbnail: "https://i.postimg.cc/Yq90fxPZ/Screenshot-2025-06-16-at-5-41-30-PM.png",
      photoCount: 15,
      date: "Oct 28 2023",
      category: "adventures",
      coordinates: { lat: 12.9719, lng: 77.5937 }, // UB City Mall, Bangalore coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/gG53CaViweAzm4XeA"
    },
    {
      id: 7,
      name: "Aryan's 15th Birthday",
      description: "Celebrating Aryan's 15th birthday in Pune - a special milestone celebration",
      thumbnail: "https://i.postimg.cc/7Zp0CRKq/Screenshot-2025-06-16-at-6-07-09-PM.png",
      photoCount: 13,
      date: "Mar 25, 2017",
      category: "celebrations",
      coordinates: { lat: 18.596259500612504, lng: 73.78391185413726 }, // Pune home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/VjbHjHJDAVJQnUUM6"
    },
    {
      id: 8,
      name: "Mom",
      description: "Beautiful collection of Mom's precious moments and memories",
      thumbnail: "https://i.postimg.cc/mDTcCWCW/Screenshot-2025-06-16-at-6-08-17-PM.png",
      photoCount: 11,
      date: "Sep 29, 2020 - Sep 20, 2023",
      category: "family",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/8vqbvGEe2NZiEJVE7"
    },
    {
      id: 9,
      name: "Papa",
      description: "Special collection of Papa's memorable moments and celebrations",
      thumbnail: "https://i.postimg.cc/JnCNFFXp/Screenshot-2025-06-16-at-6-06-59-PM.png",
      photoCount: 2,
      date: "Mar 31, 2022",
      category: "family",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/eVe4KFGgTJAwzfgu7"
    },
    {
      id: 10,
      name: "Sparsh",
      description: "Sparsh's journey through the years - from childhood to young adulthood",
      thumbnail: "https://i.postimg.cc/5yn86NRr/Screenshot-2025-06-16-at-6-07-04-PM.png",
      photoCount: 45,
      date: "Oct 4, 2017 - Mar 20, 2023",
      category: "family",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/m9o6iNFAJCqqYSfR9"
    },
    {
      id: 11,
      name: "Pune",
      description: "Family memories from our time in Pune - our previous home",
      thumbnail: "https://i.postimg.cc/GhXjpq0p/Screenshot-2025-06-16-at-6-06-54-PM.png",
      photoCount: 2,
      date: "Jan 6, 2021",
      category: "Home",
      coordinates: { lat: 18.596259500612504, lng: 73.78391185413726 }, // Pune home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/6mYtY2b2s7NznWy49"
    },
    {
      id: 12,
      name: "Thailand",
      description: "Amazing family vacation to Thailand - exploring temples, beaches, and culture",
      thumbnail: "https://i.postimg.cc/15dNTThD/Screenshot-2025-06-16-at-6-07-54-PM.png",
      photoCount: 1,
      date: "May 30, 2018",
      category: "travel",
      coordinates: { lat: 13.7563, lng: 100.5018 }, // Bangkok, Thailand coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/Fyi3uCZ1tfj96sxs5"
    },
    {
      id: 13,
      name: "Father's Day",
      description: "Father's Day Celebration",
      thumbnail: "https://i.postimg.cc/ZqrmDgt5/IMG-8394.png",
      photoCount: 2,
      date: "June 15, 2025",
      category: "family",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      googlePhotosUrl: "https://photos.app.goo.gl/xLNYoqtSCZ7Rzq18A"
    }
  ],
  categories: [
    { value: 'all', label: 'All Albums' },
    { value: 'travel', label: 'Travel' },
    { value: 'celebrations', label: 'Celebrations' },
    { value: 'daily', label: 'Daily Life' },
    { value: 'adventures', label: 'Adventures' },
    { value: 'festivals', label: 'Festivals' },
    { value: 'family', label: 'Family' },
    { value: 'Home', label: 'Home' },
    { value: 'IITD', label: 'IITD' }
  ]
};

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "Father's Day Celebration",
      date: "June 15, 2025",
      category: "celebration",
      location: "Home",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      author: "Aryan",
      story: `Dear Papa,

Happy Father's Day! I know this might be a day late, but I wanted to write this for you.

First, I'm really sorry about yesterday. I shouldn't have gone out with my friends on Father's Day. I should have been home with you and the family. I feel bad that I wasn't there to celebrate with you properly, and I'm sorry for not being more involved. You deserve so much better than that.

You've always been there for me, through every mistake I've made, every time I've messed up, and every moment I needed guidance. You never made me feel bad about my choices, even when they weren't the best ones. You just quietly supported me and helped me learn.

I remember all those times you stayed up late helping me with my projects, even when you were tired from work. You never said no when I needed help, whether it was with studies, fixing something, or just talking through my problems. You always made time for us, no matter how busy you were.

I know I don't say it enough, but I'm grateful for everything you do. For working so hard to give us a good life, for being patient with me when I'm stubborn, for teaching me right from wrong, and for always believing in me even when I don't believe in myself.

I promise I'll try to be a better son and spend more quality time with you. You mean the world to me, Papa.

Love,
Aryan`,
      tags: ["celebration", "father's day", "family time", "love", "apology"],
      image: "https://i.postimg.cc/ZqrmDgt5/IMG-8394.png",
      year: "2025",
      googlePhotosUrl: "https://photos.app.goo.gl/xLNYoqtSCZ7Rzq18A"
    },
    {
      id: 2,
      title: "Papa's 50th Birthday",
      date: "March 31, 2025",
      category: "celebration",
      location: "Home",
      coordinates: { lat: 12.891417671553656, lng: 77.58273228601996 }, // Bangalore home coordinates
      author: "Sparsh",
      story: `Papa, aap meri duniya ka sabse bada sahaara ho,
Meri har jeet ka asli aawaara ho,
Jab bhi life tough lagi, aapke words ek magic jaisa kaam karte hain,
Aur jab bhi rasta na dikhe, aapki muskurahat hi light ban jati hai.

Aapne girne se pehle sambhalna sikha diya,
Aur haarne se pehle jeet ka raasta dikhla diya,
Bachpan se lekar aaj tak jo bhi sikha hai,
Woh sab kuch sirf aapse hi toh mila hai.

Aaj birthday hai aapka, ek hi wish hai meri,
Aap hamesha haste raho, aur duniya ki koi tension aapko chhu bhi na paaye!
Happy Birthday, Papa!`,
      tags: ["celebration", "birthday", "appreciation", "poem"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
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
    eventsData,
    galleryData
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
}; 