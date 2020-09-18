import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from './InfoCard';
import Carusele from './Carusele'

function Home() {
    return (<><h1>bob</h1></>)
    // const [topSongs, setTopSongs] = useState([]);
    // const [topArtists, setTopArtists] = useState([]);
    // const [topAlbums, setTopAlbums] = useState([]);
    // const [topPlaylists, setTopPlaylists] = useState([]);

    // useEffect(() => {
    //     axios.get("/top_songs").then(songs => {
    //         setTopSongs(songs.data);
    //     })
    //     axios.get('/top_artists').then(artists => {
    //         setTopArtists(artists.data);
    //     })
    //     axios.get('/top_albums').then(albums => {
    //         setTopAlbums(albums.data);
    //     })
    //     axios.get('/top_playlists').then(playlists => {
    //         setTopPlaylists(playlists.data);
    //     })
    // }, [])

    // return (
    //     <div className="viewer">
    //         <Carusele Template={InfoCard} data={topSongs.map(song => {
    //             return {
    //                 link: `/song/${song.id}`,
    //                 key: song.id,
    //                 img: song.cover_img,
    //                 content: song.title,
    //                 extraInfo: [song.artist_name, song.album_name, song.length]
    //             }
    //         })} count={5} step={1} />
    //         <div className="rail">
    //             {topSongs.map(song => (
    //                 <InfoCard
    //                     link={`/song/${song.id}`}
    //                     key={song.id}
    //                     img={song.cover_img}
    //                     content={song.title}
    //                     extraInfo={[song.artist_name, song.album_name, song.length]}
    //                 />
    //             ))}
    //         </div>
    //         <div className="rail">
    //             {topArtists.map(artist => (
    //                 <InfoCard
    //                     link={`/artist/${artist.id}`}
    //                     key={artist.id}
    //                     img={artist.cover_img}
    //                     content={artist.name}
    //                     extraInfo={[artist.uploaded_at]}
    //                 />
    //             ))}
    //         </div>
    //         <div className="rail">
    //             {topAlbums.map(album => (
    //                 <InfoCard
    //                     link={`/album/${album.id}`}
    //                     key={album.id}
    //                     img={album.cover_img}
    //                     content={album.name}
    //                     extraInfo={[album.artist_name, album.uploaded_at]}
    //                 />
    //             ))}
    //         </div>
    //         <div className="rail">
    //             {topPlaylists.map(playlist => (
    //                 <InfoCard
    //                     link={`/playlist/${playlist.id}`}
    //                     key={playlist.id}
    //                     img={playlist.cover_img}
    //                     content={playlist.name}
    //                     extraInfo={[playlist.uploaded_at]}
    //                 />
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default Home;
