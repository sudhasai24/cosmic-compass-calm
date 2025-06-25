
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Sun, Heart, Calendar, BookOpen } from 'lucide-react';

interface DashboardScreenProps {
  currentDay: number;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ currentDay }) => {
  const navigate = useNavigate();
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [weeklyMoodAvg, setWeeklyMoodAvg] = useState(7);

  useEffect(() => {
    const completed = localStorage.getItem(`day_${currentDay}_completed`);
    setTodayCompleted(completed === 'true');
    
    // Calculate weekly mood average
    const moods = [];
    for (let i = Math.max(1, currentDay - 6); i <= currentDay; i++) {
      const mood = localStorage.getItem(`mood_day_${i}`);
      if (mood) moods.push(parseInt(mood));
    }
    if (moods.length > 0) {
      setWeeklyMoodAvg(Math.round(moods.reduce((a, b) => a + b, 0) / moods.length));
    }
  }, [currentDay]);

  const progressPercentage = (currentDay / 30) * 100;

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <div className="flex justify-center mb-3">
          <Sun className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Good morning! ✨
        </h1>
        <p className="text-gray-600">
          Day {currentDay} of your healing journey
        </p>
      </div>

      {/* Progress Card */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <span className="text-sm opacity-90">{currentDay}/30 days</span>
        </div>
        <Progress value={progressPercentage} className="h-3 bg-white/20" />
        <p className="text-sm mt-3 opacity-90">
          You're {Math.round(progressPercentage)}% through your journey!
        </p>
      </Card>

      {/* Today's Activities */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Healing</h2>
          {todayCompleted && (
            <span className="text-green-500 text-sm font-medium">✓ Complete</span>
          )}
        </div>
        
        <Button
          onClick={() => navigate('/daily')}
          className={`w-full py-6 text-left justify-start ${
            todayCompleted 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
          }`}
          variant={todayCompleted ? 'outline' : 'default'}
        >
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-3" />
            <div>
              <div className="font-medium">
                {todayCompleted ? 'Review Today\'s Progress' : 'Start Daily Activities'}
              </div>
              <div className="text-sm opacity-75">
                Affirmations • Mood Check • Journal • Goals
              </div>
            </div>
          </div>
        </Button>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{currentDay}</div>
          <div className="text-sm text-gray-600">Days Strong</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">
            {weeklyMoodAvg >= 8 ? '😊' : weeklyMoodAvg >= 6 ? '🙂' : '🌱'}
          </div>
          <div className="text-2xl font-bold text-gray-800">{weeklyMoodAvg}/10</div>
          <div className="text-sm text-gray-600">Weekly Mood</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button
          onClick={() => navigate('/mood')}
          variant="outline"
          className="w-full justify-start py-6"
        >
          <BookOpen className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">View Mood Tracker</div>
            <div className="text-sm text-gray-500">See your progress over time</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DashboardScreen;
