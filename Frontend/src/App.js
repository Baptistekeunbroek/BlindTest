
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Join } from './components/Join';
import { Chat } from './components/Chat';


// Render a YouTube video player


function Home() {
  return (
    <div>
     
    </div>
  );
}

function NavigationBar(){
  return(
    <header>
        <img className ="logo" src ="https://fr.seaicons.com/wp-content/uploads/2015/10/music-orange-icon.png" alt="logo" />
        <nav>
        <ul className ="liens_nav">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/join'}>Join</Link></li>
          <li><Link to={'/'}>Playlist</Link></li>
        </ul>
        </nav>
        <a className="contact" href="#"> <button>Contact</button></a>
      </header>
  )
}


function App() {
  return (
    <div>
      
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
