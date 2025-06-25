
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { Heart, Sun, BookOpen, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyModulesProps {
  currentDay: number;
}

const DailyModules: React.FC<DailyModulesProps> = ({ currentDay }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentModule, setCurrentModule] = useState(0);
  const [moodRating, setMoodRating] = useState([5]);
  const [journalEntry, setJournalEntry] = useState('');
  const [completedGoals, setCompletedGoals] = useState<boolean[]>([false, false, false]);

  const affirmations = [
    "I am worthy of love and happiness",
    "Every day brings new opportunities for growth",
    "I choose to focus on what I can control",
    "My feelings are valid and temporary",
    "I am stronger than my challenges",
    "Small steps lead to big changes",
    "I deserve compassion, especially from myself",
    "Today is a new beginning"
  ];

  const journalPrompts = [
    "What am I grateful for today?",
    "What gives my life meaning and purpose?",
    "How have I grown since yesterday?",
    "What would I tell a friend going through this?",
    "What small victory can I celebrate today?",
    "What brings me genuine joy?",
    "How can I be kinder to myself today?",
    "What am I looking forward to?"
  ];

  const microGoals = [
    "Take a 5-minute walk outside",
    "Text or call someone you care about", 
    "Do one thing that brings you joy"
  ];

  const todaysAffirmation = affirmations[(currentDay - 1) % affirmations.length];
  const todaysPrompt = journalPrompts[(currentDay - 1) % journalPrompts.length];

  useEffect(() => {
    // Load saved data
    const savedMood = localStorage.getItem(`mood_day_${currentDay}`);
    const savedJournal = localStorage.getItem(`journal_day_${currentDay}`);
    const savedGoals = localStorage.getItem(`goals_day_${currentDay}`);

    if (savedMood) setMoodRating([parseInt(savedMood)]);
    if (savedJournal) setJournalEntry(savedJournal);
    if (savedGoals) setCompletedGoals(JSON.parse(savedGoals));
  }, [currentDay]);

  const saveProgress = () => {
    localStorage.setItem(`mood_day_${currentDay}`, moodRating[0].toString());
    localStorage.setItem(`journal_day_${currentDay}`, journalEntry);
    localStorage.setItem(`goals_day_${currentDay}`, JSON.stringify(completedGoals));
  };

  const completeModule = () => {
    saveProgress();
    if (currentModule < 3) {
      setCurrentModule(currentModule + 1);
    } else {
      localStorage.setItem(`day_${currentDay}_completed`, 'true');
      toast({
        title: "Day Complete! 🎉",
        description: "You've finished all your daily activities. Great job!",
      });
      navigate('/');
    }
  };

  const getMoodEmoji = (rating: number) => {
    if (rating >= 9) return '😊';
    if (rating >= 7) return '🙂';
    if (rating >= 5) return '😐';
    if (rating >= 3) return '😔';
    return '😢';
  };

  const getMoodLabel = (rating: number) => {
    if (rating >= 9) return 'Great';
    if (rating >= 7) return 'Good';
    if (rating >= 5) return 'Okay';
    if (rating >= 3) return 'Low';
    return 'Very Low';
  };

  const modules = [
    {
      title: "Daily Affirmation",
      icon: <Sun className="w-6 h-6" />,
      content: (
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-lg mb-6">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              "{todaysAffirmation}"
            </p>
          </div>
          <p className="text-gray-600 mb-4">
            Take a moment to really feel these words. Repeat them to yourself.
          </p>
          <div className="text-4xl mb-4">🌅</div>
        </div>
      )
    },
    {
      title: "Mood Check-In",
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div>
          <p className="text-gray-600 mb-6">How are you feeling right now?</p>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{getMoodEmoji(moodRating[0])}</div>
            <div className="text-xl font-medium text-gray-800 mb-2">
              {getMoodLabel(moodRating[0])}
            </div>
            <div className="text-sm text-gray-500">
              {moodRating[0]}/10
            </div>
          </div>
          <Slider
            value={moodRating}
            onValueChange={setMoodRating}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Very Low</span>
            <span>Great</span>
          </div>
        </div>
      )
    },
    {
      title: "Purpose Journal",
      icon: <BookOpen className="w-6 h-6" />,
      content: (
        <div>
          <p className="text-gray-800 font-medium mb-4">{todaysPrompt}</p>
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-32 mb-4"
          />
          <p className="text-sm text-gray-500">
            There's no right or wrong answer. Just let your thoughts flow.
          </p>
        </div>
      )
    },
    {
      title: "Micro-Goals",
      icon: <Check className="w-6 h-6" />,
      content: (
        <div>
          <p className="text-gray-600 mb-6">
            Small actions, big impact. Try to complete these today:
          </p>
          <div className="space-y-4">
            {microGoals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Checkbox
                  checked={completedGoals[index]}
                  onCheckedChange={(checked) => {
                    const newGoals = [...completedGoals];
                    newGoals[index] = checked as boolean;
                    setCompletedGoals(newGoals);
                  }}
                />
                <label className="text-gray-700 cursor-pointer flex-1">
                  {goal}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Remember: Progress, not perfection. Even one small step counts!
          </p>
        </div>
      )
    }
  ];

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
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Day {currentDay}</h1>
          <p className="text-sm text-gray-600">
            {currentModule + 1} of {modules.length}
          </p>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Progress */}
      <div className="flex space-x-2 mb-6">
        {modules.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= currentModule ? 'bg-purple-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Module Content */}
      <Card className="p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="text-purple-500 mr-3">
            {modules[currentModule].icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {modules[currentModule].title}
          </h2>
        </div>
        
        {modules[currentModule].content}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
          disabled={currentModule === 0}
          className="text-purple-600"
        >
          Previous
        </Button>
        
        <Button
          onClick={completeModule}
          className="bg-gradient-to-r from-purple-500 to-blue-500"
        >
          {currentModule === modules.length - 1 ? "Complete Day" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default DailyModules;
