
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Phone, MessageCircle } from 'lucide-react';

const CrisisSupport: React.FC = () => {
  const navigate = useNavigate();

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
      type: "call"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text",
      type: "text"
    },
    {
      name: "National Suicide Prevention Lifeline", 
      number: "1-800-273-8255",
      description: "Alternative crisis support line",
      type: "call"
    }
  ];

  const groundingTechniques = [
    {
      title: "5-4-3-2-1 Technique",
      description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste"
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Repeat."
    },
    {
      title: "Cold Water",
      description: "Splash cold water on your face or hold ice cubes to activate your nervous system's reset"
    },
    {
      title: "Progressive Muscle Relaxation", 
      description: "Tense and release each muscle group, starting from your toes up to your head"
    }
  ];

  const handleCallCrisis = (number: string) => {
    if (number === "988") {
      window.location.href = "tel:988";
    } else if (number.includes("741741")) {
      window.location.href = "sms:741741?body=HOME";
    } else {
      window.location.href = `tel:${number}`;
    }
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
        <h1 className="text-xl font-bold text-gray-800">Crisis Support</h1>
        <div className="w-16"></div>
      </div>

      {/* Emergency Notice */}
      <Card className="p-6 mb-6 bg-red-50 border-red-200">
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-red-800 mb-2">
            You Are Not Alone
          </h2>
          <p className="text-red-700 mb-4">
            If you're having thoughts of hurting yourself or others, please reach out for help immediately.
          </p>
          <p className="text-red-600 text-sm">
            Your life has value and meaning. People care about you.
          </p>
        </div>
      </Card>

      {/* Crisis Hotlines */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Crisis Helplines - Available 24/7
        </h2>
        
        <div className="space-y-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{resource.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                </div>
                <div className="ml-4">
                  {resource.type === 'call' ? (
                    <Phone className="w-5 h-5 text-green-500" />
                  ) : (
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
              
              <Button
                onClick={() => handleCallCrisis(resource.number)}
                className={`w-full mt-3 ${
                  resource.type === 'call' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {resource.type === 'call' ? '📞 Call Now' : '💬 Text Now'}
                <span className="ml-2 font-mono">{resource.number}</span>
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Grounding Techniques */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Immediate Coping Techniques
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          When you're feeling overwhelmed, these techniques can help ground you in the present moment:
        </p>
        
        <div className="space-y-4">
          {groundingTechniques.map((technique, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">{technique.title}</h3>
              <p className="text-blue-700 text-sm">{technique.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Plan */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Create Your Safety Plan
        </h2>
        <div className="space-y-3 text-sm">
          <div className="bg-purple-50 p-3 rounded-lg">
            <strong className="text-purple-800">Warning Signs:</strong>
            <p className="text-purple-700 mt-1">Identify thoughts, feelings, or situations that might lead to crisis</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <strong className="text-green-800">Coping Strategies:</strong>
            <p className="text-green-700 mt-1">List activities that help you feel better and can be done alone</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <strong className="text-blue-800">Support Network:</strong>
            <p className="text-blue-700 mt-1">Write down family, friends, or professionals you can contact</p>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg">
            <strong className="text-amber-800">Safe Environment:</strong>
            <p className="text-amber-700 mt-1">Remove or limit access to means of self-harm</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">
            💡 <strong>Tip:</strong> Consider working with a mental health professional to create a personalized safety plan. They can help you identify your unique triggers and develop effective coping strategies.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CrisisSupport;
