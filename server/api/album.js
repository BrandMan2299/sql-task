const { Router } = require('express');
const { Album } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
    const allAlbums = await Album.findAll();
    res.json(allAlbums)
})

module.exports = router;