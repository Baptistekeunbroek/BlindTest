export function Music({ YTurl, socket }) {
  function pret() {
    socket.emit("readyToPlay");
  }

  if (!YTurl) return null;

  return (
    <div className="flex flex-col justify-center items-center opacity-0">
      <iframe
        onLoad={pret}
        className="iframe"
        src={`https://yewtu.be/embed/${YTurl}?local=true&iv_load_policy=3&autoplay=1&continue=0&listen=true&quality=medium&related_videos=false&comments=false&loop=0&volume=20&controls=0`}
        title="YouTube video player"
        allow="autoplay"
      />
    </div>
  );
}
