import { useEffect, useState } from 'react';

interface CountdownProps {
    callback: () => void;
}

const useCountdown = ({callback}: CountdownProps) => {
  const initialMinutes = 1;
  const [countdown, setCountdown] = useState<[number, number]>([initialMinutes, 0]);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prevTimer) => {
          const [minutes, seconds] = prevTimer;
            if (minutes === 0 && seconds === 0) {
            callback();
            setIsRunning(false);
            return [initialMinutes, 0];
          } else if (seconds === 0) {
            return [minutes - 1, 59];
          } else {
            return [minutes, seconds - 1];
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [callback, initialMinutes, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      setCountdown([initialMinutes, 0]);
      setIsRunning(true);
    }
  }, [isRunning, initialMinutes]);

  return { countdown };
};

export { useCountdown };
