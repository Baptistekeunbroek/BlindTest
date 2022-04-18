import React from "react";
import ReactPlayer from "react-player/youtube";
import Card from "@mui/material/Card";
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
        {/* <h1>Titre : {YTurl.title}</h1> */}
        <Card sx={{ maxWidth: 345 }} variant="outlined">
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=" + YTurl.URL}
            playing={true}
            width="0px"
            height="0px"
            volume={0.2}
            onReady={pret}
          />
        </Card>
      </div>
    );
  }
}
