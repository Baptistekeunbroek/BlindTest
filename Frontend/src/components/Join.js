import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='JoinForm'>
            <h1 className='title'>Join</h1>
            <div><input placeholder='Name' className='joinInput' type='text' onChange={(event) => { setName(event.target.value) }} /></div>
            <div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={(event) => { setRoom(event.target.value) }} /></div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'/chat?name=' + name + '&room=' + room}>
                <button type='submit mt-20' className='button'>Sign In</button>
            </Link>
        </div>
    );
}
