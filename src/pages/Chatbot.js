import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Heart, Clock, Coffee, AlertCircle } from 'lucide-react';
import { useMemories } from '../context/MemoryContext';

const Chatbot = () => {
  const { memories } = useMemories();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi there! I'm your family memory assistant. I know all about the SAAJ family's beautiful memories, stories, and special moments. Feel free to ask me anything about your family's journey - from the great pizza disaster to Sparsh's driving test adventure, or even about meal planning and upcoming events!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Dynamically create family context based on current memories
  const createFamilyContext = () => {
    const memoriesText = memories.map((memory, index) => 
      `${index + 1}. ${memory.title} (${memory.date}): ${memory.story} [Category: ${memory.category}, Location: ${memory.location}, Author: ${memory.author}]`
    ).join('\n\n');

    return `
    You are a family memory assistant for the SAAJ family (Sparsh-18, Anju-48, Aryan, Jitesh-50). Here's what you know about them:

    FAMILY MEMORIES:
    ${memoriesText}

    MEAL PLANNING CONTEXT:
    The family enjoys planning meals together. Sample meals include pancakes with berries, butter chicken (Dad's favorite), homemade pizza nights, and various Indian dishes like dal tadka, biryani, and chole bhature.

    FAMILY DYNAMICS:
    - Jitesh (Dad, 50): Loves cooking adventures (though not always successful), enjoys salads, tells childhood stories
    - Anju (Mom, 48): The heart of the family, thoughtful planner, loves gardening, enjoys morning tea
    - Aryan: Tech-savvy, loves challenges, made this website, enjoys beatboxing
    - Sparsh (18): Recently turned adult, social media enthusiast, loves entertainment and games

    ADDITIONAL CONTEXT:
    - Total memories documented: ${memories.length}
    - Years covered: ${[...new Set(memories.map(m => m.year))].sort().join(', ')}
    - Memory categories: ${[...new Set(memories.map(m => m.category))].join(', ')}
    - Family storytellers: ${[...new Set(memories.map(m => m.author))].join(', ')}

    Respond as a warm, knowledgeable family friend who remembers all these details and can help with questions about memories, suggest meal ideas, or just chat about family life. Be conversational, caring, and reference specific memories when relevant. Always use the most current information from the family's memory collection.
    `;
  };

  // Check if API key is available
  const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
  const isApiKeyAvailable = apiKey && apiKey.trim() !== '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (!isApiKeyAvailable) {
        throw new Error('API key not configured');
      }

      // Using API key from environment variables with dynamic context
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: createFamilyContext()
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Mistral API:', error);
      
      let errorMessage = '';
      if (!isApiKeyAvailable) {
        errorMessage = "I'm sorry, but the API key hasn't been configured yet. Please add your Mistral API key to the .env file to enable AI responses.";
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = "I'm having trouble accessing the AI service. Please check if your API key is valid and has sufficient credits.";
      } else if (error.message.includes('429')) {
        errorMessage = "I'm receiving too many requests right now. Please wait a moment and try again.";
      } else {
        errorMessage = "I'm experiencing some technical difficulties right now. Let me give you a helpful response based on what I know about your family!";
      }
      
      // Dynamic fallback responses based on current memories
      const getRandomMemory = () => {
        if (memories.length === 0) return "your wonderful family moments";
        const randomMemory = memories[Math.floor(Math.random() * memories.length)];
        return `the ${randomMemory.title.toLowerCase()} from ${randomMemory.date}`;
      };

      const fallbackResponses = [
        `I'd love to help you with that! As your family memory keeper, I remember all ${memories.length} wonderful moments you've shared. Could you tell me more about what specific memory or topic you'd like to discuss?`,
        `That sounds like it would fit right in with your family's collection of beautiful memories! Just like ${getRandomMemory()}.`,
        `Your family has such wonderful stories! With ${memories.length} memories spanning ${[...new Set(memories.map(m => m.year))].length} years. What would you like to know more about?`,
        `I love how your family creates such meaningful moments together. Whether it's ${[...new Set(memories.map(m => m.category))].slice(0, 3).join(', ')}, there's always something special happening in the SAAJ household!`,
        `That reminds me of one of your family's adventures! Your family really knows how to turn ordinary moments into extraordinary memories - you have ${memories.length} beautiful stories to prove it.`
      ];

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: isApiKeyAvailable ? `${errorMessage}\n\n${randomResponse}` : errorMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Dynamically generate suggested questions based on current memories
  const getSuggestedQuestions = () => {
    const baseQuestions = [
      "What should we have for dinner tonight?",
      "Tell me about our family's traditions",
      "What are some upcoming family events?"
    ];

    if (memories.length === 0) {
      return [...baseQuestions, "Tell me about the SAAJ family", "How can I add our first memory?"];
    }

    // Get some interesting memories to suggest
    const recentMemories = memories
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    const memoryQuestions = recentMemories.map(memory => 
      `Tell me about ${memory.title.toLowerCase()}`
    );

    // Add category-based questions
    const categories = [...new Set(memories.map(m => m.category))];
    const categoryQuestions = categories.slice(0, 2).map(category => 
      `What ${category} memories do we have?`
    );

    return [...baseQuestions, ...memoryQuestions, ...categoryQuestions].slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full">
              <MessageCircle className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Family Memory Assistant</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chat with our AI assistant that knows all about the SAAJ family's memories, events, and stories. 
            Ask about past adventures, get meal suggestions, or just have a friendly conversation!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4" style={{ minHeight: '400px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary-500' 
                      : 'bg-gradient-to-r from-secondary-500 to-primary-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="text-white" size={16} />
                    ) : (
                      <Bot className="text-white" size={16} />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className={`text-xs opacity-70 mt-1 block ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Sparkles size={16} className="mr-2" />
                Try asking me about:
              </h4>
              <div className="flex flex-wrap gap-2">
                {getSuggestedQuestions().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-white hover:bg-primary-50 hover:text-primary-600 text-gray-600 px-3 py-2 rounded-full border border-gray-200 transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your family memories, upcoming events, or meal suggestions..."
                className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-red-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Memory Keeper</h3>
            <p className="text-sm text-gray-600">I remember all your family's special moments, from celebrations to funny mishaps.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Event Planner</h3>
            <p className="text-sm text-gray-600">Ask about upcoming events, anniversaries, and important dates for your family.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="text-orange-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Meal Suggestions</h3>
            <p className="text-sm text-gray-600">Get personalized meal ideas based on your family's preferences and past favorites.</p>
          </div>
        </div>

        {/* API Key Status */}
        {!isApiKeyAvailable ? (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="text-red-600 mt-1 mr-3" size={20} />
              <div>
                <h4 className="font-medium text-red-800 mb-1">API Key Required</h4>
                <p className="text-sm text-red-700">
                  To enable AI responses, please add your Mistral API key to the .env file as REACT_APP_MISTRAL_API_KEY. 
                  <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-800 ml-1">
                    Get your API key here
                  </a>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <Sparkles className="text-green-600 mt-1 mr-3" size={20} />
              <div>
                <h4 className="font-medium text-green-800 mb-1">AI Ready</h4>
                <p className="text-sm text-green-700">
                  Your chatbot is connected and ready to help with your family memories and questions!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot; 