const { Router } = require('express');
const { Album, Artist } = require('../models');

const router = Router();
router.post('/', async (req, res) => {
    const newAlbum = await Album.create(req.body);
    res.json(newAlbum)
});

router.route('/:albumId')
    .get(async (req, res) => {
        const album = await Album.findByPk(req.params.albumId, {
            include: [{ model: Artist, attributes: ['name'] }, 'Songs']
        });
        res.json(album)
    })
    .put(async (req, res) => {
        const album = await Album.findByPk(req.params.albumId);
        await album.update(req.body);
        res.json(album)
    })
    .delete(async (req, res) => {
        const album = await Album.findByPk(req.params.albumId);
        await album.destroy();
        res.json({ deleted: true })
    })

module.exports = router;