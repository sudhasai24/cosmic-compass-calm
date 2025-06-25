
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sun, Smile } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Sun className="w-16 h-16 text-amber-400" />,
      title: "Welcome to MindBloom",
      subtitle: "Your 30-day journey to emotional wellness begins here",
      description: "A gentle companion to help you rediscover joy, purpose, and inner strength."
    },
    {
      icon: <Heart className="w-16 h-16 text-rose-400" />,
      title: "Daily Healing",
      subtitle: "Small steps, big changes",
      description: "Daily affirmations, mood check-ins, and purposeful activities designed just for you."
    },
    {
      icon: <Smile className="w-16 h-16 text-green-400" />,
      title: "You're Not Alone",
      subtitle: "Compassionate support every day",
      description: "Track your progress, celebrate wins, and find comfort in difficult moments."
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="mb-8 flex justify-center">
          {slides[currentSlide].icon}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {slides[currentSlide].title}
        </h1>
        
        <h2 className="text-lg text-purple-600 mb-6 font-medium">
          {slides[currentSlide].subtitle}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {slides[currentSlide].description}
        </p>
        
        <div className="flex justify-center mb-6 space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-purple-600 border-purple-200"
          >
            Back
          </Button>
          
          <Button
            onClick={nextSlide}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {currentSlide === slides.length - 1 ? "Start Journey" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
