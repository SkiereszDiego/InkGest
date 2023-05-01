const express = require ('express')
const mongoose = require ('mongoose')

const routeInventory = require('./routes/inventory_route')
const routeUser = require('./routes/users_route')
const routeLogin = require('./routes/login_route')

const logMiddleware = require('./middleware/log_middleware');
const loginMidleware = require('./middleware/login_middleware');


const app = express();
const PORTA = 3000;


//Configuração da conexão com o Mongo
mongoose.connect('mongodb://127.0.0.1:27017/Inkgest')
.then(() => {
    console.log("Conectado ao MongoDB..");
}).catch((error) => {
    console.log("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
});

// Middleware para análise de corpo de requisição JSON
app.use(express.json());

// Middleware para análise de corpos de requisição codificados
app.use(express.urlencoded({extended:true}));

// Middleware para log de requisições para todas rotas. Serve para todos que estão abaixo dele no codigo
app.use(logMiddleware);

// Roteamento

app.use('/api/login', routeLogin);

app.use('/api/users', routeUser);

app.use(loginMidleware.validateToken)

app.use('/api/inventory', routeInventory);
// Se quiser aplicar o middleware apenas para produtos
// app.use('/api/inventory', loginMidleware.validateToken, routeInventory);

// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
})