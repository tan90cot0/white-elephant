import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, Image as ImageIcon, Search } from 'lucide-react';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample Google Photos albums data
  const photoAlbums = [
    {
      id: 1,
      name: "Family Vacation - Goa 2022",
      description: "Sun, sand, and unforgettable family moments at the beautiful beaches of Goa",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 145,
      date: "August 2022",
      category: "travel",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-1"
    },
    {
      id: 2,
      name: "Sparsh's 18th Birthday Celebration",
      description: "Our youngest turns 18! A memorable birthday party with friends and family",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 89,
      date: "October 2022",
      category: "celebrations",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-2"
    },
    {
      id: 3,
      name: "Father's Day 2023",
      description: "Celebrating the best dad in the world with cake, love, and heartfelt moments",
      thumbnail: "https://images.unsplash.com/photo-1567722681333-3115abe1a4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 34,
      date: "June 2023",
      category: "celebrations",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-3"
    },
    {
      id: 4,
      name: "Home Sweet Home - Daily Life",
      description: "Candid moments from our everyday life, cooking, playing, and just being together",
      thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 234,
      date: "Ongoing",
      category: "daily",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-4"
    },
    {
      id: 5,
      name: "Wedding Anniversary - Mom & Dad",
      description: "Celebrating another year of love, laughter, and togetherness",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 67,
      date: "February 2023",
      category: "celebrations",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-5"
    },
    {
      id: 6,
      name: "Weekend Adventures",
      description: "Exploring local places, trying new restaurants, and making memories around the city",
      thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 178,
      date: "2023",
      category: "adventures",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-6"
    },
    {
      id: 7,
      name: "Festival Celebrations",
      description: "Diwali, Holi, Christmas and all the festivals that bring us together",
      thumbnail: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 156,
      date: "2022-2023",
      category: "festivals",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-7"
    },
    {
      id: 8,
      name: "Family Game Nights",
      description: "Competitive board games, card games, and lots of laughter every weekend",
      thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photoCount: 92,
      date: "Weekly",
      category: "daily",
      googlePhotosUrl: "https://photos.google.com/share/sample-album-8"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Albums', count: photoAlbums.length },
    { value: 'travel', label: 'Travel', count: photoAlbums.filter(album => album.category === 'travel').length },
    { value: 'celebrations', label: 'Celebrations', count: photoAlbums.filter(album => album.category === 'celebrations').length },
    { value: 'daily', label: 'Daily Life', count: photoAlbums.filter(album => album.category === 'daily').length },
    { value: 'adventures', label: 'Adventures', count: photoAlbums.filter(album => album.category === 'adventures').length },
    { value: 'festivals', label: 'Festivals', count: photoAlbums.filter(album => album.category === 'festivals').length }
  ];

  const filteredAlbums = photoAlbums.filter(album => {
    const matchesSearch = album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         album.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || album.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      travel: 'bg-blue-500',
      celebrations: 'bg-pink-500',
      daily: 'bg-green-500',
      adventures: 'bg-purple-500',
      festivals: 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of precious moments, organized in beautiful albums. 
            Each album is hosted on Google Photos for easy sharing and viewing.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  } border border-gray-200`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map(album => (
            <div key={album.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Thumbnail */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={album.thumbnail}
                  alt={album.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(album.category)}`}>
                    {album.category.charAt(0).toUpperCase() + album.category.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm flex items-center">
                  <ImageIcon size={14} className="mr-1" />
                  {album.photoCount}
                </div>
              </div>

              {/* Album Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                    {album.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{album.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{album.date}</span>
                  </div>
                  <a
                    href={album.googlePhotosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    View Album
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlbums.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No albums found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filter criteria.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Gallery Statistics</h2>
            <p className="text-gray-600">Our family memories by the numbers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {photoAlbums.length}
              </div>
              <div className="text-gray-600">Total Albums</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">
                {photoAlbums.reduce((total, album) => total + album.photoCount, 0)}
              </div>
              <div className="text-gray-600">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 