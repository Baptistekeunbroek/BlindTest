import React from "react";
import "./StartGame.css";

export function StartGame({ socket, user }) {
  const playlistRef = React.useRef(null);
  const [error, setError] = React.useState(null);

  const start = () => {
    socket.emit("start", { playlistId: playlistRef.current?.value || null, init: true }, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  return (
    <div className="StartGame">
      <h1 className="StartGameTitle">Bienvenue sur le Blindtest</h1>
      {user?.admin ? (
        <>
          <p className="StartGameSubtitle">Mettre une playlist personnelle (copiez le lien de la playlist)</p>
          <p className="StartGameSubtitle">Non obligatoire, laisser vide pour lancer avec la playlist par défaut</p>
          <input className="StartGameInput" placeholder="https://www.youtube.com/playlist?list=jkzah..." ref={playlistRef} />
          <button className="StartGameButton" onClick={start}>
            Commencer la partie
          </button>
          {error && <p className="StartGameError">{error}</p>}
        </>
      ) : (
        <h2 className="StartGameTitle">En attente du début de la partie</h2>
      )}
    </div>
  );
}
