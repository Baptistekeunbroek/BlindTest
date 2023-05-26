import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Music } from "./Music";
import { ConnectedUsers } from "./ConnectedUsers";
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Historique } from "./HistoriqueMusiques";
import { StartGame } from "./StartGame";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

let socket = null;

export function Game() {
  const query = new URLSearchParams(window.location.search);
  const gameHeight = window.innerHeight > 600 ? "h-[93vh]" : "h-[90vh]";
  const [user, setUser] = useState({
    name: query.get("name"),
    room: query.get("room"),
  });
  const message = useRef(null);
  const [messages, setMessages] = useState([]);
  const [YtVideo, setYtVideo] = useState(null);
  const [users, setUsers] = useState(null);
  const [musicHistory, setMusicHistory] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"],
      upgrade: false,
    });

    socket.emit("join", { name: query.get("name"), room: query.get("room") }, (user) => {
      setUser(user);
    });

    socket.on("roomData", ({ users, musicHistory }) => {
      setUsers(users);
      if (musicHistory) setMusicHistory(musicHistory);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("setUrl", (URL) => setYtVideo(URL));

    return () => socket?.off("disconnect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessage(event) {
    event.preventDefault();
    if (message.current.value) socket.emit("sendMessage", message.current.value, () => (message.current.value = ""));
  }

  if (!socket && !users) return <div className="text-white">Chargement...</div>;

  return (
    <div className={`flex flex-row justify-between ${gameHeight}`}>
      <div className="flex flex-col justify-start items-center max-w-[25%]">
        <ConnectedUsers users={users} />
        <Historique liste={musicHistory} />
      </div>

      <div className="">
        {YtVideo ? (
          <>
            <BarreReponse video={YtVideo} socket={socket} />
            <Music YTurl={YtVideo?.URL} socket={socket} />
          </>
        ) : (
          <StartGame socket={socket} user={user} />
        )}
      </div>
      <div className="bg-[#242531] flex flex-col justify-end rounded-md h-full max-w-[25%]">
        <InfoBar room={user?.room} />
        <Messages messages={messages} name={user?.name} />
        <Input message={message} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
