import React from 'react';
import { Link } from 'react-router-dom';

export default function ({ listOfSongs, type, id }) {
    return (
        <ul>
            {listOfSongs.map(song => (
                <li key={song.id}><Link to={`/song/${song.id}?${type}=${id}`}>
                    <div><b>Title:</b> {song.title}</div>
                    <div><b>Length:</b> {song.length}</div>
                    {song.artist_name ? <div><b>Artist:</b> {song.artist_name}</div> : null}
                    {song.album_name ? <div><b>Album:</b> {song.album_name}</div> : null}
                </Link></li>
            ))}
        </ul>
    )
}