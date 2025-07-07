import { useState, useEffect } from 'react';
import Step1Loading from './Step1Loading';
import Step2Loading from './Step2Loading';
import Step3Loading from './Step3Loading';
import Login from './Login';
import useConnection from '../../hooks/useConnection';

const LoadingSequence = () => {
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showStep4, setShowStep4] = useState(false);
  const { status } = useConnection();

  const startLoading = () => {
    // Step 1: Show bg black
    setShowStep1(true);
    
    setTimeout(() => {
      // Step 2: Show loading bar
      setShowStep1(false);
      setShowStep2(true);
      
      setTimeout(() => {
        // Step 3: Show loading blue
        setShowStep2(false);
        setShowStep3(true);
        
        setTimeout(() => {
          // Step 4: Show connection lobby
          setShowStep3(false);
          setShowStep4(true);
        }, 2000);
      }, 8000);
    }, 2000);
  };

  useEffect(() => {
    if (status === 'restart') {
      startLoading();
    } else {
      setShowStep4(true);
    }
  }, [status]);

  return (
    <>
      {showStep1 && <Step1Loading />}
      {showStep2 && <Step2Loading />}
      {showStep3 && <Step3Loading />}
      {showStep4 && <Login />}
    </>
  );
};

export default LoadingSequence;
