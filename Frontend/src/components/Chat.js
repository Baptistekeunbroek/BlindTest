import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { Music } from "./Music";
import { TextContainer } from "./TextContainer";
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
  const [usersBonneRep, setUsersVrai] = useState([]);
  const [listeMusiques, setListeMusiques] = useState([]);

  //Arrivée d'un nouveau joueur ------------------------------------
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

    socket.on("bonneReponse", ({ user }) => {
      setUsersVrai((usersBonneRep) => [...usersBonneRep, user]);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("setUrl", (URL) => {
      setUsersVrai([]);
      setYtVideo(URL);
    });

    socket.on("estParti", ({ user }) => {
      setUsersVrai(usersBonneRep.filter((item) => item.name !== user.name));
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

  useEffect(() => {
    if (users.length === uniqueVrai().length && users.length !== 0) {
      setTimeout(mettreUrl, 1000);
      setTimeout(socket.emit("MAJMusiques"), 1000);
    }
  }, [usersBonneRep]);

  function uniqueVrai() {
    return [...new Set(usersBonneRep)];
  }

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
        <TextContainer users={users} bonrep={uniqueVrai()} />
        <div className="BarreRepHisto">
          <div className="partieGauche">
            <BarreReponse YtVideo={YtVideo} socket={socket} />
            {YtVideo !== "" ? <Music YtVideo={YtVideo} socket={socket} /> : null}
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
