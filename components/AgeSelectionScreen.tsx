
import React from 'react';
import { AgeRange } from '../types';
import Button from './Button';
import { AGE_RANGES } from '../constants';

interface AgeSelectionScreenProps {
  onSelectAge: (range: AgeRange) => void;
}

const AgeSelectionScreen: React.FC<AgeSelectionScreenProps> = ({ onSelectAge }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full h-full animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Math Mate
        </h1>
        <p className="text-gray-500 text-lg">Choose your age to start playing!</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
        {AGE_RANGES.map((range) => (
          <Button
            key={range.key}
            onClick={() => onSelectAge(range)}
            size="lg"
            className="w-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 border-none"
          >
            {range.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AgeSelectionScreen;
