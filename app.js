const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const routes = require('./src/routes/routes');
const firebase = require('firebase')

const port = process.env.PORT || 5001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/templates'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index',{ name :'shubham'})
})

app.use('/api',routes);

app.listen(port,function(){
    console.log(`Example app listening at http://localhost:${port}`)
})


