import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import "./BarreReponse.css";
import { RingProgress } from "@mantine/core";
import "./popupAnimation.css";

export function BarreReponse({ YtVideo, socket }) {
  const reponseAttendue = YtVideo.title;
  const [reponse, setReponse] = useState(null);
  const [similarite, setSimilarite] = useState(0);
  const [timer, setTimer] = useState(30);
  const [presOuPas, setPresOuPas] = useState(null);
  const [popup, setPopup] = useState(0);

  function enterPress(event) {
    if (event.key === "Enter") {
      setSimilarite(stringSimilarity(reponseAttendue, reponse));
      setReponse(null);
    }
  }

  useEffect(() => {
    switch (true) {
      case similarite >= 0.9:
        socket.emit("goodAnswer");
        setPresOuPas("Bonne réponse, trop fort !!!");
        setPopup(1);
        setReponse(null);
        setTimer(50);
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
        break;
    }
  }, [similarite]);

  useEffect(() => {
    if (timer <= 0) {
      socket.emit("putUrl");
      socket.emit("MAJMusiques");
      setTimer(50);
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => setTimer((timer) => timer - 1), 1000);

    socket.on("timer30", () => {
      setTimer(30);
      setSimilarite(0);
    });
    return () => clearInterval(interval);
  }, []);

  if (!YtVideo) return <div></div>;
  return (
    <div className="containerBarreBig">
      <div className="presOuPas">
        <RingProgress sections={[{ value: (timer * 100) / 30, color: "red" }]} size={80} />
      </div>
      <div className="containerBarre">
        <div className="webflow-style-input">
          <input
            value={reponse || ""}
            className="inputBarre"
            placeholder="Tenter une réponse..."
            type="text"
            onKeyPress={(e) => enterPress(e)}
            onChange={(event) => setReponse(event.target.value)}
          />
        </div>
      </div>
      <p className="goodAnswer presOuPas" onAnimationEnd={() => setPopup(0)} popup={popup}>
        {presOuPas}
      </p>
    </div>
  );
}
