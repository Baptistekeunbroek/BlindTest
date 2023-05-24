import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Join } from "./components/Join";
import { Game } from "./components/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
