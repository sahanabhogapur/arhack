import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { algorithms, AlgorithmKey, Step } from '@/utils/sortingAlgorithms';
import { ArrowLeft, Trophy, Flag } from 'lucide-react';
import { toast } from 'sonner';
import ARVisualization from '@/components/ARVisualization';

interface LevelModeProps {
  algorithmKey: AlgorithmKey;
  onBack: () => void;
}

const LevelMode: React.FC<LevelModeProps> = ({ algorithmKey, onBack }) => {
  const algorithm = algorithms[algorithmKey];
  const [gameStage, setGameStage] = useState<'intro' | 'level' | 'completed'>('intro');
  const [level, setLevel] = useState(1);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [userArray, setUserArray] = useState<number[]>([]);
  const [correctSteps, setCorrectSteps] = useState<number[][]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [targetPosition, setTargetPosition] = useState<number | null>(null);
  
  const startLevel = (levelNum: number) => {
    let array: number[];
    let size: number;
    
    switch (levelNum) {
      case 1:
        size = 4;
        break;
      case 2:
        size = 5;
        break;
      case 3:
        size = 6;
        break;
      default:
        size = 4;
    }
    
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1);
    setCurrentArray([...array]);
    setUserArray([...array]);
    
    const sortSteps = algorithm.function(array);
    const steps = sortSteps.map(step => [...step.array]);
    setCorrectSteps(steps);
    
    setGameStage('level');
  };
  
  const handleCardClick = (index: number) => {
    if (selectedCard === null) {
      setSelectedCard(index);
    } else if (selectedCard === index) {
      setSelectedCard(null);
    } else {
      const newArray = [...userArray];
      [newArray[selectedCard], newArray[index]] = [newArray[index], newArray[selectedCard]];
      setUserArray(newArray);
      setSelectedCard(null);
      
      const matchesAnyStep = correctSteps.some(step => 
        JSON.stringify(step) === JSON.stringify(newArray)
      );
      
      if (matchesAnyStep) {
        toast.success("Good move! That follows the sorting algorithm.");
      }
      
      const isSorted = newArray.every((val, i, arr) => !i || val >= arr[i - 1]);
      if (isSorted && JSON.stringify(newArray) === JSON.stringify(correctSteps[correctSteps.length - 1])) {
        setGameStage('completed');
      }
    }
  };
  
  const isCorrectMove = (fromIndex: number, toIndex: number): boolean => {
    if (algorithmKey === 'bubble') {
      return Math.abs(fromIndex - toIndex) === 1;
    } else if (algorithmKey === 'selection') {
      return true;
    } else if (algorithmKey === 'insertion') {
      return true;
    }
    return false;
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold arcadia-heading">{algorithm.name}: Level Mode</h2>
        <p className="text-muted-foreground">Test your knowledge by solving sorting challenges</p>
      </div>
      
      {gameStage === 'intro' && (
        <Card className="arcadia-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-arcadia-gold" />
              Level Challenge
            </CardTitle>
            <CardDescription>Choose a difficulty level to begin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>In this mode, you'll need to sort the array using the {algorithm.name} algorithm. Select a card and then select another card to swap them according to the algorithm's rules.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Button 
                className="arcadia-secondary-button h-24"
                onClick={() => startLevel(1)}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">Level 1</div>
                  <div className="text-sm">Beginner</div>
                </div>
              </Button>
              
              <Button 
                className="arcadia-primary-button h-24"
                onClick={() => startLevel(2)}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">Level 2</div>
                  <div className="text-sm">Intermediate</div>
                </div>
              </Button>
              
              <Button 
                className="bg-arcadia-purple/80 text-white hover:bg-arcadia-purple arcadia-button h-24"
                onClick={() => startLevel(3)}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">Level 3</div>
                  <div className="text-sm">Advanced</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {gameStage === 'level' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="arcadia-card">
            <CardHeader>
              <CardTitle>Level {level} Challenge</CardTitle>
              <CardDescription>
                Sort the array using {algorithm.name}. Click on cards to swap them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-arcadia-light p-4 rounded-lg">
                <p className="mb-2">Remember the key steps for {algorithm.name}:</p>
                {algorithmKey === 'bubble' && (
                  <p>Compare adjacent elements and swap if they are in the wrong order.</p>
                )}
                {algorithmKey === 'selection' && (
                  <p>Find the minimum element and swap it with the element at the current position.</p>
                )}
                {algorithmKey === 'insertion' && (
                  <p>Insert each element into its correct position in the sorted section of the array.</p>
                )}
              </div>
              
              <div className="bg-white border-2 border-dashed border-arcadia-purple/30 rounded-lg p-6">
                <div className="flex justify-center gap-3">
                  {userArray.map((value, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className={`
                        w-16 h-20 flex items-center justify-center text-2xl font-bold rounded-md cursor-pointer transition-all duration-300
                        ${selectedCard === index 
                          ? 'bg-arcadia-purple text-white scale-110 shadow-lg' 
                          : 'bg-arcadia-light hover:bg-arcadia-purple/20'}
                      `}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => startLevel(level)}
                >
                  Restart Level
                </Button>
                <Button 
                  className="arcadia-primary-button"
                  onClick={() => setGameStage('intro')}
                >
                  Change Level
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <ARVisualization 
            onSwap={(index1, index2) => {
              const newArray = [...userArray];
              [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
              setUserArray(newArray);
              
              const matchesAnyStep = correctSteps.some(step => 
                JSON.stringify(step) === JSON.stringify(newArray)
              );
              
              if (matchesAnyStep) {
                toast.success("Good move! That follows the sorting algorithm.");
              }
              
              const isSorted = newArray.every((val, i, arr) => !i || val >= arr[i - 1]);
              if (isSorted && JSON.stringify(newArray) === JSON.stringify(correctSteps[correctSteps.length - 1])) {
                setGameStage('completed');
              }
            }} 
          />
        </div>
      )}
      
      {gameStage === 'completed' && (
        <Card className="arcadia-card">
          <CardHeader className="bg-gradient-to-r from-arcadia-gold/20 to-arcadia-purple/20">
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-6 w-6 text-arcadia-gold" />
              Level Completed!
            </CardTitle>
            <CardDescription>Great job mastering the {algorithm.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-arcadia-purple mb-4">🎉</div>
              <p className="text-lg">Congratulations! You've successfully sorted the array using {algorithm.name}.</p>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              {level < 3 ? (
                <Button
                  className="arcadia-primary-button"
                  onClick={() => {
                    setLevel(level + 1);
                    startLevel(level + 1);
                  }}
                >
                  Next Level
                </Button>
              ) : (
                <Button
                  className="arcadia-accent-button"
                  onClick={onBack}
                >
                  All Levels Completed!
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LevelMode;
