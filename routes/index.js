const express = require('express');
const axios = require('axios')

let router = express.Router()

router.get('/', async (req, res) => {
    return res.render('index');
})

router.get('/:shortKey', async (req, res) => {
    let shortKey = req.params.shortKey;
    let longURL = ''
    let mainAddress = req.protocol + '://' + req.get('host')

    try {
        let response = await axios.get('https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/' + shortKey)
        if (response.data.statusCode == 200)
            longURL = response.data.longUrl;
        else {
            longURL = mainAddress + '/msg/error'
        }
    } catch (error) {
        longURL = mainAddress + '/msg/error'
    }
    return res.redirect(longURL)
})

router.post('/api/getShortUrl', async (req, res) => {
    let longURL = req.body.longUrl
    let response;
    try {
        response = await axios.post('https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getshorturl', {
            longURL: longURL,
        })
    } catch (error) {
        return res.json({
            statusCode: 500,
            longURL: 'NA',
            msg: 'Internal Server Error'
        })
    }

    let data = response.data;
    return res.json(data);
})

router.get('/msg/error', async (req, res) => {
    return res.render('error-page');
})

module.exports = router;
