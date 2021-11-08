const redis = require('redis');

const clienteRedis = redis.createClient({
    host:'redis',
    port: 6379,
    retry_strategy: ()=> 1000
});

module.exports.insertarOperacion = async (usuario, operacion) => {
    let usr = await this.getUsuario(usuario);
    return new Promise((resolve, reject) => {
        if(usr){
            resolve(clienteRedis.sadd('historial-'+usuario, operacion));
        }else{
            reject("Error al guardar operacion");
        }
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

module.exports.getHistorial = (usuario) => {
    return new Promise((resolve, reject) => {
        clienteRedis.smembers('historial-'+usuario, function (error, historial) {
            if (error) {
                reject(0);
            }else {
                resolve(historial);
            }
        });
    });
};
