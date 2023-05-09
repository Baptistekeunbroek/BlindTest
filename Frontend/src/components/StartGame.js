import React from "react";
import "./StartGame.css";

export function StartGame({ socket }) {
  const start = () => {
    console.log("start");
    socket.emit("putUrl");
  };

  return (
    <div className="StartGame">
      <h1 className="StartGameTitle">Bienvenue sur le Blindtest</h1>
      <button className="StartGameButton" onClick={start}>
        Commencer la partie
      </button>
    </div>
  );
}
