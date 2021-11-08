const express = require( "express" );
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
const port = 4000; // default port to listen


app.use(express.static('public'));
app.use('/js',express.static(__dirname+'public/js'));
app.use(bodyparser.json());
app.set('view engine', 'ejs');


app.get( "/home", ( request, response ) => {
    //response.status(201).render('index');    
    response.status(201).render('index');
} );

app.get( "/", ( request, response ) => {
    //response.status(201).render('index');    
    response.status(201).render('login');
} );

app.get( "/login", ( request, response ) => {
    
    response.status(201).render('login');
} );

app.get( "/historial", ( request, response ) => {
    
    response.status(201).render('historial');
} );
app.get( "/aboutme", ( request, response ) => {
    
    response.status(201).render('about');
} );
app.get( "/registro", ( request, response ) => {
    response.status(201).render('registro');
    
} );

app.get( "*", ( request, response ) => {
    
    response.status(201).render('404');
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );