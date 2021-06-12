const express = require('express')
let router = express.Router()

router.post('/api/getShortUrl', async (req, res) => {
    let longUrl = req.body.longUrl
    let shortKey = 'zfgThgG'
    let shortUrl = req.protocol + "://" + req.get('host') + '/' + shortKey
    return res.send({
        'shortUrl': shortUrl,
    });
})

module.exports = router;
