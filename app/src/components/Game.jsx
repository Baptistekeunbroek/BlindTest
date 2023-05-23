import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Music } from "./Music";
import { ConnectedUsers } from "./ConnectedUsers";
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Historique } from "./HistoriqueMusiques";
import { StartGame } from "./StartGame";
import vengaicon from "../assets/icons/vengaicon.jpeg";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

let socket = null;

export function Game() {
  const query = new URLSearchParams(window.location.search);
  const [user, setUser] = useState({ name: query.get("name"), room: query.get("room") });
  const [message, setMessage] = useState(null);
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

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessage(event) {
    event.preventDefault();
    if (message) socket.emit("sendMessage", message, () => setMessage(null));
  }

  if (!socket && !users) return <div className="text-white">Chargement...</div>;

  return (
    <div>
       <nav className="p-3 border-gray-700 bg-[#242531]">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
          <div className="flex flex-row justify-center items-center">
            <img
              src={vengaicon}
              className="h-6 mr-3 sm:h-10 "
              alt="Venga Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              VengaGAMES
            </span>
          </div>
        </div>
      </nav>
    <div className="flex flex-row justify-center h-max align-baseline">
      <div className="flex flex-row">
        <ConnectedUsers users={users} />
        <div>
          <div>
            {YtVideo ? (
              <>
                <BarreReponse YtVideo={YtVideo} socket={socket} />
                <Music YTurl={YtVideo?.URL} socket={socket} />
              </>
            ) : (
              <StartGame socket={socket} user={user} />
            )}
          </div>
          <Historique liste={musicHistory} />
        </div>
      </div>
      <div className="bg-[#242531] flex flex-col justify-end rounded-md h-max mt-2 ml-10">

        <InfoBar room={user?.room} />
        <Messages messages={messages} name={user?.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    <div className="fixed bottom-0 flex justify-center w-full bg-[#242531]">
        <h3 className="text-white">Vengaboys © - 2023</h3>
      </div>
    </div>
  );
}
