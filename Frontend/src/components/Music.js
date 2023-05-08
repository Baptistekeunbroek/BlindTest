import React from "react";
import "./Music.css";

export function Music({ YTurl, socket }) {
  const iframeRef = React.useRef(null);

  function pret() {
    socket.emit("readyToPlay");
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
    }, 2000);
  }

  if (!YTurl) return <div></div>;

  return (
    <div className="usic">
      <iframe
        onLoad={pret}
        ref={iframeRef}
        className="iframe"
        src={"https://yewtu.be/embed/" + YTurl.URL}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
