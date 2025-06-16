import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, MapPin, Quote, Gift, Cake, Star, Camera, Plus, Edit3, Trash2, X, Save, User, Globe } from 'lucide-react';
import { useMemories } from '../context/MemoryContext';

const Memories = () => {
  const navigate = useNavigate();
  const { memories, addMemory, editMemory, deleteMemory, setSelectedMemoryForMap } = useMemories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);

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

  const handleSeeOnMap = (memory) => {
    setSelectedMemoryForMap(memory);
    navigate('/map');
  };

  const handleAddMemory = (newMemory) => {
    addMemory(newMemory);
    setShowAddModal(false);
  };

  const handleEditMemory = (updatedMemory) => {
    editMemory(updatedMemory);
    setEditingMemory(null);
  };

  const handleDeleteMemory = (memoryId) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      deleteMemory(memoryId);
    }
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Memories & Timeline</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A chronological journey through our precious moments, celebrations, milestones, and the stories that define the SAAJ family. 
            These are the tales written by our hearts, for our hearts.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Add Memory Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <Plus size={18} className="mr-2" />
              Add New Memory
            </button>
          </div>

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

                    {/* Coordinates */}
                    <div className={`flex flex-wrap gap-4 mb-6 text-sm text-gray-500 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                      <div className="flex items-center">
                        <Globe size={16} className="mr-1" />
                        {memory.coordinates.lat.toFixed(4)}, {memory.coordinates.lng.toFixed(4)}
                      </div>
                    </div>

                    {/* Story */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-500 mb-6">
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {memory.story}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 mb-6 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                      {memory.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex flex-wrap gap-3 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}>
                      <button
                        onClick={() => handleSeeOnMap(memory)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        <MapPin size={16} className="mr-1" />
                        See on Map
                      </button>
                      <button
                        onClick={() => setEditingMemory(memory)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        <Edit3 size={16} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMemory(memory.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </button>
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
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Add New Memory
          </button>
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

export default Memories; 