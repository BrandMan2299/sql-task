const { Router } = require('express');
const { Song, Playlist } = require('../models');


const router = Router();

router.get('/', async (req, res) => {
    const allSongs = await Song.findAll({
        include: ['Album', 'Artist', { model: Playlist }]
    });
    res.json(allSongs)
})

router.get('/:songId', async (req, res) => {
    const allSongs = await Song.findByPk(req.params.songId, {
        include: ['Album', 'Artist']
    });
    res.json(allSongs)
})

module.exports = router;