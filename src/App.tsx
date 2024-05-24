import Home from './Home.tsx';
import Share from './Share.tsx';
import Profile from './Profile.tsx';
import { Routes, Route } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/me" element={<Profile />} />
      <Route path="/share/:id" element={<Share />} />
    </Routes>
  );
}

export default App;