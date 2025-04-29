import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Shuffle, SortAsc, View } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import 'aframe';
import 'ar.js';

interface ARVisualizationProps {
  onSwap?: (index1: number, index2: number) => void;
}

const ARVisualization: React.FC<ARVisualizationProps> = ({ onSwap }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [detectedHands, setDetectedHands] = useState(false);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [cameraActive, setCameraActive] = useState(false);
  const [arMode, setARMode] = useState<'hands' | 'marker'>('hands');
  const [isSorting, setIsSorting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const bubbleContainerRef = useRef<any>(null);

  useEffect(() => {
    generateRandomNumbers();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const generateRandomNumbers = () => {
    const randomNums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
    setNumbers(randomNums);
    updateARBubbles(randomNums);
  };

  const updateARBubbles = (nums: number[], animate = false) => {
    if (!bubbleContainerRef.current) return;
    
    // Clear existing bubbles
    bubbleContainerRef.current.innerHTML = '';

    // Create new bubbles
    nums.forEach((num, index) => {
      const bubble = document.createElement('a-sphere');
      bubble.setAttribute('radius', '0.1');
      bubble.setAttribute('color', `hsl(${num * 36}, 70%, 70%)`);
      bubble.setAttribute('position', {
        x: index * 0.25 - (nums.length * 0.25) / 2,
        y: 0,
        z: 0
      });
      bubble.setAttribute('text', {
        value: num.toString(),
        align: 'center',
        color: '#000000',
        width: 3
      });

      if (animate) {
        bubble.setAttribute('animation', {
          property: 'position',
          dur: 500,
          easing: 'easeInOutQuad'
        });
      }

      bubbleContainerRef.current.appendChild(bubble);
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        toast.success("Camera started successfully");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Could not access camera. Please ensure you have granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setDetectedHands(false);
    }
  };

  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const nums = [...numbers];
    const n = nums.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (nums[j] > nums[j + 1]) {
          // Swap numbers
          [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
          setNumbers([...nums]);
          updateARBubbles(nums, true);
          
          // Show code
          setCurrentCode(`[array[${j}], array[${j + 1}]] = [array[${j + 1}], array[${j}]];`);
          
          // Notify parent
          if (onSwap) {
            onSwap(j, j + 1);
          }
          
          // Animation delay
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    setIsSorting(false);
    toast.success("Sorting completed!");
  };

  const handleSimulateHandDetection = () => {
    setDetectedHands(true);
    const index1 = Math.floor(Math.random() * numbers.length);
    const index2 = Math.floor(Math.random() * numbers.length);
    
    if (index1 !== index2) {
      const newNumbers = [...numbers];
      setCurrentCode(`[array[${index1}], array[${index2}]] = [array[${index2}], array[${index1}]];`);
      [newNumbers[index1], newNumbers[index2]] = [newNumbers[index2], newNumbers[index1]];
      setNumbers(newNumbers);
      updateARBubbles(newNumbers, true);
      
      if (onSwap) {
        onSwap(index1, index2);
      }
    }
  };

  return (
    <Card className="arcadia-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AR Sorting Visualization</CardTitle>
          <span className={`px-3 py-1 rounded-full text-sm ${detectedHands ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {detectedHands ? 'Hands Detected' : 'No Hands'}
          </span>
        </div>
        <CardDescription>Experience sorting algorithms in augmented reality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="hands" onValueChange={(v) => setARMode(v as 'hands' | 'marker')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hands">Hand Detection</TabsTrigger>
            <TabsTrigger value="marker">Marker Based</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hands" className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-4 bg-black/30">
                {numbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-20 bg-white/90 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="marker">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <a-scene embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
                <a-marker type="pattern" url="/markers/sherlock-marker.patt">
                  <a-entity
                    ref={bubbleContainerRef}
                    position="0 0.5 0"
                    scale="0.5 0.5 0.5">
                  </a-entity>
                </a-marker>
                <a-entity camera></a-entity>
              </a-scene>
            </div>
          </TabsContent>
        </Tabs>

        {currentCode && (
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
            {currentCode}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <Button 
              variant={cameraActive ? "destructive" : "default"}
              className="flex-1"
              onClick={cameraActive ? stopCamera : startCamera}
            >
              {cameraActive ? (
                <>
                  <CameraOff className="mr-2" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Camera className="mr-2" />
                  Start Camera
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={generateRandomNumbers}
              disabled={!cameraActive || isSorting}
            >
              <Shuffle className="mr-2" />
              Shuffle
            </Button>
          </div>

          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={bubbleSort}
              disabled={!cameraActive || isSorting}
            >
              <SortAsc className="mr-2" />
              Sort
            </Button>

            {arMode === 'hands' && (
              <Button 
                variant="secondary"
                className="flex-1"
                onClick={handleSimulateHandDetection}
                disabled={!cameraActive || isSorting}
              >
                <View className="mr-2" />
                Simulate Hand Detection
              </Button>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Instructions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {arMode === 'hands' ? (
              <>
                <li>Point camera at your hands making swap gestures</li>
                <li>Use physical numbered cards</li>
                <li>Move cards to swap their positions</li>
              </>
            ) : (
              <>
                <li>Point camera at the Sherlock keychain marker</li>
                <li>Keep the marker in view during sorting</li>
                <li>Ensure good lighting for better tracking</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARVisualization;
