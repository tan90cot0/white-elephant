import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Heart, 
  Filter, 
  Search, 
  X,
  Save,
  User,
  Globe
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: "Father's Day Celebration",
      date: "June 18, 2023",
      category: "celebration",
      location: "Home",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      author: "Aryan",
      story: "A heartwarming Father's Day celebration where we surprised Dad with his favorite cake and heartfelt letters.",
      tags: ["celebration", "father's day", "family time", "love"],
      image: "https://images.unsplash.com/photo-1567722681333-3115abe1a4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    },
    {
      id: 4,
      title: "Family Vacation to Goa",
      date: "August 20, 2022",
      category: "travel",
      location: "Goa",
      coordinates: { lat: 15.2993, lng: 74.1240 },
      author: "Jitesh",
      story: "An unforgettable week-long family vacation to the beautiful beaches of Goa.",
      tags: ["travel", "vacation", "beach", "bonding"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2022"
    },
    {
      id: 9,
      title: "Sparsh's Driving Test Adventure",
      date: "March 8, 2023",
      category: "milestone",
      location: "DMV",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      author: "Anju",
      story: "The day Sparsh was scheduled to take his driving test, he was more nervous than we'd ever seen him.",
      tags: ["milestone", "pride", "growing up", "achievement", "support"],
      image: "https://images.unsplash.com/photo-1570025330536-a4d5ad4d4d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      year: "2023"
    }
  ]);

  const [selectedMemory, setSelectedMemory] = useState(null);
  const [editingMemory, setEditingMemory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [mapZoom, setMapZoom] = useState(10);

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

  const handleAddMemory = (newMemory) => {
    const memory = {
      ...newMemory,
      id: Date.now(),
      year: new Date(newMemory.date).getFullYear().toString()
    };
    setMemories(prev => [...prev, memory]);
    setShowAddModal(false);
  };

  const handleEditMemory = (updatedMemory) => {
    setMemories(prev => prev.map(m => m.id === updatedMemory.id ? updatedMemory : m));
    setEditingMemory(null);
    setSelectedMemory(updatedMemory);
  };

  const handleDeleteMemory = (memoryId) => {
    setMemories(prev => prev.filter(m => m.id !== memoryId));
    setSelectedMemory(null);
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

  const MemoryForm = ({ memory, onSave, onClose, isEdit = false }) => {
    const [formData, setFormData] = useState(memory || {
      title: '',
      date: '',
      category: 'celebration',
      location: '',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      author: '',
      story: '',
      tags: [],
      image: '',
    });

    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    const addTag = () => {
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput('');
      }
    };

    const removeTag = (tagToRemove) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? 'Edit Memory' : 'Add New Memory'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="celebration">Celebration</option>
                  <option value="milestone">Milestone</option>
                  <option value="funny">Funny</option>
                  <option value="heartwarming">Heartwarming</option>
                  <option value="tradition">Tradition</option>
                  <option value="travel">Travel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates?.lat || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: { ...prev.coordinates, lat: parseFloat(e.target.value) }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates?.lng || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    coordinates: { ...prev.coordinates, lng: parseFloat(e.target.value) }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story
              </label>
              <textarea
                value={formData.story}
                onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Save size={18} className="mr-2" />
                {isEdit ? 'Update Memory' : 'Save Memory'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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

              {/* Add Memory Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Plus size={18} className="mr-2" />
                Add New Memory
              </button>
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
                            <div className="flex space-x-1 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingMemory(memory);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm('Are you sure you want to delete this memory?')) {
                                    handleDeleteMemory(memory.id);
                                  }
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
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
          </div>
        </div>
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <MemoryForm
          onSave={handleAddMemory}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Memory Modal */}
      {editingMemory && (
        <MemoryForm
          memory={editingMemory}
          onSave={handleEditMemory}
          onClose={() => setEditingMemory(null)}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Map; 