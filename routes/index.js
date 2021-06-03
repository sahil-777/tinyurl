const express = require('express');
let router = express.Router()
let getLongURL = require('../api/getLongUrl')
let getShortURL = require('../api/getShortUrl')

router.get('/', async (req, res) => {
    return res.send('home-page');
})

router.get('/:shortKey', async (req, res) => {
    //return res.send(req.params.shortKey)
    let longUrl = 'https://www.google.com';
    return res.redirect(longUrl)
})

router.use('/', getLongURL);
router.use('/', getShortURL);

module.exports = router;
