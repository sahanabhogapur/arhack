
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ARSimulation: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  
  return (
    <Card className="arcadia-card">
      <CardHeader>
        <CardTitle>AR Marker Simulation</CardTitle>
        <CardDescription>This is a simulated experience of the AR functionality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          In the full Arcardia Sort Quest app, this section would use your device's camera to detect physical Remi cards as markers and create an augmented reality experience.
        </p>
        
        <div className="bg-arcadia-light p-4 rounded-lg">
          <p className="mb-2 font-medium">How AR Cards Would Work:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Place physical numbered cards on a flat surface</li>
            <li>The app recognizes each card as a sorting element</li>
            <li>Rearrange the cards and watch the AR visualization update</li>
            <li>Follow on-screen instructions to complete sorting algorithms</li>
          </ol>
        </div>
        
        {isSimulating ? (
          <div className="aspect-video bg-gradient-to-r from-arcadia-purple to-arcadia-blue relative flex items-center justify-center rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative grid grid-cols-5 gap-3">
                {[4, 2, 7, 1, 5].map((num, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-20 bg-white flex items-center justify-center text-2xl font-bold rounded-lg transform transition-all duration-700"
                    style={{ 
                      animation: `float ${1 + i * 0.2}s ease-in-out infinite alternate`,
                    }}
                  >
                    {num}
                    <div className="absolute -bottom-3 w-full h-1 bg-arcadia-gold rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-30" />
            <p className="text-white text-xl font-bold relative z-10">AR Simulation Active</p>
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">AR preview would appear here</p>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button
            className="arcadia-primary-button"
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? 'Stop Simulation' : 'Start AR Simulation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARSimulation;
