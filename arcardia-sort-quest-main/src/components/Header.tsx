
import React from 'react';
import { Book } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-arcadia-purple to-arcadia-blue text-white p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Book className="h-8 w-8 text-arcadia-gold animate-float" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Arcardia Sort Quest
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <a href="#" className="hover:text-arcadia-gold transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-arcadia-gold transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-arcadia-gold transition-colors">Tutorial</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
