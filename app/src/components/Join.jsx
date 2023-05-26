import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export function Join() {
  const nameRef = useRef(null);
  const roomRef = useRef(null);
  const navigate = useNavigate();

  const join = () => {
    if (!nameRef.current?.value || !roomRef.current?.value) return;
    navigate("/game?name=" + nameRef.current?.value + "&room=" + roomRef.current?.value);
  };

  return (
    <div>
      <NavLink to="https://lejeudelaplaylist.onrender.com/" className="absolute" end>
        <HiArrowLeft className="text-white ml-2 mt-2 w-10 h-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" alt="icone fleche retour" />
      </NavLink>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="justify-center flex flex-col gap-4 items-center">
          <h1 className="text-lg my-10 text-white font-semibold ">Le Blind-Test</h1>
          <input
            placeholder="Nom de la room"
            type="text"
            className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white shadow-md shadow-[rgba(0, 0, 0, 0.25)] p-6 py-3 font-semibold "
            ref={roomRef}
          />
          <input
            placeholder="Ton Pseudo"
            className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white shadow-md shadow-[rgba(0, 0, 0, 0.25)] p-6 py-3 font-semibold "
            type="text"
            ref={nameRef}
          />
          <button onClick={join} type="submit" className="bg-[#FDFDFD] rounded-3xl text-center flex flex-row justify-center items-center mt-4 p-2 font-semibold">
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
