import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import Timer from "@amplication/react-compound-timer";
import "./BarreReponse.css";
import "./popupAnimation.css";

export function BarreReponse({ YtVideo, socket }) {
  // this regex is used to split the title into artist and song title
  const regex = /^(.*?)\s*[-,:]\s*(.*?)\s*(\b feat\b.*)?\s*(\b ft\b.*)?\s*(\bFt\b.*)?\s*(\b Feat\b.*)?$/;
  const regexResult = YtVideo?.title?.match(regex);
  // this regex is used to remove feat, ft, etc... from the song title
  const regSong = RegExp("[:&,]\\s|Ft\\.|Feat\\.\\s", "g");

  // this regex is used to remove feat, ft, etc... from the artist
  const artist = regexResult?.[1]?.split(regSong)[0];
  const songTitle = regexResult?.[2]?.split(regSong)[0]?.replaceAll('"', "");

  // if the regex is not matching, we only have the song title, which means the splitting failed
  const remainingAnswers = regexResult
    ? {
        type: "artistAndSongTitle",
        artist: { artist, found: false },
        songTitle: { songTitle, found: false },
      }
    : {
        type: "title",
        title: { title: YtVideo?.title?.replaceAll(regSong, "")?.replaceAll('"', ""), found: false },
      };
  if (import.meta.env.DEV) console.log(artist, songTitle, YtVideo?.title);

  const [presOuPas, setPresOuPas] = useState(null);
  const [popup, setPopup] = useState(0);

  const timerRef = React.useRef(null);

  function enterPress(event) {
    if (["PAUSED", "STOPPED"].includes(timerRef.current?.getTimerState())) return;
    if (!event.target.value) return;
    if (event.key === "Enter") {
      const reponse = event.target.value?.trim();
      if (!regexResult) testSimilarite(stringSimilarity(YtVideo?.title, reponse), "title");
      else {
        testSimilarite(stringSimilarity(artist, reponse), "artist");
        testSimilarite(stringSimilarity(songTitle, reponse), "songTitle");
      }
      event.target.value = "";
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
        setPresOuPas((prev) => ({ ...prev, [type]: "Très proche... Recommence, tu y es presque" }));
        break;
      case similarite >= 0.5 && similarite <= 0.8:
        setPresOuPas((prev) => ({ ...prev, [type]: "Pas mal, mais pas assez" }));
        break;
      case similarite < 0.5 && similarite !== 0:
        setPresOuPas((prev) => ({ ...prev, [type]: "Pas du tout" }));
        break;
      case similarite === 0:
        setPresOuPas((prev) => ({ ...prev, [type]: null }));
        break;
      default:
        setPresOuPas((prev) => ({ ...prev, [type]: null }));
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
          <input className="inputBarre" placeholder="Tenter une réponse..." type="text" onKeyDown={(e) => enterPress(e)} />
        </div>
      </div>
      {remainingAnswers?.type && <div className="songType">{remainingAnswers.type === "artistAndSongTitle" ? "Artiste + Titre" : "Titre uniquement"}</div>}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <p className="goodAnswer presOuPas" onAnimationEnd={() => setPopup(0)} popup={popup}>
        {presOuPas?.title} {presOuPas?.artist} {presOuPas?.songTitle}
      </p>
    </div>
  );
}
