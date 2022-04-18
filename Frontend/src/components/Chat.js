import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import "../App.css";

import { TextContainer } from "./TextContainer";
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Music } from "./Music";

const ENDPOINT = "localhost:5000/"; //     'localhost:5000'    'https://blindtest-transverse.herokuapp.com/'

let socket;

export function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [verif, setVerif] = useState(true);
  const [YTURL, setYTURL] = useState("");
  const [users, setUsers] = useState("");
  const [usersBonneRep, setusersVrai] = useState([]);
  //Arrivée d'un nouveau joueur ------------------------------------
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    console.log(name, room);
    //console.log(socket)
    setName(name);
    setRoom(room);
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, []);
  //Listes des messages ------------------------------------

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]); //  "..." ca veut dire que ca garde tt les anciens messages dans le tableau et ca rajoute le nouveau a la fin
    });
  }, [messages]);

  //Detection des bonnes reponses ------------------------------------

  useEffect(() => {
    socket.on("bonneReponse", ({ user }) => {
      setusersVrai((usersBonneRep) => [...usersBonneRep, user]);
    });
  }, []);

  //Detection pour mettre la musique ------------------------------------

  useEffect(() => {
    socket.on("setUrl", (URL) => {
      setYTURL(URL);
    });

    socket.on("estParti", ({ user }) => {
      console.log("left");
      setusersVrai(usersBonneRep.filter((item) => item.name !== user.name));
    });
  });

  //Demarage du jeu dans 10 secondes ------------------------------------

  useEffect(() => {
    console.log(users.length);
    if (users.length === 1 && verif === true) {
      alert("Le jeu commence dans 10 secondes !!!");
      setVerif(false);

      setTimeout(mettreUrl, 10000);
    }
  }, [users]);

  // ------------------------------------------------ fonctions ----------------------

  function uniqueVrai() {
    return [...new Set(usersBonneRep)];
  }

  function sendMessage(event) {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  function mettreUrl() {
    socket.emit("putUrl");
  }

  function enleverUrl() {
    setYTURL("");
  }

  if (!socket) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="outerContainer">
        <div className="JeuHomePage">
          <TextContainer users={users} />
          <div className="reponseDe">
            Bonne réponse de :
            {uniqueVrai().map((name) => (
              <p key={name} className="activeItem">
                {name}
              </p>
            ))}
          </div>
          <BarreReponse YTurl={YTURL} socket={socket} />
          <Music YTurl={YTURL} socket={socket} />
        </div>
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />

          {/* <button onClick={mettreUrl}>Mettre une url</button>
          <button onClick={enleverUrl}>enlever une url</button> */}
        </div>
      </div>
    );
  }
}
