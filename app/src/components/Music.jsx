import { useEffect, useState, createElement } from "react";

export function Music({ YTurl, socket }) {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 20);
  const [IframeComponent, setIframeComponent] = useState(null);

  useEffect(() => {
    if (!YTurl) return;
    // hack change iframe src without adding history entry
    setIframeComponent(
      // eslint-disable-next-line react/display-name
      () => () =>
        createElement(
          "iframe",
          {
            src: `https://yewtu.be/embed/${YTurl}?local=true&iv_load_policy=3&autoplay=1&continue=0&listen=true&quality=medium&related_videos=false&comments=false&loop=0&volume=${volume}`,
            className: "hidden",
            id: "ytplayer",
            name: "youtube-player",
            onLoad: () => socket.emit("readyToPlay"),
            title: "YouTube video player",
            allow: "autoplay",
          },
          null,
        ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [YTurl]);

  if (!YTurl) return null;
  if (!IframeComponent) return null;

  return (
    <div className="flex flex-col items-center">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={volume}
        onMouseUp={(e) => {
          setVolume(parseInt(e.target.value));
          localStorage.setItem("volume", e.target.value);
        }}
        className="w-56 mt-10"
      />
      <div className="text-white text-xs">Le changement de volume est pris en compte au prochain titre</div>
      <IframeComponent />
    </div>
  );
}
