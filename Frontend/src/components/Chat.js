import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { Music } from "./Music";
import { ConnectedUsers } from "./ConnectedUsers";
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Historique } from "./HistoriqueMusiques";

const ENDPOINT = "localhost:5000/"; //     'localhost:5000'    'https://blindtestbackend.herokuapp.com/'

let socket = null;

export function Chat() {
  const query = new URLSearchParams(window.location.search);
  const user = {
    name: query.get("name"),
    room: query.get("room"),
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [verif, setVerif] = useState(true);
  const [YtVideo, setYtVideo] = useState("");
  const [users, setUsers] = useState("");
  const [listeMusiques, setListeMusiques] = useState([]);

  useEffect(() => {
    const { name, room } = user;
    socket = io(ENDPOINT, {
      transports: ["websocket"],
      upgrade: false,
    });

    socket.emit("join", { name, room }, () => {});

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("setUrl", (URL) => {
      setYtVideo(URL);
    });

    socket.on("voiciLaListe", ({ listeMusiques }) => {
      setListeMusiques(listeMusiques);
    });

    return () => socket.off("disconnect");
  }, []);

  useEffect(() => {
    if (users.length === 1 && verif === true) {
      alert("Le jeu commence dans 10 secondes !!!");
      setVerif(false);
      setTimeout(mettreUrl, 1000);
    }
  }, [users]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) socket.emit("sendMessage", message, () => setMessage(""));
  }

  function mettreUrl() {
    socket.emit("putUrl");
  }

  if (!socket) return <div>Chargement...</div>;

  return (
    <div className="outerContainer">
      <div className="JeuHomePage">
        <ConnectedUsers users={users} />
        <div className="BarreRepHisto">
          <div className="partieGauche">
            <BarreReponse YtVideo={YtVideo} socket={socket} />
            {YtVideo !== "" ? <Music YTurl={YtVideo?.URL} socket={socket} /> : null}
          </div>
          <Historique liste={listeMusiques} />
        </div>
      </div>
      <div className="container">
        <InfoBar room={user?.room} />
        <Messages messages={messages} name={user?.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
