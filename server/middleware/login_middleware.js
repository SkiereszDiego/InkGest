const jwt = require('jsonwebtoken');

// Middleware para validar o token
exports.validateToken = (requiredRole) => async (req, res, next) => {

    console.log('Iniciando validação do token');
    // O header contendo o token é enviado com a chave "x-auth-token"
    const token = req.header("x-auth-token");

    console.log(token);

    // Se não houver token, retorna 401 - não autorizado
    if (!token) {
        console.log('Token inválido ou não enviado');
        return res.status(401).json({ erro: "Token inválido ou não enviado." });
    }

    try {
        // Verificar o payload do token, que deve ser igual à chave secreta usada para criá-lo - S3cret2023
        const payload = jwt.verify(token, 's3cret2023');
        console.log('Payload do token:', payload);

        // Se o role do payload não for o requerido, adiciona o ID do usuário na requisição e segue para o próximo middleware
        if (payload.role !== requiredRole) {
            console.log('Usuário não tem permissão para acessar este recurso.');
            req.userId = payload.id;
            next();
        } else {
            console.log('Usuário autenticado com sucesso!');
            // Se o role do payload for diferente do requerido, retorna 401 - não autorizado
            return res.status(401).json({ erro: "Usuário não tem permissão para acessar este recurso." });
        }

    } catch (error) {
        console.log('Token inválido ou expirado');
        console.log(error); // Adicione essa linha
        // Se houver qualquer erro ao validar o token, retorna 401 - não autorizado
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
};
