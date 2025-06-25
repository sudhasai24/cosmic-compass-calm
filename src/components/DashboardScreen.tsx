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

  const motivationalQuotes = [
    "Every new day is a chance to change your life.",
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Progress, not perfection, is the goal.",
    "Your current situation is not your final destination.",
    "Small steps every day lead to big changes.",
    "You have survived 100% of your worst days.",
    "Healing is not linear, and that's perfectly okay.",
    "Today you are one day stronger than yesterday.",
    "Your feelings are valid, but they don't define you.",
    "Every sunset brings the promise of a new dawn.",
    "You are worthy of love, especially from yourself.",
    "Difficult roads often lead to beautiful destinations.",
    "Your journey matters more than your destination.",
    "Today is a new page in your story of recovery.",
    "You are not broken, you are breaking through.",
    "Courage doesn't mean you're not afraid; it means you keep going anyway.",
    "Your mental health is just as important as your physical health.",
    "You are allowed to take up space in this world.",
    "Growth begins at the end of your comfort zone.",
    "You are not alone in this journey.",
    "Your past does not dictate your future.",
    "Every breath is a new beginning.",
    "You are enough, exactly as you are right now.",
    "Tomorrow is full of possibilities.",
    "Your strength is greater than any challenge.",
    "Peace comes from within, and you already have it.",
    "You are the author of your own recovery story.",
    "Every day you choose healing is a victory.",
    "Your resilience is your superpower.",
    "You have made it this far, and that's incredible."
  ];

  const todaysQuote = motivationalQuotes[(currentDay - 1) % motivationalQuotes.length];

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
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg mb-3">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">
            "{todaysQuote}"
          </p>
        </div>
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
