import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const events = [
    {
      id: 1,
      title: "Jitesh's Birthday",
      date: "2024-03-15",
      time: "19:00",
      type: "birthday",
      location: "Home",
      description: "Celebrating Dad's special day with family dinner and cake!"
    },
    {
      id: 2,
      title: "Anju's Birthday",
      date: "2024-05-22",
      time: "18:30",
      type: "birthday",
      location: "Home",
      description: "Mom's birthday celebration with her favorite cake and flowers!"
    },
    {
      id: 3,
      title: "Sparsh's Birthday",
      date: "2024-10-15",
      time: "19:30",
      type: "birthday",
      location: "Home",
      description: "Our youngest turns 19! Party with friends and family."
    },
    {
      id: 4,
      title: "Wedding Anniversary",
      date: "2024-02-14",
      time: "20:00",
      type: "anniversary",
      location: "Special Restaurant",
      description: "Mom and Dad's wedding anniversary celebration!"
    },
    {
      id: 5,
      title: "Family Game Night",
      date: "2024-01-20",
      time: "20:00",
      type: "regular",
      location: "Living Room",
      description: "Weekly family game night with board games and snacks."
    },
    {
      id: 6,
      title: "Diwali Celebration",
      date: "2024-11-01",
      time: "18:00",
      type: "festival",
      location: "Home",
      description: "Festival of lights celebration with decorations and sweets!"
    },
    {
      id: 7,
      title: "Christmas Dinner",
      date: "2024-12-25",
      time: "19:00",
      type: "festival",
      location: "Home",
      description: "Special Christmas dinner with the whole family."
    },
    {
      id: 8,
      title: "New Year's Eve",
      date: "2024-12-31",
      time: "21:00",
      type: "celebration",
      location: "Home",
      description: "Welcoming the new year together with resolutions and hopes!"
    }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      birthday: "bg-pink-500 text-white",
      anniversary: "bg-red-500 text-white",
      festival: "bg-orange-500 text-white",
      regular: "bg-blue-500 text-white",
      celebration: "bg-purple-500 text-white"
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isCurrentDay = isToday(date);
      
      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isCurrentDay ? 'bg-primary-50 border-primary-300' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isCurrentDay ? 'text-primary-600' : 'text-gray-800'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded truncate ${getEventTypeColor(event.type)}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Calendar</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep track of birthdays, anniversaries, festivals, and all the special moments that bring our family together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold">{formatDate(currentDate)}</h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 bg-gray-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-4 text-center font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <CalendarIcon size={20} className="mr-2 text-primary-600" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-l-4 border-primary-500 bg-primary-50 p-3 rounded-r-lg">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <CalendarIcon size={12} className="mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock size={12} className="mr-1" />
                      {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Types</h3>
              <div className="space-y-2">
                {[
                  { type: 'birthday', label: 'Birthdays' },
                  { type: 'anniversary', label: 'Anniversaries' },
                  { type: 'festival', label: 'Festivals' },
                  { type: 'regular', label: 'Regular Events' },
                  { type: 'celebration', label: 'Celebrations' }
                ].map(({ type, label }) => (
                  <div key={type} className="flex items-center">
                    <div className={`w-4 h-4 rounded mr-2 ${getEventTypeColor(type)}`}></div>
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Events for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No events scheduled for this date.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; 