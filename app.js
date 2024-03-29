const express = require('express');

const app = express();
const path = require('path');
const routes = require('./src/routes/routes');

const port = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'src/templates'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index',{ name :'shubham'})
})

app.get('/amp',(req,res)=>{
    res.render('amp-index')
})

app.get('/amp-helper',(req,res)=>{
    res.render('amp-helper-iframe')
})

app.get('/amp-permission',(req,res)=>{
    res.render('amp-permission-dialogue')
})

app.use('/api',routes);


app.listen(port,function(){
    console.log(`Example app listening at http://localhost:${port}`)
})


