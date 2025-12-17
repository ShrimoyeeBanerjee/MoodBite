
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [stage, setStage] = useState<'initial' | 'transitioning' | 'finished'>('initial');

  useEffect(() => {
    // Start transition from red to beige shortly after mount
    const timer1 = setTimeout(() => setStage('transitioning'), 500);
    // Entire screen fade out at the end
    const timer2 = setTimeout(() => setStage('finished'), 3200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div 
      className={`absolute inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-in-out
        ${stage === 'initial' ? 'bg-maroon' : 'bg-cozy-beige'}
        ${stage === 'finished' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className={`relative flex flex-col items-center gap-10 transition-all duration-1000 delay-300 transform
        ${stage === 'initial' ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}
      `}>
        
        {/* Borderless Salad Visual */}
        <div className="relative group">
          <div className="absolute inset-0 bg-maroon/5 rounded-full blur-3xl transform scale-150 animate-pulse"></div>
          <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-full shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" 
              alt="Fresh Salad" 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[3000ms] ease-out animate-slow-zoom"
            />
          </div>
        </div>

        {/* Branding */}
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-5xl font-extrabold text-maroon tracking-tighter">
            MoodBite
          </h1>
          <p className="text-lg font-medium text-maroon/60 italic">
            A bite for every mood.
          </p>
        </div>

        {/* Minimal Progress Line - matched to beige theme */}
        <div className="w-32 h-[3px] bg-maroon/5 overflow-hidden rounded-full mt-4">
          <div className="h-full bg-maroon/40 animate-loading-bar-fast origin-left"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar-fast {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes slow-zoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.15); }
        }
        .animate-loading-bar-fast {
          animation: loading-bar-fast 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
