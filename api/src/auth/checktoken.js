const webtoken = require('jsonwebtoken');
const db = require('../db/db');

const tokensecreto = process.env.TOKEN_VALUE;

module.exports.crearToken = (id) => {
    return webtoken.sign({ id }, tokensecreto, {
        expiresIn: 120
    });
}

module.exports.revisarToken = async (request, response, next) => {
    const token = request.headers.autorizacion;
    if (!token) {
        return response.json({msg:"Necesitas Tener Una Cuenta.",result:0}).status(200);
    }else{
        webtoken.verify(token, tokensecreto, async (err, decodificado) => {
            if (decodificado) {
                const { id } = decodificado;
                let existe = await db.existe(id);
                if (existe !== 0) {
                    request.user = id;
                    next();
                }else {
                    return response.json({msg:"Necesitas Tener Una Cuenta.",result:0}).status(200);
                }
            }else {
                return response.json({msg:"Necesitas Tener Una Cuenta.",result:0}).status(200);
            }
        });
    }
};