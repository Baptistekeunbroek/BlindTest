
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Join } from './components/Join';
import { Chat } from './components/Chat';

// Render a YouTube video player



function App() {
  return (
    <div className="App">
      <h1>Blindtest en ligne</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
