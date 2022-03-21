import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";
import "./BarreReponse.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
      setpresOuPas("");
      setReponse("");
    }
    if (similarite >= 0.8 && similarite < 0.9) {
      setpresOuPas("Proche de fou");
    }
    if (similarite >= 0.5 && similarite < 0.8) {
      setpresOuPas("Proche un peu");
    }
    if (similarite < 0.5) {
      setpresOuPas("Pas ca du tout mon reuf");
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

  if (YTurl === "") {
    return <div></div>;
  } else {
    return (
      <div>
        <p>Similarité : {similarite}</p>
        <p>Time : {timer}</p>
        <p>Proche : {presOuPas}</p>
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
      </div>
    );
  }
}
