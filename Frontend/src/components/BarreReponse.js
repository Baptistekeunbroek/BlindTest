import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import "./BarreReponse.css";
import { RingProgress } from "@mantine/core";
import "./popupAnimation.css";

export function BarreReponse({ YTurl, socket }) {
  //console.log(YTurl)
  const reponseAttendue = YTurl.title;
  const [reponse, setReponse] = useState("");
  const [similarite, setSimilarite] = useState(0);
  const [timer, setTimer] = useState(30);
  const [presOuPas, setpresOuPas] = useState("");

  function testSimilarite() {
    return stringSimilarity(reponseAttendue, reponse);
  }

  function enterPress(event) {
    console.log(similarite);

    if (event.key === "Enter") {
      setSimilarite(testSimilarite());
      event.currentTarget.value = "";
    }
  }

  useEffect(() => {
    if (similarite >= 0.9) {
      console.log("emit");
      socket.emit("similaire90");
      setpresOuPas("Bonne réponse, trop fort");
      setPopup(1);
      setReponse("");
    }
    if (similarite >= 0.8 && similarite < 0.9) {
      setpresOuPas("Proche de fou");
      setPopup(1);
    }
    if (similarite >= 0.5 && similarite < 0.8) {
      setpresOuPas("Proche un peu");
      setPopup(1);
    }
    if (similarite < 0.5) {
      setpresOuPas("Pas ca du tout mon reuf");
      setPopup(1);
    }
    if (similarite === 0) {
      setpresOuPas("");
    }
  }, [similarite]);

  useEffect(() => {
    const test = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(test);
  });

  if (timer === 0) {
    console.log("ZERO");
    setTimer(30);
  }

  useEffect(() => {
    socket.on("timer30", () => {
      console.log("Mis a 30");
      setTimer(30);
    });
  }, [socket]);

  const [popup, setPopup] = useState(0);

  if (YTurl === "") {
    return <div></div>;
  } else {
    return (
      <div class="containerBarreBig">
        <div class="presOuPas">
          <RingProgress
            sections={[{ value: (timer * 100) / 30, color: "red" }]}
            size={80}
          />
        </div>
        <div class="containerBarre">
          <div class="webflow-style-input">
            <input
              className="inputBarre"
              placeholder="Tenter une réponse..."
              type="text"
              onKeyPress={(e) => enterPress(e)}
              onChange={(event) => setReponse(event.target.value)}
            />
          </div>
        </div>
        <p
          class="bonneReponse presOuPas"
          onAnimationEnd={() => setPopup(0)}
          popup={popup}
        >
          {presOuPas}
        </p>
      </div>
    );
  }
}
