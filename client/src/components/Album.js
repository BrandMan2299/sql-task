import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';

function Album(props) {
    const [album, setAlbum] = useState({});
    useEffect(() => {
        axios.get(`/albums/${props.match.params.id}`).then(album => {
            setAlbum(album.data);
        })
    }, [props.match.params.id])
    return (
        <div className="viewer">
            {album.info ? (
                <div>
                    <div className="details">
                        <img src={album.info.cover_img} alt="AlbumImg" />
                        <div><b>Album name:</b>{album.info.name}</div>
                        <div><b>Uploaded at:</b>{album.info.uploaded_at}</div>
                    </div>
                    <div className="listOfSongs">
                        <List listOfSongs={album.listOfSongs} type="album" id={album.info.id} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Album;
