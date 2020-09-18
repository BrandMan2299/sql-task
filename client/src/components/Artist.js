import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';

function Artist(props) {
    const [artist, setArtist] = useState({});
    useEffect(() => {
        axios.get(`/artists/${props.match.params.id}`).then(artist => {
            setArtist(artist.data);
        })
    }, [])
    return (
        <div className="viewer">
            {artist.info ? (
                <div>
                    <div className="details">
                        <img src={artist.info.cover_img} />
                        <div><b>Artist name:</b>{artist.info.name}</div>
                        <div><b>Uploaded at:</b>{artist.info.uploaded_at}</div>
                    </div>
                    <div className="listOfSongs">
                        <ul><List listOfSongs={artist.listOfSongs} /></ul>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Artist;
