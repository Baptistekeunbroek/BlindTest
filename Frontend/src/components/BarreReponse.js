import React, { useState, useEffect } from "react";
import { stringSimilarity } from "string-similarity-js";

export function BarreReponse({ YTurl, socket }) {
  //console.log(YTurl)
  const reponseAttendue = YTurl.title;
  const [reponse, setReponse] = useState("");
  const [similarite, setSimilarite] = useState(0);
  const [timer, setTimer] = useState(30);

  function testSimilarite() {
    return stringSimilarity(reponseAttendue, reponse);
  }

  function enterPress(event) {
    console.log(similarite);

    if (event.key === "Enter") {
      setSimilarite(testSimilarite());
    }
  }

  useEffect(() => {
    if (similarite >= 0.9) {
      console.log("emit");
      socket.emit("similaire90");
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
        <input
          className="inputJeu"
          placeholder="Tenter une réponse..."
          type="text"
          onKeyPress={(e) => enterPress(e)}
          onChange={(event) => setReponse(event.target.value)}
        />

        <p>Similarité : {similarite}</p>
        <p>Time : {timer}</p>
      </div>
    );
  }
}
