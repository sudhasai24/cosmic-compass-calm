
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Heart } from 'lucide-react';

const MoodTracker: React.FC = () => {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState<{[key: number]: number}>({});
  const [selectedWeek, setSelectedWeek] = useState(0);

  useEffect(() => {
    // Load mood data from localStorage
    const data: {[key: number]: number} = {};
    for (let i = 1; i <= 30; i++) {
      const mood = localStorage.getItem(`mood_day_${i}`);
      if (mood) {
        data[i] = parseInt(mood);
      }
    }
    setMoodData(data);
  }, []);

  const getMoodEmoji = (rating: number) => {
    if (rating >= 9) return '😊';
    if (rating >= 7) return '🙂';
    if (rating >= 5) return '😐';
    if (rating >= 3) return '😔';
    return '😢';
  };

  const getMoodColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-200 text-green-800';
    if (rating >= 6) return 'bg-yellow-200 text-yellow-800';
    if (rating >= 4) return 'bg-orange-200 text-orange-800';
    return 'bg-red-200 text-red-800';
  };

  const getWeekData = (weekIndex: number) => {
    const startDay = weekIndex * 7 + 1;
    const endDay = Math.min(startDay + 6, 30);
    const weekData = [];
    
    for (let day = startDay; day <= endDay; day++) {
      weekData.push({
        day,
        mood: moodData[day] || null,
        dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(day - 1) % 7]
      });
    }
    return weekData;
  };

  const getWeeklyAverage = (weekIndex: number) => {
    const weekData = getWeekData(weekIndex);
    const validMoods = weekData.filter(d => d.mood !== null).map(d => d.mood as number);
    return validMoods.length > 0 
      ? Math.round(validMoods.reduce((a, b) => a + b, 0) / validMoods.length)
      : null;
  };

  const getInsights = () => {
    const moods = Object.values(moodData);
    if (moods.length < 3) return [];

    const insights = [];
    const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;
    
    if (avgMood >= 7) {
      insights.push("You're maintaining great emotional balance! 🌟");
    } else if (avgMood >= 5) {
      insights.push("You're making steady progress. Keep going! 🌱");
    } else {
      insights.push("Every day is a step forward. You're stronger than you know. 💪");
    }

    // Trend analysis
    const recentMoods = moods.slice(-7);
    const olderMoods = moods.slice(-14, -7);
    
    if (recentMoods.length >= 3 && olderMoods.length >= 3) {
      const recentAvg = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
      const olderAvg = olderMoods.reduce((a, b) => a + b, 0) / olderMoods.length;
      
      if (recentAvg > olderAvg + 0.5) {
        insights.push("Your mood has been improving this week! 📈");
      }
    }

    return insights;
  };

  const weeklyAverage = getWeeklyAverage(selectedWeek);
  const totalWeeks = Math.ceil(30 / 7);

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="text-purple-600"
        >
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Mood Tracker</h1>
        <div className="w-16"></div>
      </div>

      {/* Week Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {Array.from({ length: totalWeeks }, (_, i) => (
          <Button
            key={i}
            variant={selectedWeek === i ? "default" : "outline"}
            onClick={() => setSelectedWeek(i)}
            className={`whitespace-nowrap ${
              selectedWeek === i 
                ? 'bg-purple-500' 
                : 'text-purple-600 border-purple-200'
            }`}
          >
            Week {i + 1}
          </Button>
        ))}
      </div>

      {/* Weekly Overview */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Week {selectedWeek + 1} Overview
          </h2>
          {weeklyAverage && (
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
              <span className="font-bold text-gray-800">{weeklyAverage}/10</span>
            </div>
          )}
        </div>

        {/* Daily Mood Grid */}
        <div className="grid grid-cols-7 gap-2">
          {getWeekData(selectedWeek).map((dayData) => (
            <div key={dayData.day} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{dayData.dayName}</div>
              <div className="text-xs text-gray-400 mb-2">Day {dayData.day}</div>
              {dayData.mood ? (
                <div className={`p-2 rounded-lg ${getMoodColor(dayData.mood)}`}>
                  <div className="text-lg mb-1">{getMoodEmoji(dayData.mood)}</div>
                  <div className="text-xs font-medium">{dayData.mood}</div>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-gray-100">
                  <div className="text-lg mb-1">–</div>
                  <div className="text-xs text-gray-400">No data</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 mb-6">
        <div className="flex items-center mb-4">
          <Heart className="w-5 h-5 text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Your Insights</h2>
        </div>
        
        {getInsights().length > 0 ? (
          <div className="space-y-3">
            {getInsights().map((insight, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Complete a few more daily check-ins to see personalized insights!
            </p>
          </div>
        )}
      </Card>

      {/* Progress Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Journey Progress
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(moodData).length}
            </div>
            <div className="text-sm text-gray-600">Days Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(moodData).filter(m => m >= 7).length}
            </div>
            <div className="text-sm text-gray-600">Good Days</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;
