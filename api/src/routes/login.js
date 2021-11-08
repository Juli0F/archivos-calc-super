
const router = require('express').Router();
const crypto = require('crypto');
const db = require('../db/db')
const checktoken = require('../auth/checktoken');


//login verefico que exita en redis, si no me devuelve algo entonces lanza error
router.post('/login', async (request, response) => {
    const { usuario, password } = request.body;
    let usr;
    try {
        usr = await db.getUsuario(usuario);

        if (!usr) {
            response.json({msg:"No se encontraron coincidencias",result:0}).status(403);
        }else {
            crypto.pbkdf2(password, usr.sal, 1000, 64, 'sha1', (err, respuesta) => {
                const encryptedPass = respuesta.toString('base64');
                if (usr.password === encryptedPass) {
                    const token = checktoken.crearToken(usuario);
                    response.status(201).json({ "token": token ,result:1 })
                }else {
                    response.json({msg:"Credenciales incorrectas",result:0}).status(403);
                }
            });

        }
    } catch (error) {
        response.json({msg:"No hay coincidencias",result:0}).status(403);
    }

});


router.post('/registrar', async (request, response) => {
    const { usuario, password } = request.body;
    let existe;

    try {
        existe = await db.existe(usuario);

        if (existe !== 0) {
            response.json({ msg: "vuelva a intentarlo",result:0}).status(202);
        } else {
            crypto.randomBytes(16, (err, sal) => {
                const nuevaSal = sal.toString('base64');
                crypto.pbkdf2(password, nuevaSal, 1000, 64, 'sha1', async (error, resultado) => {
                    const passwordEncriptado = resultado.toString('base64');
                    try {
                        await db.insertarUsuario(usuario, passwordEncriptado, nuevaSal);
                    } catch (error) {
                        response.json({ msg: "Error al intentar guardar el usuario en la base de datos.",result:0 }).status(201);
                    }
    
                });
            });
            response.json({ msg: "Se Creo COn Exito",result:0 }).status(201);
        }
    }catch (error) {
        response.json({ msg: "Fail, verificar redis",result:0 }).status(202);
    }

});







module.exports = router;
