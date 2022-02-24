import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import { InfoBar } from "./InfoBar";
import { Input } from "./Input";
import { Messages } from "./Messages";

const ENDPOINT = 'https://blindtest-transverse.herokuapp.com/';

let socket;

export function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT)

        console.log(name, room)
        console.log(socket)
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, window.location.search])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])   //  ... ca veut dire que ca garde tt les anciens messages dans le tableau et ca rajoute le nouveau a la fin

        })
    }, [messages])

    function sendMessage(event) {
        event.preventDefault();
        
        if (message) {
            socket.emit('sendMessage', message, () =>setMessage(''));

        }
    }

    console.log(message,messages);

    return (
        <div className="chatBox">
            <h1>Chat</h1>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

        </div>
    );
}

