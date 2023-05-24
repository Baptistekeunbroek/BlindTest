import React, { useState, useEffect } from "react";
import Timer from "@amplication/react-compound-timer";
import "./BarreReponse.css";
import "./popupAnimation.css";

export function BarreReponse({ video, socket }) {
  // in dev mode, log the artist and song title
  if (import.meta.env.DEV) {
    console.log("video: ", video);
  }

  const [presOuPas, setPresOuPas] = useState(null);
  const [popup, setPopup] = useState(0);

  const timerRef = React.useRef(null);

  function enterPress(event) {
    if (["PAUSED", "STOPPED"].includes(timerRef.current?.getTimerState())) return;
    if (!event.target.value) return;
    if (event.key === "Enter") {
      socket.emit("guessAnswer", event.target.value?.trim());
      event.target.value = "";
    }
  }

  useEffect(() => {
    socket.on("timer30", () => {
      setPresOuPas(null);
      timerRef.current?.reset();
      timerRef.current?.start();
    });
    socket.on("goodAnswer", ({ message }) => {
      setPresOuPas(message || "");
      setPopup(1);
    });
  }, []);

  return (
    <div className="containerBarreBig">
      <div className="timer">
        <Timer ref={timerRef} startImmediately={false} direction="backward" initialTime={30000} checkpoints={[{ time: 0, callback: () => socket.emit("putUrl") }]}>
          {() => (
            <div>
              <div className="time-remaining-container">
                <div className="time-bar" style={{ width: `${(timerRef.current?.getTime() / 30000) * 100}%` }} />
                <div className="time-text" />
              </div>
            </div>
          )}
        </Timer>
      </div>
      <div className="containerBarre">
        <div className="webflow-style-input">
          <input className="inputBarre" placeholder="Tenter une réponse..." type="text" onKeyDown={(e) => enterPress(e)} />
        </div>
      </div>
      {video?.type && <div className="songType">{video.type === "artistAndSong" ? "Artiste + Titre" : "Titre uniquement"}</div>}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <p className="goodAnswer presOuPas" onAnimationEnd={() => setPopup(0)} popup={popup}>
        {presOuPas}
      </p>
    </div>
  );
}
