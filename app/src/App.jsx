import { Route, Routes, useNavigate } from "react-router-dom";
import { Join } from "./components/Join";
import { Game } from "./components/Game";
import vengaicon from "./assets/icons/vengaicon.jpeg";

function App() {
  const bannerHeight = window.innerHeight > 600 ? "h-[7vh]" : "h-[10vh]";
  const navigate = useNavigate();
  return (
    <>
      <div className={`flex flex-row justify-center items-center py-3 cursor-pointer bg-[#242531] ${bannerHeight}`} onClick={() => navigate("/")}>
        <img src={vengaicon} className="h-6 mr-3 sm:h-10 " alt="Venga Logo" />
        <span className="text-xl font-semibold text-white">VengaGAMES</span>
      </div>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
