import React from "react";


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
    <div className="flex flex-col bg-[#242531] rounded-lg mt-2 justify-center items-center text-center ml-2">
      <h1 className="text-white font-semibold">Bienvenue sur le Blindtest</h1>
      {user?.admin ? (
        <>
          <p className="text-white mt-2 mr-2 ml-2">Mettre une playlist personnelle (copiez le lien de la playlist)</p>
          <p className="text-white mr-2 ml-2">Non obligatoire, laisser vide pour lancer avec la playlist par défaut</p>
          <input className="bg-[#242531] !ring-0 !outline-none rounded-3xl text-white w-96 h-12 shadow-md shadow-[#00FECC] mt-6 font-semibold" placeholder="https://www.youtube.com/playlist?list=jkzah..." ref={playlistRef} />
          <button className="mt-4 bg-[#FDFDFD] rounded-3xl text-center flex flex-row justify-center items-center mb-2 w-36 font-semibold" onClick={start}>
            Commencer la partie
          </button>
          {error && <p>{error}</p>}
        </>
      ) : (
        <h2 className="text-white font-semibold">En attente du début de la partie</h2>
      )}
    </div>
  );
}
