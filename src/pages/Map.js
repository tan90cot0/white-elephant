import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { 
  Filter, 
  Search, 
  Heart, 
  MapPin,
  Calendar,
  User,
  Globe
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

// Custom marker icons for different categories
const createCustomIcon = (category) => {
  const colors = {
    celebration: '#ec4899',
    milestone: '#10b981',
    funny: '#f59e0b',
    heartwarming: '#ef4444',
    tradition: '#3b82f6',
    travel: '#8b5cf6'
  };
  
  const color = colors[category] || '#6b7280';
  
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 25px;
      height: 25px;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
    ">📍</div>`,
    className: 'custom-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
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
  const { memories, selectedMemoryForMap, setSelectedMemoryForMap } = useMemories();
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
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

  const categories = [
    { value: 'all', label: 'All Categories', count: memories.length },
    { value: 'celebration', label: 'Celebrations', count: memories.filter(m => m.category === 'celebration').length },
    { value: 'milestone', label: 'Milestones', count: memories.filter(m => m.category === 'milestone').length },
    { value: 'funny', label: 'Funny', count: memories.filter(m => m.category === 'funny').length },
    { value: 'heartwarming', label: 'Heartwarming', count: memories.filter(m => m.category === 'heartwarming').length },
    { value: 'tradition', label: 'Traditions', count: memories.filter(m => m.category === 'tradition').length },
    { value: 'travel', label: 'Travel', count: memories.filter(m => m.category === 'travel').length }
  ];

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || memory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
    setMapCenter([memory.coordinates.lat, memory.coordinates.lng]);
    setMapZoom(15);
  };

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
            </div>

            {/* Memory List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Heart size={18} className="mr-2" />
                Memories ({filteredMemories.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMemories.map(memory => (
                  <div
                    key={memory.id}
                    onClick={() => handleMemoryClick(memory)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      selectedMemory?.id === memory.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{memory.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          {memory.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar size={12} className="mr-1" />
                          {memory.date}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(memory.category)}`}></div>
                    </div>
                  </div>
                ))}
                {filteredMemories.length === 0 && (
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
                  
                  {filteredMemories.map(memory => (
                    <Marker
                      key={memory.id}
                      position={[memory.coordinates.lat, memory.coordinates.lng]}
                      icon={createCustomIcon(memory.category)}
                      eventHandlers={{
                        click: () => setSelectedMemory(memory)
                      }}
                    >
                      <Popup className="custom-popup">
                        <div className="p-2 max-w-xs">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm">{memory.title}</h3>
                          </div>
                          
                          {memory.image && (
                            <img
                              src={memory.image}
                              alt={memory.title}
                              className="w-full h-20 object-cover rounded mb-2"
                            />
                          )}
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {memory.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {memory.location}
                            </div>
                            <div className="flex items-center">
                              <User size={12} className="mr-1" />
                              by {memory.author}
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                            {memory.story}
                          </p>
                          
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white mt-2 ${getCategoryColor(memory.category)}`}>
                            {memory.category.toUpperCase()}
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.slice(1).map(category => (
                  <div key={category.value} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getCategoryColor(category.value)} mr-2`}></div>
                    <span className="text-sm text-gray-600">{category.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Manage Memories</h3>
              <p className="text-blue-700">
                To add, edit, or delete memories, visit the{' '}
                <a href="/memories" className="underline hover:text-blue-900 font-medium">
                  Memories page
                </a>. All changes will automatically sync with this map.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map; 