const express = require('express');
const dotenv = require('dotenv');
let routes = require('./routes/index');

let app = express();

app.use(express.json({}));
dotenv.config();
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, async (err) => {
    console.log('Server is running on localhost:' + PORT);
});
