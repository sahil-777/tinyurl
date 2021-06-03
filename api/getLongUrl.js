const express = require('express')
let router = express.Router()

router.get('/api/getLongUrl/:shortKey', async (req, res) => {
    console.log(req.params.shortKey)
    let longUrl = 'long-url'
    return res.json({
        'longUrl': longUrl
    });
})

module.exports = router;
