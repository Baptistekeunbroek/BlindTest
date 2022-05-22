import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Join } from "./components/Join";
import { Chat } from "./components/Chat";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import bk from './bk.jpeg';

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
        <button className="btn-75"><Link to={"/contact"}>Contact</Link></button>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <Card sx={{display : 'flex', flexDirection:'row'}}>
      <Box sx={{display:'flex', flexDirection:'column', border:'2px black'}}>
      <CardMedia
        component="img"
        image={bk}
        sx={{
          height: 300,
          width: 350,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Baptiste Keunebroek
        </Typography>
        <Typography variant="body2" color="text.secondary">
          baptiste.keunebroek@efrei.net
        </Typography>
      </CardContent>
      </Box>

      <Box sx={{display:'flex', flexDirection:'column', border:'2px black'}}>
      <CardMedia
        component="img"
        src="https://i1.sndcdn.com/avatars-O4Zf03w0rsVlYevf-E9twPw-t500x500.jpg"
        sx={{
          height: 300,
          width: 350,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Malo Le Corvec
        </Typography>
        <Typography variant="body2" color="text.secondary">
          adresse test info
        </Typography>
      </CardContent>
      </Box>

      <Box sx={{display:'flex', flexDirection:'column', border:'2px black'}}>
      <CardMedia
        component="img"
        src="https://i1.sndcdn.com/avatars-O4Zf03w0rsVlYevf-E9twPw-t500x500.jpg"
        sx={{
          height: 300,
          width: 350,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Malo Le Corvec
        </Typography>
        <Typography variant="body2" color="text.secondary">
          adresse test info
        </Typography>
      </CardContent>
      </Box>
      
    </Card>


  )
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
