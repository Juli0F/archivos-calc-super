const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(201).render('index');
});


app.get('/aboutme', (req, res) => {
    
    
    //res.status(201).sendFile(path.join(__dirname,'../views/about.html'));
    res.status(201).render('../views/about');
    
});

app.get('/historial', (req, res) => {
    
    
    //res.status(201).sendFile(path.join(__dirname,'../views/historial.html'));
    res.status(201).render("../views/historial.ejs");
    
});
app.get('/app', (req, res) => {

    res.status(201).render('index');
    
});


app.use( (req, res,next) => {
    res.status(404).render("../views/404.ejs");
    
});

app.listen(4000, () => console.log('http://localhost:4000'));


