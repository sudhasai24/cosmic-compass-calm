
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, BookOpen, MessageCircle, Sun } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Sun, label: 'Home' },
    { path: '/daily', icon: Heart, label: 'Daily' },
    { path: '/mood', icon: Calendar, label: 'Mood' },
    { path: '/tools', icon: BookOpen, label: 'Tools' },
    { path: '/companion', icon: MessageCircle, label: 'Chat' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 h-auto ${
                isActive 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
      
      {/* Crisis Button */}
      <div className="flex justify-center mt-2">
        <Button
          onClick={() => navigate('/crisis')}
          variant="outline"
          size="sm"
          className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
        >
          🆘 Need Help Now
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
