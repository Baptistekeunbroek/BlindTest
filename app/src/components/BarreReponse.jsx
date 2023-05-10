import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import Timer from "@amplication/react-compound-timer";
import "./BarreReponse.css";
import "./popupAnimation.css";

export function BarreReponse({ YtVideo, socket }) {
  const regex = /^(.*?)\s*[-,:]\s*(.*?)\s*(\b feat\b.*)?\s*(\b ft\b.*)?\s*(\bFt\b.*)?\s*(\b Feat\b.*)?$/;
  const regexResult = YtVideo?.title?.match(regex);
  const regSong = RegExp("[:'&,]\\s|Ft\\.|Feat\\.\\s", "g");

  const artist = regexResult?.[1]?.split(", ")[0];
  const songTitle = regexResult?.[2]?.replaceAll("'", "");

  const remainingAnswers = regexResult
    ? {
        type: "artistAndSongTitle",
        artist: { artist, found: false },
        songTitle: { songTitle, found: false },
      }
    : {
        type: "title",
        title: { title: YtVideo?.title?.replaceAll(regSong, ""), found: false },
      };

  console.log(artist, songTitle, regexResult, YtVideo?.title, remainingAnswers);

  const [reponse, setReponse] = useState(null);
  const [presOuPas, setPresOuPas] = useState(null);
  const [popup, setPopup] = useState(0);

  const timerRef = React.useRef(null);

  function enterPress(event) {
    if (event.key === "Enter") {
      if (!regexResult) testSimilarite(stringSimilarity(YtVideo?.title, reponse), "title");
      else {
        testSimilarite(stringSimilarity(artist, reponse), "artist");
        testSimilarite(stringSimilarity(songTitle, reponse), "songTitle");
      }
      setReponse(null);
    }
  }
  const testSimilarite = (similarite, type) => {
    setPopup(1);
    switch (true) {
      case similarite >= 0.9:
        if (remainingAnswers[type].found === true) return setPresOuPas((prev) => ({ ...prev, [type]: "Déjà trouvé !!!" }));
        remainingAnswers[type].found = true;
        socket.emit("goodAnswer", remainingAnswers);
        setPresOuPas((prev) =>
          type === "title"
            ? { ...prev, title: "Bonne réponse, trop fort !!!" }
            : type === "artist"
            ? { ...prev, title: "Artiste trouvé, bien joué !!!" }
            : type === "songTitle"
            ? { ...prev, title: "Bonne chanson, bien joué !!!" }
            : null
        );
        break;
      case similarite >= 0.8 && similarite <= 0.9:
        setPresOuPas("Très proche... Recommence, tu y es presque");
        break;
      case similarite >= 0.5 && similarite <= 0.8:
        setPresOuPas("Proche...");
        break;
      case similarite < 0.5 && similarite !== 0:
        setPresOuPas("Pas du tout ca !!!");
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
        {presOuPas?.title} {presOuPas?.artist} {presOuPas?.songTitle}
      </p>
    </div>
  );
}
