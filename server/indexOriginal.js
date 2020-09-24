const express = require('express');
var mysql = require('mysql');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(logger);

function logger(req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}
const mysqlJson = JSON.parse(process.env.MYSQL_CON);

const mysqlCon = mysql.createConnection(mysqlJson);
mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/top_songs', (req, res) => {
    mysqlCon.query(`
    SELECT s.*, al.name AS album_name, ar.name AS artist_name, al.cover_img, sum(si.play_count) AS times_played
    FROM songs s
    JOIN albums al
    ON al.id = s.album_id
    JOIN artists ar
    ON ar.id = s.artist_id
    JOIN song_interactions si
    on si.song_id = s.id
    group by si.song_id
    order by sum(play_count) desc
    limit 20`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            };
            res.json(results);
        }
    );
});

app.get('/top_albums', (req, res) => {
    mysqlCon.query(`
    SELECT  al.*, ar.name AS artist_name, sum(si.play_count) AS "sum_of_songs_played"
    FROM albums al
    JOIN artists ar
    ON ar.id = al.artist_id
    JOIN songs s
    ON al.id = s.album_id
    JOIN song_interactions si
    ON si.song_id = s.id
    GROUP BY al.id
    ORDER BY sum(si.play_count) desc
    LIMIT 10`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            };
            res.json(results);
        }
    );
});

app.get('/top_artists', (req, res) => {
    mysqlCon.query(`
    SELECT ar.*, SUM(si.play_count) AS "sum_of_songs_played"
    FROM artists ar
    JOIN songs s
    ON ar.id = s.artist_id
    JOIN song_interactions si
    ON si.song_id = s.id
    GROUP BY ar.id
    ORDER BY SUM(si.play_count) desc
    LIMIT 5`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            };
            res.json(results);
        }
    );
});

app.get('/top_playlists', (req, res) => {
    mysqlCon.query(`
    SELECT p.*, SUM(si.play_count) AS "sum_of_songs_played"
    FROM playlists p
    JOIN songs_in_playlists sip
    ON p.id = sip.playlist_id
    JOIN song_interactions si
    ON si.song_id = sip.song_id
    GROUP BY p.id
    ORDER BY SUM(si.play_count) desc
    LIMIT 5`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            };
            res.json(results);
        }
    );
});

app.get('/songs/:id', (req, res) => {
    mysqlCon.query(`
    SELECT s.*, al.name AS "album_name", ar.name AS "artist_name"
    FROM songs s
    JOIN albums al
    ON al.id = s.album_id
    JOIN artists ar
    ON ar.id = s.artist_id
    WHERE s.id = ${req.params.id}`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            }
            else if (!results[0]) {
                return res.send("no songs found");
            }
            res.json(...results);
        });
});

app.get('/albums/:id', (req, res) => {
    mysqlCon.query(`SELECT al.*, ar.name AS "artist_name" ,COUNT(s.id) AS "songs_in_album"
    FROM albums al
    JOIN artists ar
    ON ar.id = al.artist_id
    JOIN songs s
    ON al.id = s.album_id
    WHERE al.id = ${req.params.id}`,
        (err, album, fields) => {
            if (err) {
                res.send(err.message);
            }
            mysqlCon.query(`SELECT * 
                FROM songs
                WHERE album_id=${req.params.id}`, (err, listOfSongs, fields) => {
                if (err) {
                    res.send(err.message);
                }
                res.json({ info: album[0], listOfSongs });
            })
        });
});

app.get('/artists/:id', (req, res) => {
    mysqlCon.query(`SELECT ar.*, COUNT(al.id) AS "albums_by_artist"
    FROM artists ar
    JOIN albums al
    ON ar.id = al.artist_id
    WHERE ar.id = ${req.params.id}`,
        (err, artist, fields) => {
            if (err) {
                res.send(err.message);
            }
            mysqlCon.query(`SELECT * 
                FROM songs
                WHERE artist_id=${req.params.id}`, (err, listOfSongs, fields) => {
                if (err) {
                    res.send(err.message);
                }
                res.json({ info: artist[0], listOfSongs });
            })
        });
});

app.get('/playlists/:id', (req, res) => {
    mysqlCon.query(`SELECT p.*, count(sip.song_id) AS "songs_in_playlist"
    FROM playlists p
    JOIN songs_in_playlists sip
    ON p.id = sip.playlist_id
    WHERE p.id = ${req.params.id}`,
        (err, playlist, fields) => {
            if (err) {
                res.send(err.message);
            }
            mysqlCon.query(`SELECT s.*, al.name AS "album_name", ar.name AS "artist_name"
            FROM songs_in_playlists sip
            JOIN songs s
            ON s.id = sip.song_id
            JOIN albums al
            ON al.id = s.album_id
            JOIN artists ar
            ON ar.id = s.artist_id
            WHERE sip.playlist_id=${req.params.id}`, (err, listOfSongs, fields) => {
                if (err) {
                    res.send(err.message);
                }
                res.json({ info: playlist[0], listOfSongs });
            })
        });
});

app.post('/songs', (req, res) => {
    mysqlCon.query('INSERT INTO songs SET ?', req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.post('/albums', (req, res) => {
    mysqlCon.query('INSERT INTO albums SET ?', req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.post('/artists', (req, res) => {
    mysqlCon.query('INSERT INTO artists SET ?', req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.post('/playlists', (req, res) => {
    mysqlCon.query('INSERT INTO playlists SET ?', req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.put('/songs/:id', (req, res) => {
    mysqlCon.query(`UPDATE songs SET ? WHERE id = ${req.params.id}`, req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.put('/albums/:id', (req, res) => {
    mysqlCon.query(`UPDATE albums SET ? WHERE id = ${req.params.id}`, req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.put('/artists/:id', (req, res) => {
    mysqlCon.query(`UPDATE artists SET ? WHERE id = ${req.params.id}`, req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.put('/playlists/:id', (req, res) => {
    mysqlCon.query(`UPDATE playlists SET ? WHERE id = ${req.params.id}`, req.body, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.delete('/songs/:id', (req, res) => {
    mysqlCon.query(`DELETE FROM songs WHERE id = ${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.delete('/albums/:id', (req, res) => {
    mysqlCon.query(`DELETE FROM albums WHERE id = ${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.delete('/artists/:id', (req, res) => {
    mysqlCon.query(`DELETE FROM artists WHERE id = ${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

app.delete('/playlists/:id', (req, res) => {
    mysqlCon.query(`DELETE FROM playlists WHERE id = ${req.params.id}`, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        };
        res.json(results);
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});