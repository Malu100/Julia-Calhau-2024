const con = require('../connect/database.js');

const create = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento } = req.body;

    if (!nome || !cpf || !email || !endereco || !data_nascimento) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const query = `
        INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    con.query(query, [nome, cpf, email, endereco, data_nascimento], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: 'Cliente criado com sucesso!', id: result.insertId });
        }
    });
};

const read = (req, res) => {
    const query = 'SELECT * FROM clientes';

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const update = (req, res) => {
    const id = Number(req.params.id);
    const { nome, cpf, email, endereco, data_nascimento } = req.body;

    if (!id || !nome || !cpf || !email || !endereco || !data_nascimento) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const query = `
        UPDATE clientes 
        SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?
        WHERE cliente_id = ?
    `;

    con.query(query, [nome, cpf, email, endereco, data_nascimento, id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
        }
    });
};

const deletar = (req, res) => {
    const id = Number(req.body.id);

    if (!id) {
        return res.status(400).json({ error: 'O ID do cliente é obrigatório.' });
    }

    const query = 'DELETE FROM clientes WHERE cliente_id = ?';

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Cliente deletado com sucesso!' });
        }
    });
};

module.exports = {
    create,
    read,
    update,
    deletar
};
