import React, { useState, useEffect } from 'react';
import useConnection from '../hooks/useConnection';
// import MetaUpdater from '../MetaUpdater';
import Step1Loading from '../components/Loading/Step1Loading';
import Step2Loading from '../components/Loading/Step2Loading';
import Step3Loading from '../components/Loading/Step3Loading';
import Login from '../components/Loading/Login';

const Loader: React.FC = () => {
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showStep4, setShowStep4] = useState(false);
  const { status } = useConnection();

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
    if (status === 'restart') {
      startLoading();
    } else {
      setShowStep4(true);
    }
  }, [status]);

  return (
    <>
      {/* <MetaUpdater /> */}
      <div>
        {showStep1 && <Step1Loading />}
        {showStep2 && <Step2Loading />}
        {showStep3 && <Step3Loading />}
        {showStep4 && <Login />}
      </div>
    </>
  );
};

export default Loader;
