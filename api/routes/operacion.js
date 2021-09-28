const { Router } = require('express');
const router = new Router();



router.get('/',(req,res)=> {
    const prueba = {
        name: "api operacion"
    };
    res.status(201).json(prueba);
});

router.post('/',(req,res) => {
    
    
   // const{ primer_numero, segundo_numero, operador} = req.body;
    console.log("1 Parametro QUery "+ req.query.primer_numero);
    console.log("2 Parametro QUery "+ req.query.segundo_numero);
    console.log("3 (operador)Parametro QUery "+ req.query.operador);
    
    
    const primer_numero = req.query.primer_numero;
    const segundo_numero = req.query.segundo_numero;
    const operador = req.query.operador;
    
    var result = "";    
    switch(operador) {
        case 1:
        case "1":
            result = primer_numero + segundo_numero;
        break;
        case 2:
        case "2":
            result = primer_numero - segundo_numero;
        break;
        case 3:
            case "3":
            result = primer_numero * segundo_numero;
        break;
        case 4:
        case "4":
            result = primer_numero /  segundo_numero;
        break;
        default:
        
        result = "Error en Operacion prueba ${operador} primer numero"+primer_numero;
        
    }
    const return_json = {
        
        operator  : operador,
        primero   : primer_numero,
        segundo   : segundo_numero,
        respuesta : result
        
      };
    res.status(201).json(return_json);
});

module.exports = router;