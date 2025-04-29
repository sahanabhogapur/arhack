
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { algorithms, AlgorithmKey, Step } from '@/utils/sortingAlgorithms';
import SortingVisualizer from './SortingVisualizer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, ArrowLeft } from 'lucide-react';

interface LearningModeProps {
  algorithmKey: AlgorithmKey;
  onBack: () => void;
}

const LearningMode: React.FC<LearningModeProps> = ({ algorithmKey, onBack }) => {
  const algorithm = algorithms[algorithmKey];
  const [currentStage, setCurrentStage] = useState<'intro' | 'explanation' | 'visualization'>('intro');
  const [steps, setSteps] = useState<Step[]>([]);
  
  const handleStartVisualization = () => {
    // Generate random array of 5 numbers
    const randomArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
    const sortSteps = algorithm.function(randomArray);
    setSteps(sortSteps);
    setCurrentStage('visualization');
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
        <h2 className="text-2xl font-bold arcadia-heading">{algorithm.name}: Learning Mode</h2>
        <p className="text-muted-foreground">Master the concepts behind this sorting algorithm</p>
      </div>
      
      {currentStage === 'intro' && (
        <Card className="arcadia-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-6 w-6 text-arcadia-purple" />
              Introduction to {algorithm.name}
            </CardTitle>
            <CardDescription>Learn about how this algorithm works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{algorithm.description}</p>
            <div className="flex justify-center">
              <Button 
                className="arcadia-primary-button"
                onClick={() => setCurrentStage('explanation')}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {currentStage === 'explanation' && (
        <Card className="arcadia-card">
          <CardHeader>
            <CardTitle>How {algorithm.name} Works</CardTitle>
            <CardDescription>Understanding the algorithm step by step</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-arcadia-light p-4 rounded-lg">
              <p>{algorithm.explanation}</p>
            </div>
            
            {algorithmKey === 'bubble' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Key Characteristics:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Simple to understand and implement</li>
                  <li>O(n²) time complexity in worst and average cases</li>
                  <li>Efficient for nearly sorted arrays</li>
                  <li>In-place sorting algorithm (doesn't require extra space)</li>
                </ul>
              </div>
            )}
            
            {algorithmKey === 'selection' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Key Characteristics:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Simple to understand and implement</li>
                  <li>O(n²) time complexity regardless of input</li>
                  <li>Makes fewer swaps compared to bubble sort</li>
                  <li>In-place sorting algorithm (doesn't require extra space)</li>
                </ul>
              </div>
            )}
            
            {algorithmKey === 'insertion' && (
              <div className="space-y-4">
                <h3 className="font-semibold">Key Characteristics:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Simple to understand and implement</li>
                  <li>O(n²) time complexity in worst and average cases</li>
                  <li>O(n) time complexity for nearly sorted arrays</li>
                  <li>In-place sorting algorithm (doesn't require extra space)</li>
                  <li>Online algorithm - can sort as it receives input</li>
                </ul>
              </div>
            )}
            
            <div className="flex justify-center">
              <Button 
                className="arcadia-primary-button"
                onClick={handleStartVisualization}
              >
                See it in action
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {currentStage === 'visualization' && (
        <div className="space-y-6">
          <Card className="arcadia-card">
            <CardHeader>
              <CardTitle>{algorithm.name} in Action</CardTitle>
              <CardDescription>Watch the algorithm sort step by step</CardDescription>
            </CardHeader>
            <CardContent>
              <SortingVisualizer steps={steps} />
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={handleStartVisualization}
            >
              Try another array
            </Button>
            <Button 
              className="arcadia-primary-button"
              onClick={onBack}
            >
              Back to algorithms
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMode;
