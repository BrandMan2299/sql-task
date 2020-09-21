import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import { Link } from 'react-router-dom';

function Song(props) {
    const [song, setSong] = useState({});
    const [origin, setOrigin] = useState({});

    const query = props.location.search.slice(1).split('=');

    useEffect(() => {
        axios.get(`/songs/${props.match.params.id}`).then(song => {
            setSong(song.data);
        })
        axios.get(`/${query[0]}s/${query[1]}`).then(origin => {
            setOrigin(origin.data);
        })
    }, [props.match.params.id])
    return (
        <div className="viewer">
            {song.title ? (
                <div>
                    <div><b>Title:</b>{song.title}</div>
                    <div><Link to={`/artist/${song.artist_id}`}><b>Artist:</b>{song.artist_name}</Link></div>
                    <Link to={`/album/${song.album_id}`}><b>Album:</b>{song.album_name}</Link>
                    <iframe width="560" height="315" src={song.youtube_link} frameBorder="0" allowFullScreen title="bob"></iframe>
                    <div><b>Length:</b>{song.length}</div>
                    <div><b>Lyrics:</b>{song.lyrics}</div>
                </div>
            ) : null}
            {origin.listOfSongs ? (
                <List listOfSongs={origin.listOfSongs} type={query[0]} id={query[1]} />
            ) : null}
        </div>
    );
}

export default Song;
