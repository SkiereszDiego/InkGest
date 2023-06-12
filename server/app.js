const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routeInventory = require('./routes/inventory_route');
const routeUser = require('./routes/users_route');
const routeLogin = require('./routes/login_route');
const routeCliente = require('./routes/client_route');

const logMiddleware = require('./middleware/log_middleware');
const corsMiddleware = require('./middleware/cors');
const loginMiddleware = require('./middleware/login_middleware');

const PORTA = 3000;

// Configuração da conexão com o MongoDB
mongoose.connect(require('./config/db').url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado ao MongoDB.');
    })
    .catch((error) => {
        console.log('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    });

// Middleware para análise de corpo de requisição JSON
app.use(express.json());

// Middleware para análise de corpos de requisição codificados
app.use(express.urlencoded({ extended: true }));

// Middleware do CORS
app.use(corsMiddleware);

// Middleware para log de requisições para todas as rotas. Serve para todos que estão abaixo dele no código
app.use(logMiddleware);

// Roteamento
app.use('/api/login', routeLogin);

// Middleware para autenticação de usuários
// app.use(loginMiddleware.validateToken)

// Rotas de usuários
app.use('/api/users', loginMiddleware.validateToken('user'), routeUser);

app.use('/api/inventory', routeInventory);
// Se quiser aplicar o middleware apenas para produtos
// app.use('/api/inventory', loginMiddleware.validateToken, routeInventory);

app.use('/api/client', routeCliente);

// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
});
