import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Join } from "./components/Join";
import { Chat } from "./components/Chat";

// Render a YouTube video player

function Home() {
  return (
    <div className="Presentation">
      <h1 className="Presentation">Blind-Test</h1>
      <p className="Presentation2">
        Blind-Test est un site de quiz musicaux qui se veut simple d'utilisation
        et entièrement gratuit. Vous n'avez pas besoin de vous inscrire pour
        lancer une partie. Les inscriptions permettent de choisir un pseudonyme,
        de créer des playlists privées et d'apparaître dans le classement.
      </p>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="nav_bar">
      <img
        className="logo"
        src="https://fr.seaicons.com/wp-content/uploads/2015/10/music-orange-icon.png"
        alt="logo"
      />
      <nav>
        <ul className="liens_nav">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/join"}>Join</Link>
          </li>
          <li>
            <Link to={"/"}>Playlist</Link>
          </li>
        </ul>
      </nav>
      <div className="contact">
        {" "}
        <button>Contact</button>
      </div>
    </div>
  );
}

// function Footer_() {
//   return (
//     <div className="footer">
//       <div className="footer_text">ceci est un test</div>
//     </div>
//   );
// }

function App() {
  return (
    <div className="touteLaPage">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
