
const express = require("express");
const app = express();

const operacion = require("../routes/operacion");

app.set("port", process.env.PORT || 4000);

app.use(express.json());
//ruta por defecto 
app.use("/api/operacion",operacion);

app.listen(app.get('port'),()=>{
    console.log("http://localhost:4001");
});