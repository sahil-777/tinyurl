const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json({}));
dotenv.config();
app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, async (err) => {
    console.log('Server is running on localhost:' + PORT);
});
