const { Router } = require('express');
const router = new Router();



router.get('/',(req,res)=> {
    const prueba = {
        name: "api operacion"
    };
    res.status(201).json(prueba);
});

router.post('/',(req,res) => {
    console.log("metodo post");
    const{ primer_numero, segundo_numero, operador} = req.body;
    console.log('Got body:', req.body);
    
    var result = "";    
    switch(operador) {
        case 1:
            result = primer_numer + segundo_numero;
        break;
        case 2:
            result = primer_numer + segundo_numero;
        break;
        case 3:
            result = primer_numer + segundo_numero;
        break;
        case 4:
            result = primer_numer + segundo_numero;
        break;
        default:
        
        result = "Error en Operacion prueba ${operador} primer numero"+primer_numero;
        
    }
    const return_json = {
        
        operator  : operador,
        primero   : primer_numero,
        segindo   : segundo_numero,
        respuesta : result
        
      };
    res.status(201).json(return_json);
});

module.exports = router;