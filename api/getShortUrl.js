const express = require('express')
let router = express.Router()

router.get('/api/getShortUrl/:longUrl', async (req, res) => {
    console.log(req.params.longUrl)
    let shortKey = 'short-key'
    return res.json({
        'shortKey': shortKey
    });
})

module.exports = router;
