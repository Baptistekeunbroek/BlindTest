import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import Timer from "@amplication/react-compound-timer";
import "./BarreReponse.css";
import "./popupAnimation.css";

export function BarreReponse({ YtVideo, socket }) {
  const reponseAttendue = YtVideo?.title;
  const [reponse, setReponse] = useState(null);
  const [presOuPas, setPresOuPas] = useState(null);
  const [popup, setPopup] = useState(0);

  const timerRef = React.useRef(null);

  function enterPress(event) {
    if (event.key === "Enter") {
      testSimilarite(stringSimilarity(reponseAttendue, reponse));
      setReponse(null);
    }
  }
  const testSimilarite = (similarite) => {
    switch (true) {
      case similarite >= 0.9:
        timerRef.current?.pause();
        socket.emit("goodAnswer");
        setPresOuPas("Bonne réponse, trop fort !!!");
        setPopup(1);
        break;
      case similarite >= 0.8 && similarite <= 0.9:
        setPresOuPas("Très proche... Recommence, tu y es presque");
        setPopup(1);
        break;
      case similarite >= 0.5 && similarite <= 0.8:
        setPresOuPas("Proche...");
        setPopup(1);
        break;
      case similarite < 0.5 && similarite !== 0:
        setPresOuPas("Pas du tout ca !!!");
        setPopup(1);
        break;
      case similarite === 0:
        setPresOuPas(null);
        break;
      default:
        setPresOuPas(null);
        break;
    }
  };

  useEffect(() => {
    socket.on("timer30", () => {
      setPresOuPas(null);
      timerRef.current?.reset();
      timerRef.current?.start();
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
          <input
            value={reponse || ""}
            className="inputBarre"
            placeholder="Tenter une réponse..."
            type="text"
            onKeyDown={(e) => enterPress(e)}
            onChange={(event) => setReponse(event.target.value)}
          />
        </div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <p className="goodAnswer presOuPas" onAnimationEnd={() => setPopup(0)} popup={popup}>
        {presOuPas}
      </p>
    </div>
  );
}
