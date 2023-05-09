import React from "react";
import "./Music.css";

export function Music({ YTurl, socket }) {
  function pret() {
    socket.emit("readyToPlay");
  }

  if (!YTurl) return <div></div>;

  return (
    <div className="Music">
      <iframe
        onLoad={pret}
        onError={() => socket.emit("putUrl")}
        className="iframe"
        src={`https://yewtu.be/embed/${YTurl}?iv_load_policy=3&autoplay=1&continue=0&listen=true&quality=medium&comments=false&loop=0&volume=20&controls=0`}
        title="YouTube video player"
      />
    </div>
  );
}
