import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


const ENDPOINT = 'localhost:5000';

let socket;

export function Chat () {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT)

        console.log(name, room)
        console.log(socket)
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, window.location.search])


    return (
        <div>
            <h1>Chat</h1>

        </div>
    );
}

