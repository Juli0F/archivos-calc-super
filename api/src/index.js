
const express = require( "express" );
const app = express();
const axios = require("axios");
const loginroutes = require("../src/routes/login");
const checktoken = require('./auth/checktoken');

const port = 4001; 

app.use(express.urlencoded());

app.use((request,response,next)=>{

    console.log("Hello World from middleware");
    console.log("funciona");
    next();
});

app.use(express.json());

app.use('/',loginroutes);


app.post("/calc", checktoken.revisarToken, async(request,response)=>{

    const parameters = {
        opr1: request.body.opr1,
        opr2: request.body.opr2,
        token: request.headers.autorizacion
    };

    await axios.default.post('http://worker:4002/worker/'+request.body.opr, parameters).
    then(resp =>{
        response.json(resp.data).status(201);
    })
    .catch(error => {
        response.json(error).status(200);
    });
    

});


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
