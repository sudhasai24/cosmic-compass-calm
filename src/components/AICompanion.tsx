
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AICompanion: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const compassionateResponses = [
    "I hear you, and your feelings are completely valid. It's okay to feel this way.",
    "Thank you for sharing that with me. You're being so brave by opening up.",
    "It sounds like you're going through a tough time. Remember, you don't have to face this alone.",
    "What you're experiencing is more common than you might think. You're not broken or weak.",
    "I can sense your strength, even in this difficult moment. You've made it through hard times before.",
    "Your feelings matter, and so do you. Take things one moment at a time.",
    "It's okay to not be okay. Healing isn't linear, and every small step counts.",
    "You're showing incredible courage by working on your mental health. I'm proud of you.",
    "Sometimes the best thing we can do is simply acknowledge how we're feeling. You're doing that.",
    "Remember to be gentle with yourself. You deserve the same compassion you'd show a dear friend."
  ];

  const encouragingPrompts = [
    "What's one small thing that brought you comfort today?",
    "Can you tell me about a moment when you felt proud of yourself?",
    "What would you say to a friend who was going through what you're experiencing?",
    "What's one thing you're looking forward to, even if it's small?",
    "How can you show yourself kindness today?",
    "What strengths have helped you get through difficult times before?",
    "What does self-care look like for you right now?",
    "Is there anything you'd like to celebrate about your journey, no matter how small?"
  ];

  useEffect(() => {
    // Initialize with a welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm here to listen and support you on your journey. How are you feeling today? 💙",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for crisis keywords
    if (lowerMessage.includes('hurt myself') || lowerMessage.includes('end it') || 
        lowerMessage.includes('suicide') || lowerMessage.includes('kill myself')) {
      return "I'm very concerned about you right now. Please reach out to a crisis helpline immediately. In the US, you can call 988 for the Suicide & Crisis Lifeline. You matter, and there are people who want to help. Would you like me to provide more crisis resources?";
    }
    
    // Contextual responses based on keywords
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return compassionateResponses[Math.floor(Math.random() * compassionateResponses.length)] + " " + 
             encouragingPrompts[Math.floor(Math.random() * encouragingPrompts.length)];
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('scared')) {
      return "Anxiety can feel overwhelming, but you're safe right now. Try taking a few deep breaths with me. What's one thing you can see, hear, and feel around you right now?";
    }
    
    if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      return "Your anger is valid - it's telling you something important. It's okay to feel this way. What do you think might be underneath this anger?";
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      return "Loneliness is so painful, and I want you to know that you're not truly alone. I'm here with you right now. What's one small way you could connect with someone today?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('better') || lowerMessage.includes('good')) {
      return "I'm so glad to hear that! Your progress, no matter how small, is meaningful. What do you think helped you feel this way?";
    }
    
    // Default compassionate response
    return compassionateResponses[Math.floor(Math.random() * compassionateResponses.length)] + " " +
           encouragingPrompts[Math.floor(Math.random() * encouragingPrompts.length)];
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="text-purple-600"
        >
          ← Back
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-800">AI Companion</h1>
          <p className="text-sm text-gray-600">Always here to listen 💜</p>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.isUser
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800 shadow-sm border'
            }`}>
              {!message.isUser && (
                <div className="flex items-center mb-2">
                  <Heart className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-xs text-purple-600 font-medium">AI Companion</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Response Buttons */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {['I need encouragement', 'I feel overwhelmed', 'I want to share something good'].map((quickResponse) => (
            <Button
              key={quickResponse}
              variant="outline"
              size="sm"
              onClick={() => {
                setInputText(quickResponse);
                setTimeout(sendMessage, 100);
              }}
              className="text-purple-600 border-purple-200 text-xs"
            >
              {quickResponse}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Share what's on your mind..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 pb-2">
        <p className="text-xs text-gray-500 text-center">
          This AI companion provides emotional support but is not a replacement for professional therapy.
        </p>
      </div>
    </div>
  );
};

export default AICompanion;
