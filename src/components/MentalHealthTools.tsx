
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, BookOpen } from 'lucide-react';

const MentalHealthTools: React.FC = () => {
  const navigate = useNavigate();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');

  const meditations = [
    {
      title: "Morning Calm",
      duration: "5 min",
      description: "Start your day with gentle awareness and intention",
      script: "Find a comfortable position... Close your eyes... Take a deep breath in... and slowly let it out..."
    },
    {
      title: "Stress Relief",
      duration: "7 min", 
      description: "Release tension and find peace in the present moment",
      script: "Notice any tension in your body... With each breath, let that tension melt away..."
    },
    {
      title: "Evening Wind-Down",
      duration: "10 min",
      description: "Gentle reflection and preparation for restful sleep",
      script: "As the day comes to an end, take time to acknowledge your efforts..."
    }
  ];

  const cbtTools = [
    {
      title: "Thought Challenging",
      description: "Question negative thought patterns",
      prompt: "What evidence supports this thought? What evidence contradicts it?"
    },
    {
      title: "Mood-Behavior Connection",
      description: "Understand how feelings affect actions",
      prompt: "How does this feeling influence my behavior? What would I do if I felt differently?"
    },
    {
      title: "Gratitude Reframe",
      description: "Shift focus to positive aspects",
      prompt: "What are three things I'm grateful for right now, even in this difficult moment?"
    }
  ];

  const startBreathingExercise = () => {
    setActiveExercise('breathing');
    setBreathingTimer(0);
    
    const cycle = () => {
      // 4-7-8 breathing technique
      setBreathingPhase('inhale');
      setTimeout(() => setBreathingPhase('hold'), 4000);
      setTimeout(() => setBreathingPhase('exhale'), 11000);
      setTimeout(() => setBreathingPhase('rest'), 19000);
    };
    
    cycle();
    const interval = setInterval(cycle, 20000);
    
    setTimeout(() => {
      clearInterval(interval);
      setActiveExercise(null);
      setBreathingPhase('inhale');
    }, 300000); // 5 minutes
  };

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
        <h1 className="text-xl font-bold text-gray-800">Mental Health Tools</h1>
        <div className="w-16"></div>
      </div>

      {/* Breathing Exercise */}
      <Card className="p-6 mb-6">
        <div className="flex items-center mb-4">
          <Heart className="w-5 h-5 text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Breathing Exercise</h2>
        </div>
        
        {activeExercise === 'breathing' ? (
          <div className="text-center py-8">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-1000 ${
              breathingPhase === 'inhale' ? 'bg-blue-500 scale-110' :
              breathingPhase === 'hold' ? 'bg-purple-500 scale-125' :
              breathingPhase === 'exhale' ? 'bg-green-500 scale-90' :
              'bg-gray-400 scale-100'
            }`}>
              {breathingPhase === 'inhale' ? 'In' :
               breathingPhase === 'hold' ? 'Hold' :
               breathingPhase === 'exhale' ? 'Out' :
               'Rest'}
            </div>
            <p className="text-lg text-gray-700 mb-4">
              {breathingPhase === 'inhale' ? 'Breathe in slowly through your nose' :
               breathingPhase === 'hold' ? 'Hold your breath gently' :
               breathingPhase === 'exhale' ? 'Exhale slowly through your mouth' :
               'Rest and prepare for the next breath'}
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveExercise(null)}
              className="text-purple-600"
            >
              Stop Exercise
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              The 4-7-8 breathing technique helps calm your nervous system and reduce anxiety.
            </p>
            <Button
              onClick={startBreathingExercise}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Start 5-Minute Session
            </Button>
          </div>
        )}
      </Card>

      {/* Guided Meditations */}
      <Card className="p-6 mb-6">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Guided Meditations</h2>
        </div>
        
        <div className="space-y-4">
          {meditations.map((meditation, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{meditation.title}</h3>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  {meditation.duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{meditation.description}</p>
              {activeExercise === `meditation-${index}` ? (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700 italic mb-4">{meditation.script}</p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveExercise(null)}
                    className="text-purple-600"
                  >
                    End Session
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setActiveExercise(`meditation-${index}`)}
                  className="text-purple-600 text-sm"
                >
                  Start Meditation
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* CBT Tools */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="w-5 h-5 text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">CBT Self-Help Tools</h2>
        </div>
        
        <div className="space-y-4">
          {cbtTools.map((tool, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">Reflection Prompt:</p>
                <p className="text-blue-700 text-sm mt-1">{tool.prompt}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800 text-sm">
            💡 <strong>Tip:</strong> Use these tools when you notice negative thought patterns. 
            Write down your responses in a journal for deeper self-reflection.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MentalHealthTools;
