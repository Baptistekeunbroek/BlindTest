import React from "react";
import './Input.css'


export function Input({ message, setMessage, sendMessage}) {
    return (
        <form>
            <input
                className="input"
                placeholder="Envoyer un message..."
                type="text"
                value={message}
                onChange={(event => setMessage(event.target.value))}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={(event) => sendMessage(event)}>Envoyer</button>
        </form>
    )
}