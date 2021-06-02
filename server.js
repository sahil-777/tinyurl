const express = require('express');
const dotenv =require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

let app = express();

app.get('/',async(req,res)=>{
    return res.send('Hiiiiiiiiiiiiiii');
})

app.listen(PORT,async (err) =>{
    console.log('Server is running on localhost:'+PORT);
});
