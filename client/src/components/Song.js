import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';

function Song(props) {
    const [song, setSong] = useState({});
    const [origin, setOrigin] = useState({});
    useEffect(() => {
        axios.get(`/songs/${props.match.params.id}`).then(song => {
            setSong(song.data);
        })
        const query = props.location.search.slice(1).split('=');
        axios.get(`/${query[0]}s/${query[1]}`).then(origin => {
            setOrigin(origin.data);
        })
    }, [])
    return (
        <div className="viewer">
            <h1>Hello</h1>
            {song.info ? (
                <div>
                    {`name, artist_name,album,youtube_iframe,length,lyrics`}
                </div>
            ) : null}
        </div>
    );
}

export default Song;
