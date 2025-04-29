
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AlgorithmCardProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onClick: (mode: 'learn' | 'level') => void;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ title, description, difficulty, onClick }) => {
  const difficultyColors = {
    'Easy': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'Hard': 'bg-red-500'
  };

  return (
    <Card className="arcadia-card hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-arcadia-purple/10 to-arcadia-blue/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl arcadia-heading">{title}</CardTitle>
          <span className={`${difficultyColors[difficulty]} text-white text-xs font-bold py-1 px-2 rounded-full`}>
            {difficulty}
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {['3', '1', '4', '5', '2'].map((num, index) => (
            <div 
              key={index} 
              className="w-10 h-14 arcadia-card-number bg-arcadia-light border border-arcadia-purple/30"
            >
              {num}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2">
        <Button 
          className="arcadia-secondary-button flex-1"
          onClick={() => onClick('learn')}
        >
          Learn
        </Button>
        <Button 
          className="arcadia-primary-button flex-1"
          onClick={() => onClick('level')}
        >
          Play
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlgorithmCard;
