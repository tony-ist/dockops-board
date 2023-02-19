import './App.css';
import ContainerList from './container-list/ContainerList';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import TestComp from './test-comp/TestComp';

const App = () => (
  <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/test">test</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<ContainerList />} />
        <Route path="/test" element={<TestComp />} />
      </Routes>
    </div>
  </Router>
);

export default App;
