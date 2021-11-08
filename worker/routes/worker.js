const router = require('express').Router();
const webtoken = require('jsonwebtoken');
const db = require('../src/db/db');

const tokensecreto = process.env.TOKEN_VALUE;

router.get('/',(request,response)=>{
    console.log("recibiendo peticion en worker");
    response.status(201).json({hello:"Hello Willy"});
});


router.post('/suma', async (request,response)=>{
    let opr1 = request.body.opr1;
    let opr2 = request.body.opr2;
    let res = opr1 + opr2;
    insertarOperacion(opr1+" + "+opr2+" = "+res,request.body.token);
    console.log("recibiendo peticion en worker sumar");
    response.status(201).json({
        opr1: opr1,
        opr2: opr2,
        opr: "+",
        res: res,
        operaciones: await obtenerOperaciones(request.body.token),
        result:1
    });
});

router.post('/resta', async (request,response)=>{
    let opr1 = request.body.opr1;
    let opr2 = request.body.opr2;
    let res = opr1 - opr2;
    insertarOperacion(opr1+" - "+opr2+" = "+res,request.body.token);
    console.log("recibiendo peticion en worker restar");
    response.status(201).json({
        opr1: opr1,
        opr2: opr2,
        opr: "-",
        res: res,
        operaciones: await obtenerOperaciones(request.body.token),
        result:1
    });
});

router.post('/multiplicacion', async (request,response)=>{
    let opr1 = request.body.opr1;
    let opr2 = request.body.opr2;
    let res = opr1 * opr2;
    insertarOperacion(opr1+" * "+opr2+" = "+res,request.body.token);
    console.log("recibiendo peticion en worker multiplicacion");
    response.status(201).json({
        opr1: opr1,
        opr2: opr2,
        opr: "*",
        res: res,
        operaciones: await obtenerOperaciones(request.body.token),
        result:1
    });
});

router.post('/division', async (request,response)=>{
    let opr1 = request.body.opr1;
    let opr2 = request.body.opr2;
    let res = opr1 / opr2;
    insertarOperacion(opr1+" / "+opr2+" = "+res,request.body.token);
    console.log("recibiendo peticion en worker division");
    response.status(201).json({
        opr1: opr1,
        opr2: opr2,
        opr: "/",
        res: res,
        operaciones: await obtenerOperaciones(request.body.token),
        result:1
    });
});

router.post('/potencia', async (request,response)=>{
    let opr1 = request.body.opr1;
    let opr2 = request.body.opr2;
    let res = opr1 ** opr2;
    insertarOperacion(opr1+" ^ "+opr2+" = "+res,request.body.token);
    console.log("recibiendo peticion en worker potencia");
    response.status(201).json({
        opr1: opr1,
        opr2: opr2,
        opr: '^',
        res: res,
        operaciones: await obtenerOperaciones(request.body.token),
        result:1
    });
});

function insertarOperacion(operacion,token){
    webtoken.verify(token, tokensecreto, async (err, decodificado) => {
        if (decodificado) {
            const { id } = decodificado;
            try{
                await db.insertarOperacion(id,operacion); 
            }catch(error){
                console.log(error);
            }
        }
    });
}

function obtenerOperaciones(token){
    return new Promise((resolve,reject)=>{
        webtoken.verify(token, tokensecreto, async (err, decodificado) => {
            if (decodificado) {
                const { id } = decodificado;
                let historial = await db.getHistorial(id);
                resolve(historial);
            }else{
                reject([]);
            }
        });
    });
}

module.exports = router;