const { Router } = require('express');
const { Song, Playlist, Album, Artist } = require('../models');

const router = Router();
router.route('/')
    .get(async (req, res) => {
        const allSongs = await Song.findAll({
            include: [{ model: Album, attributes: ['name'] }, { model: Artist, attributes: ['name'] }, { model: Playlist, attributes: ['name'] }]
        });
        res.json(allSongs)
    })
    .post(async (req, res) => {
        const song = await Song.create(req.body);
        res.json(song)
    })

router.route('/:songId')
    .get(async (req, res) => {
        const song = await Song.findByPk(req.params.songId, {
            include: [{ model: Album, attributes: ['name'] }, { model: Artist, attributes: ['name'] }, { model: Playlist, attributes: ['name'] }]
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