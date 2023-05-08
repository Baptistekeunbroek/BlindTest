import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Join } from "./components/Join";
import { Chat } from "./components/Chat";

import { Contact } from "./components/Contact";

// Render a YouTube video player

function Home() {
  return (
    <div className="Presentation">
      <h1 className="PresentationTitre">Blind-Test projet Transverse</h1>
      <p className="PresentationPave">
        Nous avons élaboré plusieurs pistes. Celle qui revenait était celle d’organiser un jeu multijoueur pour favoriser l’échange. Pour faciliter son accès, nous avons décidé de
        le développer sous la forme d’une page web. De plus, le jeu devait être rapide et facile d’utilisation c’est pourquoi nous avons fait le choix d’implémenter un jeu de blind
        test en ligne. Ce dernier rassemblant toutes les qualités citées ci-dessus.
      </p>
      <p className="PresentationPave mt">
        Blind-Test est un site de quiz musicaux qui se veut simple d'utilisation et entièrement gratuit. Vous n'avez pas besoin de vous inscrire pour lancer une partie. Les
        inscriptions permettent de choisir un pseudonyme, de créer des playlists privées et d'apparaître dans le classement.
      </p>
      <p className="PresentationPave mt">
        La France, comme tout autre pays, n’a pas été épargnée au cours des dernières par la crise sanitaire. Les plus vieux et les plus faibles en première ligne ont été les
        premières victimes de cette pandémie. Malgré les mesures sanitaires prises en charge, le gouvernement a décidé par la suite d’instaurer des confinements et couvre-feu. A
        partir de là, ce sont les jeunes qui en ont le plus été affectés. Non pas par la maladie mais bien par l’isolement que cette mesure obligeait.
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
        color="white">
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
        <Link to={"/contact"}>
          <button className="btn-75">Contact</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="touteLaPage">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
