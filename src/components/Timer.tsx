import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
}

export function Timer({ seconds, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]); 

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <TimerIcon className="w-6 h-6 text-red-500" />
      <span>{timeLeft}s</span>
    </div>
  );
}
