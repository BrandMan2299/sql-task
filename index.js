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

app.get('/songs', (req, res) => {
    mysqlCon.query(`
        SELECT s.id, s.title, s.length, s.track_number, s.created_at, s.uploaded_at, al.name AS "Album Name", ar.name AS "Artist Name"
        FROM songs s
        JOIN albums al
        ON al.id = s.album_id
        JOIN artists ar
        ON ar.id = s.artist_id;`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            };
            res.json(results);
        }
    );
});

app.get('/songs/:id', (req, res) => {
    mysqlCon.query(`SELECT s.id, s.title, s.length, s.track_number, s.created_at, s.uploaded_at, al.name AS "Album Name", ar.name AS "Artist Name"
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
            res.json(results);
        });
});

app.get('/albums/:id', (req, res) => {
    mysqlCon.query(`SELECT al.*, COUNT(s.id) AS "songs in album"
    FROM albums al
    JOIN artists ar
    ON ar.id = al.artist_id
    JOIN songs s
    ON al.id = s.album_id
    WHERE al.id = ${req.params.id}`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            }
            else if (!results[0]) {
                return res.send("no albums found");
            }
            res.json(results);
        });
});

app.get('/artists/:id', (req, res) => {
    mysqlCon.query(`SELECT ar.*, COUNT(al.id) AS "albums by artist"
    FROM artists ar
    JOIN albums al
    ON ar.id = al.artist_id
    WHERE ar.id = ${req.params.id}`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            }
            else if (!results[0]) {
                return res.send("no artist found");
            }
            res.json(results);
        });
});

app.get('/playlists/:id', (req, res) => {
    mysqlCon.query(`SELECT p.*, count(sip.song_id) AS "songs in play list"
    FROM playlists p
    JOIN songs_in_playlists sip
    ON p.id = sip.playlist_id
    WHERE p.id = ${req.params.id}`,
        (err, results, fields) => {
            if (err) {
                res.send(err.message);
            }
            else if (!results[0]) {
                return res.send("no playlist found");
            }
            res.json(results);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});