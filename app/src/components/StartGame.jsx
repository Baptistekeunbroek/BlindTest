import React from "react";
import "./StartGame.css";

export function StartGame({ socket, user }) {
  const playlistRef = React.useRef(null);

  const start = () => {
    socket.emit("putUrl", playlistRef.current?.value);
  };

  return (
    <div className="StartGame">
      <h1 className="StartGameTitle">Bienvenue sur le Blindtest</h1>
      {user?.admin ? (
        <>
          <p className="StartGameSubtitle">Mettre une playlist personnelle (mettre uniquement l'id de la playlist youtube)</p>
          <p className="StartGameSubtitle">Max 100 musiques, la réponse est le titre de la vidéo</p>
          <p className="StartGameSubtitle">Non obligatoire, laisser vide pour lancer avec la playlist par défaut</p>
          <input className="StartGameInput" placeholder="PLy6N_9yB8Qwy6LL0J7zLUy..." ref={playlistRef} />
          <button className="StartGameButton" onClick={start}>
            Commencer la partie
          </button>
        </>
      ) : (
        <h2 className="StartGameTitle">En attente du début de la partie</h2>
      )}
    </div>
  );
}
