
import React, { useState, useEffect } from 'react';
import { Step } from '@/utils/sortingAlgorithms';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, ArrowLeft, ArrowRight } from 'lucide-react';

interface SortingVisualizerProps {
  steps: Step[];
  onComplete?: () => void;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ steps, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // Speed multiplier
  const currentStep = steps[currentStepIndex];
  
  useEffect(() => {
    let timer: number;
    
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1000 / speed);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
    
    return () => clearTimeout(timer);
  }, [currentStepIndex, isPlaying, speed, steps.length, onComplete]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-6">
        <p className="text-lg font-medium mb-4 text-center">{currentStep.description}</p>
        <div className="flex justify-center gap-2 mb-6">
          {currentStep.array.map((value, index) => {
            const isComparing = currentStep.comparingIndices?.includes(index);
            const isSwapped = currentStep.swappedIndices?.includes(index);
            
            return (
              <div 
                key={index}
                className={`
                  w-12 h-16 flex items-center justify-center text-xl font-bold rounded-md transition-all duration-300
                  ${isComparing ? 'bg-arcadia-blue text-white scale-110' : 
                    isSwapped ? 'bg-arcadia-purple text-white scale-110' : 
                    'bg-arcadia-light text-arcadia-dark'}
                `}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Step {currentStepIndex + 1} of {steps.length}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">Speed:</span>
            <Slider 
              value={[speed]} 
              min={0.5} 
              max={3} 
              step={0.5}
              className="w-20" 
              onValueChange={(value) => setSpeed(value[0])}
            />
            <span className="text-sm">{speed}x</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button
            className="arcadia-primary-button w-24"
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
            {!isPlaying && <Play className="h-4 w-4 ml-1" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1 && !onComplete}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
