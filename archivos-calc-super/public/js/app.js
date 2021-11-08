
function sendData(){
    let val1 = document.getElementById('first_number').valueAsNumber;
    let val2 = document.getElementById('second_number').valueAsNumber;
    let operator = document.getElementById('operator').value;
    
    
    var request = new XMLHttpRequest();
    
    request.open('POST','/api/calc');
    request.setRequestHeader('Content-Type','application/json');
    request.setRequestHeader('autorizacion',localStorage.getItem('token'));
    
    
    request.send(JSON.stringify(
                {opr:operator,
                opr1:val1,
                opr2:val2
                }
                ));
    /*request.send(JSON.stringify({'first_number':val1,
                                 'second_number':val2,
                                 'operator':opr
                                 }
                                ));
    */
    
    request.addEventListener('load',()=>{
        let resultado = JSON.parse(request.responseText);
        
        if(resultado.result===1){
            document.getElementById('resultado').innerHTML = 'El resultado de la operación es : '+resultado.res;
            historial(resultado.operaciones);
            cargarUltimaOperacion(resultado.opr1,resultado.opr2,resultado.opr,resultado.res);
        }else{
            window.location = "http://localhost/login"
        }
    });
    
    request.addEventListener('error',()=>{
        document.getElementById('msg').innerHTML =  'Error en la conexion';
        document.getElementById('btnModalInfo').click();
    });
}

function newUsr(){
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    
    
    axios.default.post('http://localhost/api/registrar',
                       {usuario:usuario,password:password}
                       ).then((respuesta)=>{
                            
                            window.location="http://localhost/login";
    }).catch((error)=>{
        console.log(error);
    });
}

function login(){
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    
    axios.default.post('http://localhost/api/login',{usuario:usuario,password:password})
    .then((respuesta)=>{
        if(respuesta.data.result===1){
            localStorage.setItem('token',respuesta.data.token);
            window.location="http://localhost/home";
        }else{
            document.getElementById('msg').innerHTML = respuesta.data.msg;
            document.getElementById('btnModalInfo').click();
        }
    }).catch((error)=>{
        console.log(error);
    });
}

function historial(historial){
    let texto = "";
    for (let i = 0; i < historial.length; i++) {
        texto += i+"> "+historial[i]+"\n";    
    }
    document.getElementById('historial').innerHTML = texto;
}

function cargarUltimaOperacion(opr1,opr2,opr,res){
    document.getElementById('resultado').innerHTML = opr1+" "+opr+" "+opr2+" = "+res;
}

function cerrarSesion(){
    localStorage.setItem('token','');
    window.location = 'http://localhost/login';
}