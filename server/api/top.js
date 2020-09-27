const { Router } = require('express');
const { Song, Playlist, Album, Artist, Song_interactions } = require('../models');

const router = Router();

router.get('/songs', async (req, res) => {
    const topSongs = await Song.findAll({
        order: ['play_count'],
        limit: 2
    })
    res.json(topSongs)
})

router.get('/albums', async (req, res) => {

})

router.get('/playlists', async (req, res) => {

})

router.get('/artists', async (req, res) => {

})
module.exports = router;