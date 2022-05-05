import React from "react";
import ReactPlayer from "react-player/youtube";
import "./Music.css";

export function Music({ YTurl, socket }) {
  function pret() {
    console.log("pret");
    socket.emit("pretLancer");
  }
  console.log(YTurl);
  if (YTurl === "") {
    return <div></div>;
  } else {
    return (
      <div className="Music">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=" + YTurl.URL}
          playing={true}
          width="0px"
          height="0px"
          volume={0.2}
          onReady={pret}
          controls={false}
        />
      </div>
    );
  }
}
