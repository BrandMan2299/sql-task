const { Router } = require('express');
const { Artist } = require('../models');

const router = Router();

router.post('/', async (req, res) => {
    const newArtist = await Artist.create(req.body);
    res.json(newArtist)
});

router.route('/:artistId')
    .get(async (req, res) => {
        const artist = await Artist.findByPk(req.params.artistId);
        res.json(artist)
    })
    .put(async (req, res) => {
        const artist = await Artist.findByPk(req.params.artistId);
        await artist.update(req.body);
        res.json(artist)
    })
    .delete(async (req, res) => {
        const artist = await Artist.findByPk(req.params.artistId);
        await artist.destroy();
        res.json({ deleted: true })
    })

module.exports = router;