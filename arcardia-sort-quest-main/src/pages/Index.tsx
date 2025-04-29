
import React, { useState } from 'react';
import Header from '../components/Header';
import AlgorithmCard from '../components/AlgorithmCard';
import LearningMode from '../components/LearningMode';
import LevelMode from '../components/LevelMode';
import ARSimulation from '../components/ARSimulation';
import { algorithms, AlgorithmKey } from '../utils/sortingAlgorithms';
import { Button } from '@/components/ui/button';

type Mode = 'home' | 'learn' | 'level';

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey | null>(null);
  const [mode, setMode] = useState<Mode>('home');
  
  const handleAlgorithmSelect = (algorithm: AlgorithmKey, selectedMode: 'learn' | 'level') => {
    setSelectedAlgorithm(algorithm);
    setMode(selectedMode);
  };
  
  const handleBackToHome = () => {
    setMode('home');
    setSelectedAlgorithm(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8 px-4">
        {mode === 'home' && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 arcadia-heading">Arcardia Sort Quest</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A gamified AR experience to learn sorting algorithms through interactive challenges and visualizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(Object.keys(algorithms) as AlgorithmKey[]).map((key) => (
                <AlgorithmCard
                  key={key}
                  title={algorithms[key].name}
                  description={algorithms[key].description}
                  difficulty={algorithms[key].difficulty}
                  onClick={(selectedMode) => handleAlgorithmSelect(key, selectedMode)}
                />
              ))}
            </div>
            
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 arcadia-heading text-center">AR Experience</h2>
              <ARSimulation />
            </section>
            
            <section className="mt-12 text-center bg-arcadia-light rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 arcadia-heading">How to Play</h2>
              <p className="mb-6">Arcardia Sort Quest offers two ways to engage with sorting algorithms:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-arcadia-blue">Learning Mode</h3>
                  <p className="mb-4">Understand how sorting algorithms work through step-by-step visualizations and explanations.</p>
                  <ul className="text-left list-disc pl-6 mb-4">
                    <li>Interactive tutorials</li>
                    <li>Detailed explanations</li>
                    <li>Visual step-by-step process</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-arcadia-purple">Level Mode</h3>
                  <p className="mb-4">Challenge yourself by applying sorting algorithms to solve increasingly difficult puzzles.</p>
                  <ul className="text-left list-disc pl-6 mb-4">
                    <li>Multiple difficulty levels</li>
                    <li>Interactive challenges</li>
                    <li>Test your knowledge</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
        
        {mode === 'learn' && selectedAlgorithm && (
          <LearningMode 
            algorithmKey={selectedAlgorithm} 
            onBack={handleBackToHome}
          />
        )}
        
        {mode === 'level' && selectedAlgorithm && (
          <LevelMode 
            algorithmKey={selectedAlgorithm} 
            onBack={handleBackToHome}
          />
        )}
      </main>
      
      <footer className="bg-arcadia-dark text-white py-6">
        <div className="container text-center">
          <p>Arcardia Sort Quest - Learn Sorting Algorithms Through AR Gaming</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
