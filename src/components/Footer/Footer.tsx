import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-white">About</h2>
            <p className="text-gray-400 leading-relaxed">
              Exploring the rich cultural heritage of winter festivities across the Iberian Peninsula.
              Join us in discovering ancient traditions that continue to captivate and inspire.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  Interactive Map
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  Cultural Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  Local Traditions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <div className="space-y-3">
              <a 
                href="mailto:info@iberianrituals.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                info@iberianrituals.com
              </a>
              
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Iberian Winter Rituals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
