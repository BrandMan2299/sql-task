import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';

function Playlist(props) {
    const [playlist, setPlaylist] = useState({});
    useEffect(() => {
        axios.get(`/playlists/${props.match.params.id}`).then(playlist => {
            setPlaylist(playlist.data);
        })
    }, [])
    return (
        <div className="viewer">
            {playlist.info ? (
                <div>
                    <div className="details">
                        <img src={playlist.info.cover_img} />
                        <div><b>Playlist name:</b>{playlist.info.name}</div>
                        <div><b>Uploaded at:</b>{playlist.info.uploaded_at}</div>
                    </div>
                    <div className="listOfSongs">
                        <ul><List listOfSongs={playlist.listOfSongs} type="playlist" id={playlist.info.id} /></ul>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Playlist;
