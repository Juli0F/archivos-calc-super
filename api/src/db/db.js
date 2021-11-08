const redis = require('redis');

const clienteRedis = redis.createClient({
    host:'redis',
    port: 6379,
    retry_strategy: ()=> 1000
});

module.exports.existe = (usuario) => {
    return new Promise((resolve, reject) => {
        clienteRedis.exists(usuario, function (error, respuesta) {
            if (error) {
                reject(0);
            }else {
                resolve(respuesta);
            }
        });
    });
};

module.exports.insertarUsuario = (usuario, password, sal) => {
    return new Promise((resolve, reject) => {
        resolve(clienteRedis.hset(usuario, 'password', password, 'sal', sal));
    });
};

module.exports.getUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        clienteRedis.hgetall(usuario, function (error, existe) {
            if (error) {
                reject(0);
            }else {
                resolve(existe);
            }
        });
    });
};