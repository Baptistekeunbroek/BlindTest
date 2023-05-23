import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Join } from "./components/Join";
import { Game } from "./components/Game";


// Render a YouTube video player


function App() {
  return (
    <div className="touteLaPage">
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/join" element={<Join />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
