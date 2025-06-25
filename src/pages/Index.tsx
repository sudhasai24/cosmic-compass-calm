
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from '../components/WelcomeScreen';
import DashboardScreen from '../components/DashboardScreen';
import DailyModules from '../components/DailyModules';
import MoodTracker from '../components/MoodTracker';
import MentalHealthTools from '../components/MentalHealthTools';
import AICompanion from '../components/AICompanion';
import CrisisSupport from '../components/CrisisSupport';
import Navigation from '../components/Navigation';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('mindbloom_onboarded');
    const userDay = localStorage.getItem('mindbloom_current_day');
    
    if (onboardingStatus === 'true') {
      setIsOnboarded(true);
      setCurrentDay(parseInt(userDay || '1'));
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('mindbloom_onboarded', 'true');
    localStorage.setItem('mindbloom_current_day', '1');
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <WelcomeScreen onComplete={completeOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        <Routes>
          <Route path="/" element={<DashboardScreen currentDay={currentDay} />} />
          <Route path="/daily" element={<DailyModules currentDay={currentDay} />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/tools" element={<MentalHealthTools />} />
          <Route path="/companion" element={<AICompanion />} />
          <Route path="/crisis" element={<CrisisSupport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  );
};

export default Index;
