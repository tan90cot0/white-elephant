import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { 
  Filter, 
  Search, 
  Heart, 
  MapPin,
  Calendar,
  User,
  Globe,
  Camera,
  ExternalLink
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemories } from '../context/MemoryContext';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Add custom CSS for markers
const markerStyles = `
  .custom-pin-marker {
    background: none !important;
    border: none !important;
  }
  .custom-pin-marker svg {
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = markerStyles;
  document.head.appendChild(styleSheet);
}

// Custom marker icons for different categories
const createCustomIcon = (category, type = 'memory') => {
  const colors = {
    celebration: '#ec4899',
    milestone: '#10b981',
    funny: '#f59e0b',
    heartwarming: '#ef4444',
    tradition: '#3b82f6',
    travel: '#8b5cf6',
    adventures: '#7c3aed',
    family: '#f97316',
    Home: '#059669',
    IITD: '#dc2626'
  };
  
  const color = colors[category] || '#6b7280';
  
  // Create a proper pin-shaped marker
  const pinSvg = `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" 
            fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="15" cy="15" r="8" fill="white"/>
      <text x="15" y="20" text-anchor="middle" font-size="12" fill="${color}">
        ${type === 'gallery' ? '📷' : '📍'}
      </text>
    </svg>
  `;
  
  return L.divIcon({
    html: pinSvg,
    className: 'custom-pin-marker',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
  });
};

const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Map = () => {
  const { memories, galleryData, selectedMemoryForMap, setSelectedMemoryForMap } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [mapCenter, setMapCenter] = useState([12.891417671553656, 77.58273228601996]);
  const [mapZoom, setMapZoom] = useState(10);

  // Auto-focus on selected memory from memories page
  useEffect(() => {
    if (selectedMemoryForMap) {
      setSelectedMemory(selectedMemoryForMap);
      setMapCenter([selectedMemoryForMap.coordinates.lat, selectedMemoryForMap.coordinates.lng]);
      setMapZoom(15);
      // Clear the selection after using it
      setSelectedMemoryForMap(null);
    }
  }, [selectedMemoryForMap, setSelectedMemoryForMap]);

  // Combine memories and gallery items for map display
  const allMapItems = [
    ...memories.map(memory => ({ ...memory, type: 'memory' })),
    ...galleryData.photoAlbums.map(album => ({ ...album, type: 'gallery', story: album.description, author: 'Family', location: album.name }))
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: allMapItems.length },
    { value: 'celebration', label: 'Celebrations', count: allMapItems.filter(m => m.category === 'celebration').length },
    { value: 'milestone', label: 'Milestones', count: allMapItems.filter(m => m.category === 'milestone').length },
    { value: 'funny', label: 'Funny', count: allMapItems.filter(m => m.category === 'funny').length },
    { value: 'heartwarming', label: 'Heartwarming', count: allMapItems.filter(m => m.category === 'heartwarming').length },
    { value: 'tradition', label: 'Traditions', count: allMapItems.filter(m => m.category === 'tradition').length },
    { value: 'travel', label: 'Travel', count: allMapItems.filter(m => m.category === 'travel').length },
    { value: 'adventures', label: 'Adventures', count: allMapItems.filter(m => m.category === 'adventures').length },
    { value: 'family', label: 'Family', count: allMapItems.filter(m => m.category === 'family').length },
    { value: 'Home', label: 'Home', count: allMapItems.filter(m => m.category === 'Home').length },
    { value: 'IITD', label: 'IITD', count: allMapItems.filter(m => m.category === 'IITD').length }
  ];

  const typeFilters = [
    { value: 'all', label: 'All Items', count: allMapItems.length },
    { value: 'memory', label: 'Memories', count: memories.length },
    { value: 'gallery', label: 'Gallery Albums', count: galleryData.photoAlbums.length }
  ];

  const filteredItems = allMapItems.filter(item => {
    const matchesSearch = (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleItemClick = (item) => {
    setSelectedMemory(item);
    setMapCenter([item.coordinates.lat, item.coordinates.lng]);
    setMapZoom(15);
  };

  const getCategoryColor = (category) => {
    const colors = {
      celebration: 'bg-pink-500',
      milestone: 'bg-green-500',
      funny: 'bg-yellow-500',
      heartwarming: 'bg-red-500',
      tradition: 'bg-blue-500',
      travel: 'bg-purple-500',
      adventures: 'bg-indigo-500',
      family: 'bg-orange-500',
      Home: 'bg-emerald-600',
      IITD: 'bg-red-600'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Memory Map</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our family memories on an interactive map. See where our adventures took place and discover the stories behind each location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters & Search
              </h3>
              
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search memories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {typeFilters.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Memory List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Heart size={18} className="mr-2" />
                Memories ({filteredItems.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedMemory?.id === item.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{item.title || item.name}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar size={12} className="mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`}></div>
                    </div>
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <p className="text-gray-500 text-sm text-center">No memories found matching your filters.</p>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 lg:h-[600px]">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  className="h-full w-full rounded-xl"
                >
                  <ChangeMapView center={mapCenter} zoom={mapZoom} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {filteredItems.map(item => (
                    <Marker
                      key={item.id}
                      position={[item.coordinates.lat, item.coordinates.lng]}
                      icon={createCustomIcon(item.category, item.type)}
                      eventHandlers={{
                        click: () => setSelectedMemory(item)
                      }}
                    >
                      <Popup className="custom-popup">
                        <div className="p-2 max-w-xs">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm">{item.title || item.name}</h3>
                          </div>
                          
                          {(item.image || item.thumbnail) && (
                            <img
                              src={item.image || item.thumbnail}
                              alt={item.title || item.name}
                              className="w-full h-20 object-cover rounded mb-2"
                            />
                          )}
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {item.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {item.location}
                            </div>
                            <div className="flex items-center">
                              <User size={12} className="mr-1" />
                              by {item.author}
                            </div>
                            {item.type === 'gallery' && item.photoCount && (
                              <div className="flex items-center">
                                <Camera size={12} className="mr-1" />
                                {item.photoCount} photos
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-700 mt-2 line-clamp-2 whitespace-pre-line">
                            {item.story}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getCategoryColor(item.category)}`}>
                              {item.category.toUpperCase()}
                            </div>
                            {item.type === 'gallery' && item.googlePhotosUrl && (
                              <a
                                href={item.googlePhotosUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                View Album
                                <ExternalLink size={10} className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Globe size={18} className="mr-2" />
                Map Legend
              </h3>
              
              {/* Marker Types */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Marker Types</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">📍</div>
                    <span className="text-sm text-gray-600">Memories</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">📷</div>
                    <span className="text-sm text-gray-600">Gallery Albums</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.slice(1).map(category => (
                    <div key={category.value} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${getCategoryColor(category.value)} mr-2`}></div>
                      <span className="text-sm text-gray-600">{category.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map; 