import { useEffect, useState } from "react";

export function Music({ YTurl, socket }) {
  const [volume, setVolume] = useState(localStorage.getItem("volume") || 20);

  useEffect(() => {
    if (!YTurl) return;
    // little hack to prevent the iframe from appearing in the browser history
    const ifr = document.getElementById("ytplayer");
    ifr.contentWindow.location.replace(
      `https://yewtu.be/embed/${YTurl}?local=true&iv_load_policy=3&autoplay=1&continue=0&listen=true&quality=medium&related_videos=false&comments=false&loop=0&volume=${volume}`,
    );
    if (import.meta.env.DEV) console.log("iframe loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [YTurl]);

  if (!YTurl) return null;

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
      <iframe className="hidden" id="ytplayer" name="youtube-player" onLoad={() => socket.emit("readyToPlay")} title="YouTube video player" allow="autoplay" />
    </div>
  );
}
