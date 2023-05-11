const Client = require("../model/client_model");
const Anamnese = require("../model/anamnese_model");


//Função para listar todos os clientes
exports.list = async (req, res) => {
    try{ 
        const client = await Client.find(); //Busca todos os clientes cadastrados na base de dados
        res.json(client); //Retorna um objeto JSON com todos os clientes encontrados
    }
    catch(err) {
        res.status(500).json({Erro:err}); //Retorna um objeto JSON com erro, caso ocorra algum erro na busca
    }
}

//Função para buscar um cliente específico pelo ID e retornar todas as fichas de anamnese associadas a ele
exports.findById = async (req, res) => {
    const id = req.params.id; //Obtém o ID do cliente a partir do parâmetro na URL da requisição

    try{ 
        const clientEncontrado = await Client.findById(id); //Busca o cliente pelo ID na base de dados
        if(clientEncontrado){ //Se o cliente foi encontrado
            let anamneses = []; // Define um array vazio para armazenar as fichas de anamnese
            anamneses = await Anamnese.find({ clientId: id }); //Busca todas as fichas de anamnese associadas ao cliente
            clientEncontrado.anamneses = anamneses; //Adiciona as fichas de anamnese ao objeto do cliente encontrado
            return res.json(clientEncontrado); //Retorna um objeto JSON com o cliente encontrado e suas fichas de anamnese associadas
        }
        else {
            return res.status(404).json({ Erro: "client nao encontrado"});//Retorna um objeto JSON com erro, caso o cliente não seja encontrado
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }     
}

//Função para criar um novo cliente na base de dados
exports.createItem = async (req, res) => { 
    //receber o produto
    const clientRequest = req.body;  
    //validar os dados
    if(clientRequest && clientRequest.name && clientRequest.dateOfBirth && clientRequest.rg && clientRequest.cpf){
        //se OK, cadastro os produtos e retorno 201
        const clientNew = new Client(clientRequest);

        try{ 
            const savedClient = await clientNew.save(); // salva o novo cliente no banco
            return res.status(201).json(savedClient); // retorna o novo cliente criado
        }
        catch(err) { 
            res.status(500).json({Erro:err});
        }
    }
    else{
        //senao retorna 400
        return res.status(400).json({
            Erro: "Nome, email, telefone e endereço são obrigatórios"
        });
    }
}

exports.updateItemById = async (req, res) => { 
    const id = req.params.id;
    const clientUpdate = req.body;

    // Verificar se todas as informações necessárias estão presentes na requisição
    if(!clientUpdate || !clientUpdate.name || !clientUpdate.dateOfBirth || !clientUpdate.rg || !clientUpdate.cpf){
        return res.status(400).json({
            Erro: "Name, data nascimento, RG e/ou cpf são obrigatorios"
        });
    }

    try{ 
        const clientUpdated = await Client.findByIdAndUpdate(id, clientUpdate, {new: true});

        if(clientUpdated){ 
            return res.json(clientUpdated);
        }
        else {
            return res.status(404).json({ Erro: "Cliente não encontrado"});
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}

exports.deleteItemById = async (req, res) => { 
    const id = req.params.id;

    try{ 
        const clientRemoved = await Client.findByIdAndDelete(id);
        if(clientRemoved){ 
            return res.json({ Mensagem: "Cliente removido com sucesso" });
        }
        else {
            return res.status(404).json({ Erro: "Cliente não encontrado" });
        }
    } catch(err) {
        res.status(500).json({Erro:err});
    }            

}