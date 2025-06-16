import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold">SAAJ</span>
          </div>
          <p className="text-gray-300 mb-4">
            Sparsh • Anju • Aryan • Jitesh
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>by Aryan • Maintained by SAAJ</span>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} SAAJ Family. All memories cherished.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 