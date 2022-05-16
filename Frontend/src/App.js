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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-brand-tiktok"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5"></path>
      </svg>
      <nav>
        <ul className="liens_nav">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/join"}>Join</Link>
          </li>
        </ul>
      </nav>
      <div className="contact">
        {" "}
        <button className="btn-75">Contact</button>
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
