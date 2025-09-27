import React, { useState, useEffect } from 'react';
import Step1Loading from '../components/Step1Loading';
import Step2Loading from '../components/Step2Loading';
import Step3Loading from '../components/Step3Loading';
import Login from '../components/Login';

interface LoaderProps {
  onLogin: (username: string) => void;
  skipLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ onLogin, skipLoading = false }) => {
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showStep4, setShowStep4] = useState(false);

  const startLoading = () => {
    // Step 1: Show bg black
    setShowStep1(true);

    const step1Timer = setTimeout(() => {
      // Step 2: Show loading bar
      setShowStep1(false);
      setShowStep2(true);

      const step2Timer = setTimeout(() => {
        // Step 3: Show loading blue
        setShowStep2(false);
        setShowStep3(true);

        const step3Timer = setTimeout(() => {
          // Step 4: Show connection lobby
          setShowStep3(false);
          setShowStep4(true);
        }, 2000);

        return () => clearTimeout(step3Timer);
      }, 8000);

      return () => clearTimeout(step2Timer);
    }, 2000);

    return () => clearTimeout(step1Timer);
  };

  useEffect(() => {
    if (skipLoading) {
      // Go directly to login screen
      setShowStep4(true);
    } else {
      // Show full loading sequence
      startLoading();
    }
  }, [skipLoading]);

  return (
    <>
      <div>
        {showStep1 && <Step1Loading />}
        {showStep2 && <Step2Loading />}
        {showStep3 && <Step3Loading />}
        {showStep4 && <Login onLogin={onLogin} />}
      </div>
    </>
  );
};

export default Loader;