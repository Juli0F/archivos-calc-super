const express = require( "express" );
const app = express();
const port = 4002; // default port to listen
const workerroutes = require("../routes/worker");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// define a route handler for the default home page
app.use('/worker/',workerroutes);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );