const { Router } = require('express');
const { Playlist } = require('../models');

const router = Router();
router.post('/', async (req, res) => {
    const newPlaylist = await Playlist.create(req.body);
    res.json(newPlaylist)
});

router.route('/:playlistId')
    .get(async (req, res) => {
        const playlist = await Playlist.findByPk(req.params.playlistId, {
            include: ['Songs']
        });
        res.json(playlist)
    })
    .put(async (req, res) => {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        await playlist.update(req.body);
        res.json(playlist)
    })
    .delete(async (req, res) => {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        await playlist.destroy();
        res.json({ deleted: true })
    })

module.exports = router;