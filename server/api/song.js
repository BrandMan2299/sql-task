const { Router } = require('express');
const { Song } = require('../models');

const router = Router();
router.post('/', async (req, res) => {
    const song = await Song.create(req.body);
    res.json(song)
})

router.route('/:songId')
    .get(async (req, res) => {
        const song = await Song.findByPk(req.params.songId, {
            include: ['Album', 'Artist', 'Playlists']
        });
        res.json(song)
    })
    .put(async (req, res) => {
        const song = await Song.findByPk(req.params.songId);
        await song.update(req.body);
        res.json(song)
    })
    .delete(async (req, res) => {
        const song = await Song.findByPk(req.params.songId);
        await song.destroy();
        res.json({ deleted: true })
    })

module.exports = router;