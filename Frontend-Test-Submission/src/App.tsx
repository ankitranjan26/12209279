import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shortener from './pages/Shortener';
import RedirectHandler from './pages/RedirectHandler';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;

