import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from './InfoCard';
import Carusele from './Carusele'

function Home() {
    const [topSongs, setTopSongs] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);

    useEffect(() => {
        axios.get("/top_songs").then(songs => {
            setTopSongs(songs.data.map(song => {
                return {
                    link: `/song/${song.id}`,
                    key: song.id,
                    img: song.cover_img,
                    content: song.title,
                    extraInfo: [song.artist_name, song.album_name, song.length]
                }
            }));
        })
        axios.get('/top_artists').then(artists => {
            setTopArtists(artists.data.map(artist => {
                return {
                    link: `/artist/${artist.id}`,
                    key: artist.id,
                    img: artist.cover_img,
                    content: artist.name,
                    extraInfo: [artist.uploaded_at]
                }
            }));
        })
        axios.get('/top_albums').then(albums => {
            setTopAlbums(albums.data.map(album => {
                return {
                    link: `/album/${album.id}`,
                    key: album.id,
                    img: album.cover_img,
                    content: album.name,
                    extraInfo: [album.artist_name, album.uploaded_at]
                }
            }));
        })
        axios.get('/top_playlists').then(playlists => {
            setTopPlaylists(playlists.data.map(playlist => {
                return {
                    link: `/playlist/${playlist.id}`,
                    key: playlist.id,
                    img: playlist.cover_img,
                    content: playlist.name,
                    extraInfo: [playlist.uploaded_at]
                }
            }));
        })
    }, [])

    return (
        <div className="viewer">
            <Carusele Template={InfoCard} data={topSongs} count={5} step={1} id="topSongs" />
            <Carusele Template={InfoCard} data={topArtists} count={3} step={1} id="topArtists" />
            <Carusele Template={InfoCard} data={topAlbums} count={3} step={1} id="topAlbums" />
            <Carusele Template={InfoCard} data={topPlaylists} count={3} step={1} id="topPlaylists" />

        </div>
    );
}

export default Home;
