const jwt = require('jsonwebtoken')

exports.validateToken = (req, res, next) => {
    // O get pega uma inf do header
    const token = req.get("x-auth-token");
    // Não tem token retorna 401
    if(!token) {
        res.status(401).json({erro: "Token Inválido."})
    }
    else{
        try{
            // Verificar o payload, tem que ser igual ao que esta no controller validateLogin - S3cret2023 -
            const payload = jwt.verify(token, 'S3cret2023');
            if(payload) {
                console.log("Payload: ", payload);
                next();
            }
            else{
                res.status(401).json({erro: "Token Inválido."})
            }

        } catch (err) {
            res.status(401).json({erro: "Token Inválido."})
        }
    }
};
  

  