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
    let longURL = ''
    let mainAddress = req.protocol + '://' + req.get('host')
    try {
        let response = await axios.get('http://localhost:3000/api/getLongUrl/' + shortKey)
        longUrl = response.data.longUrl;
    } catch (error) {
        console.log(error.code)
        console.log(error.statusCode)
        longURL = mainAddress + '/msg/error'
    }
    return res.redirect(longUrl)
})

router.get('/msg/error', async (req, res) => {
    return res.render('error-page');
})

router.use('/', getLongURL);
router.use('/', getShortURL);

module.exports = router;
