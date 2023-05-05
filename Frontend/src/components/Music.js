import React from "react";
import ReactPlayer from "react-player/youtube";
import "./Music.css";

export function Music({ YTurl, socket }) {
  const [pretLancer, setPretLancer] = React.useState(false);
  function pret() {
    socket.emit("pretLancer");
    setPretLancer(true);
  }

  if (!YTurl) return <div></div>;

  return (
    <div className="usic">
      <ReactPlayer url={"https://www.youtube.com/watch?v=" + YTurl.URL} playing={pretLancer} volume={0} onReady={pret} />
    </div>
  );
}
