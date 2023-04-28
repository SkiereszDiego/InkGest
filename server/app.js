const express = require ('express')
const mongoose = require ('mongoose')
const routeInventory = require('./routes/inventory')

// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use(expres.urlencoded({extended:true}));

// app.use('/api/inventory', routeInventory);

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// })

const app = express();
const PORTA = 3000;

const trataLog = (req, res, next) => {
    console.log("[REQUEST]", `${req.method} ${req.originalUrl}`);
    next();
    console.log("[RESPONSE]", `${res.statusCode}`);
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configuração da conexão com o Mongo
mongoose.connect('mongodb://127.0.0.1:27017/Inkgest')
    .then(() => {
        console.log("Conectado ao MongoDB..");
    }).catch((error) => {
        console.log("Erro:", error)
    });

app.use(trataLog);

app.use('/api/inventory', routeInventory);

app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})