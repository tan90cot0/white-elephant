import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, MapPin, Plus, Coffee, Sun, Moon, Edit2, Save, X } from 'lucide-react';
import { useMemories } from '../context/MemoryContext';

const Calendar = () => {
  const { eventsData, mealData } = useMemories();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedMealDate, setSelectedMealDate] = useState(null);

  // Use centralized data
  const events = eventsData;
  const [mealPlans, setMealPlans] = useState(mealData.plans);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateKey) => {
    return events.filter(event => event.date === dateKey);
  };

  const getMealsForDate = (dateKey) => {
    return mealPlans[dateKey] || { breakfast: '', lunch: '', dinner: '' };
  };

  const updateMeal = (dateKey, mealType, value) => {
    setMealPlans(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: value
      }
    }));
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(dateKey);
      const dayMeals = getMealsForDate(dateKey);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const hasMeals = dayMeals.breakfast || dayMeals.lunch || dayMeals.dinner;

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          }`}
          onClick={() => setSelectedDate(dateKey)}
        >
          <div className={`font-semibold text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          
          {/* Events */}
          {dayEvents.slice(0, 1).map(event => (
            <div key={event.id} className={`text-xs p-1 rounded text-white truncate mb-1 ${event.color}`}>
              {event.title}
            </div>
          ))}
          
          {dayEvents.length > 1 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 1} more</div>
          )}

          {/* Meal indicator */}
          {hasMeals && (
            <div className="flex space-x-1 mt-1">
              {dayMeals.breakfast && <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Breakfast planned"></div>}
              {dayMeals.lunch && <div className="w-2 h-2 bg-orange-400 rounded-full" title="Lunch planned"></div>}
              {dayMeals.dinner && <div className="w-2 h-2 bg-red-400 rounded-full" title="Dinner planned"></div>}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const selectedDateMeals = selectedDate ? getMealsForDate(selectedDate) : { breakfast: '', lunch: '', dinner: '' };

  const MealEditModal = ({ dateKey, meals, onClose, onSave }) => {
    const [tempMeals, setTempMeals] = useState(meals);

    const handleSave = () => {
      Object.keys(tempMeals).forEach(mealType => {
        updateMeal(dateKey, mealType, tempMeals[mealType]);
      });
      onSave();
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Plan Meals for {new Date(dateKey).toLocaleDateString()}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Breakfast */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Coffee size={16} className="mr-2 text-yellow-600" />
                Breakfast
              </label>
              <textarea
                value={tempMeals.breakfast}
                onChange={(e) => setTempMeals(prev => ({ ...prev, breakfast: e.target.value }))}
                placeholder="What's for breakfast?"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
              />
            </div>

            {/* Lunch */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Sun size={16} className="mr-2 text-orange-600" />
                Lunch
              </label>
              <textarea
                value={tempMeals.lunch}
                onChange={(e) => setTempMeals(prev => ({ ...prev, lunch: e.target.value }))}
                placeholder="What's for lunch?"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
              />
            </div>

            {/* Dinner */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Moon size={16} className="mr-2 text-red-600" />
                Dinner
              </label>
              <textarea
                value={tempMeals.dinner}
                onChange={(e) => setTempMeals(prev => ({ ...prev, dinner: e.target.value }))}
                placeholder="What's for dinner?"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Save size={16} className="mr-2" />
              Save Meals
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Calendar & Meal Planner</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Keep track of important family events, milestones, and plan delicious meals for every day.
            Never miss a birthday or wonder "what's for dinner?" again!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center font-semibold text-gray-700">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Breakfast</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Lunch</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Dinner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            {selectedDate && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Events for selected date */}
                {selectedDateEvents.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                      <CalendarIcon size={16} className="mr-2" />
                      Events
                    </h4>
                    <div className="space-y-2">
                      {selectedDateEvents.map(event => (
                        <div key={event.id} className="bg-gray-50 rounded-lg p-3">
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white mb-2 ${event.color}`}>
                            {event.type.toUpperCase()}
                          </div>
                          <h5 className="font-medium text-gray-800">{event.title}</h5>
                          <div className="text-sm text-gray-600 mt-1 space-y-1">
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users size={12} className="mr-1" />
                              {event.attendees.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meals for selected date */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <Coffee size={16} className="mr-2" />
                      Meal Plan
                    </h4>
                    <button
                      onClick={() => {
                        setSelectedMealDate(selectedDate);
                        setShowMealModal(true);
                      }}
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                    >
                      <Edit2 size={14} className="mr-1" />
                      Edit
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <Coffee size={14} className="text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800">Breakfast</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        {selectedDateMeals.breakfast || 'No breakfast planned'}
                      </p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <Sun size={14} className="text-orange-600 mr-2" />
                        <span className="font-medium text-orange-800">Lunch</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        {selectedDateMeals.lunch || 'No lunch planned'}
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <Moon size={14} className="text-red-600 mr-2" />
                        <span className="font-medium text-red-800">Dinner</span>
                      </div>
                      <p className="text-sm text-red-700">
                        {selectedDateMeals.dinner || 'No dinner planned'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CalendarIcon size={18} className="mr-2" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="border-l-4 border-primary-500 pl-3">
                      <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  ))}
                {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200 flex items-center">
                  <Plus size={16} className="mr-3 text-primary-600" />
                  <span className="text-primary-700 font-medium">Add New Event</span>
                </button>
                <button 
                  onClick={() => {
                    const today = formatDateKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                    setSelectedMealDate(today);
                    setShowMealModal(true);
                  }}
                  className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Coffee size={16} className="mr-3 text-orange-600" />
                  <span className="text-orange-700 font-medium">Plan Today's Meals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Edit Modal */}
      {showMealModal && selectedMealDate && (
        <MealEditModal
          dateKey={selectedMealDate}
          meals={getMealsForDate(selectedMealDate)}
          onClose={() => {
            setShowMealModal(false);
            setSelectedMealDate(null);
          }}
          onSave={() => {
            // Refresh the selected date if it matches
            if (selectedDate === selectedMealDate) {
              // The meals will automatically update due to state change
            }
          }}
        />
      )}
    </div>
  );
};

export default Calendar; 