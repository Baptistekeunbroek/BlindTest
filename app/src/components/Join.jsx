import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

export function Join() {
  const nameRef = useRef(null);
  const roomRef = useRef(null);
  const navigate = useNavigate();

  const join = () => {
    if (nameRef.current?.value && roomRef.current?.value) {
      navigate("/game?name=" + nameRef.current?.value + "&room=" + roomRef.current?.value);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Rejoindre une salle</h1>
        <div>
          <input placeholder="Nom" className="joinInput" type="text" ref={nameRef} />
        </div>
        <div>
          <input placeholder="Salle" className="joinInput mt-20" type="text" ref={roomRef} />
        </div>
        <button onClick={join} type="submit mt-20" className={"button mt-20"}>
          Se connecter
        </button>
      </div>
    </div>
  );
}
