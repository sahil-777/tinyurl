const express = require('express');
const axios = require('axios')

let router = express.Router()
let getLongURL = require('../api/getLongUrl')
let getShortURL = require('../api/getShortUrl')

router.get('/', async (req, res) => {
    return res.render('index');
})

router.get('/:shortKey', async (req, res) => {
    let shortKey = req.params.shortKey;
    let response = await axios.get('http://localhost:3000/api/getLongUrl/' + shortKey)
    let longUrl = response.data.longUrl;
    return res.redirect(longUrl)
})

router.use('/', getLongURL);
router.use('/', getShortURL);

module.exports = router;
