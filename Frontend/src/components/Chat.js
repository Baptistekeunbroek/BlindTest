import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css'
import '../App.css';


import { TextContainer } from './TextContainer';
import { BarreReponse } from "./BarreReponse";
import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";
import { Music } from "./Music";

const ENDPOINT = 'localhost:5000/' //     'localhost:5000'    'https://blindtest-transverse.herokuapp.com/'

let socket;

export function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [YTURL, setYTURL] = useState('');
    const [users, setUsers] = useState('');
    const [usersVrai, setusersVrai] = useState([]);



    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT)

        console.log(name, room)
        //console.log(socket)
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])   //  ... ca veut dire que ca garde tt les anciens messages dans le tableau et ca rajoute le nouveau a la fin
        })


        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages])

    useEffect(() => {
        socket.on('bonneReponse', ({ user }) => {

            setusersVrai(usersVrai => [...usersVrai, user.name])
        })
    }, [])

    useEffect(() => {
        socket.on('setUrl', (URL) => {
            setYTURL(URL)
        })
    }, [])

    function sendMessage(event) {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));

        }
    }




    function mettreUrl() {
        socket.emit('putUrl')

    }

    function enleverUrl() {
        setYTURL('')
    }

    console.log(message, messages, YTURL, usersVrai);
    if (!socket) {
        return (
            <div>
                Chargement...
            </div>
        )
    }
    else {
        return (

            <div className="outerContainer">
                <div className="JeuHomePage">
                    <div>Bonne réponse de : {usersVrai.map((name) => (
                        <p key={name} className="activeItem">
                            {name}
                        </p>))}
                    </div>
                    <TextContainer users={users} />
                    <BarreReponse YTurl={YTURL} socket={socket} />
                    <Music YTurl={YTURL} socket={socket} />
                </div>
                <div className="container">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

                    <button onClick={mettreUrl}>Mettre une url</button>
                    <button onClick={enleverUrl}>enlever une url</button>
                </div>


            </div>
        );
    }
}