import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Game.css";
import { Music } from "./Music";
import { ConnectedUsers } from "./ConnectedUsers";
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Historique } from "./HistoriqueMusiques";
import { StartGame } from "./StartGame";

const ENDPOINT = "localhost:5000/"; //     'localhost:5000'    'https://blindtestbackend.herokuapp.com/'

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

  if (!socket && !users) return <div>Chargement...</div>;

  return (
    <div className="outerContainer">
      <div className="JeuHomePage">
        <ConnectedUsers users={users} />
        <div className="BarreRepHisto">
          <div className="partieGauche">
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
      <div className="rightContainer">
        <InfoBar room={user?.room} />
        <Messages messages={messages} name={user?.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
