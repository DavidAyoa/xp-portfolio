import './App.css';
import { Routes, Route } from 'react-router';
import LoadingSequence from './components/Loading/LoadingSequence';
import TestView from './components/TestView/TestView';
import Office from './screens/Office';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingSequence />} />
      <Route path="/office" element={<Office />} />
      <Route path="/test-view" element={<TestView />} />
    </Routes>
  );
}

export default App;
