import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootPage from '../pages/root/RootPage';

export const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<RootPage />} />
      </Routes>
    </div>
  </Router>
);
