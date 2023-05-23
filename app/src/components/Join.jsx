import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import vengaicon from "../assets/icons/vengaicon.jpeg";
import { HiArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export function Join() {
  const nameRef = useRef(null);
  const roomRef = useRef(null);
  const navigate = useNavigate();

  const join = () => {
    if (nameRef.current?.value && roomRef.current?.value) {
      navigate(
        "/game?name=" +
          nameRef.current?.value +
          "&room=" +
          roomRef.current?.value
      );
    }
  };

  return (
    <div>
      <nav className="p-3 border-gray-700 bg-[#242531]">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
          <div className="flex flex-row justify-center items-center">
            <img
              src={vengaicon}
              className="h-6 mr-3 sm:h-10 "
              alt="Venga Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VengaGAMES
            </span>
          </div>
        </div>
      </nav>
      <NavLink to="https://lejeudelaplaylist.onrender.com/" end>
        <HiArrowLeft className="text-white ml-2 mt-2 w-10 h-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ..." alt="icone fleche retour" />
      </NavLink>
      
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-[#242531] justify-center flex flex-col rounded-xl border-gray-500 items-center shadow-2xl w-3/4 md:w-1/4">
          <h1 className="mt-5 mb-2 text-white font-semibold ">Le Blind Test</h1>
          <div>
            <input placeholder="Nom de la room..." type="text" className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white w-60 h-12 shadow-md shadow-[#00FECC] font-semibold " ref={roomRef} />
          </div>
          <div>
            <input placeholder="Ton Pseudo..." className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white w-60 h-12 shadow-md shadow-[#00FECC] mt-6 font-semibold " type="text" ref={nameRef} />
          </div>
          <button onClick={join} type="submit mt-20" className="bg-[#FDFDFD] rounded-3xl text-center flex flex-row justify-center items-center mt-4 mb-2 w-24 font-semibold">
            Rejoindre
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 flex justify-center w-full bg-[#242531]">
        <h3 className="text-white">Vengaboys © - 2023</h3>
      </div>
    </div>
  );
}
