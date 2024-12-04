const con = require('../connect/database.js');

const create = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento } = req.body;

    const query = `
        INSERT INTO professor (nome, cpf, email, endereco, data_nascimento, data_cadastro)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    con.query(query, [nome, cpf, email, endereco, data_nascimento], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: 'Professor criado com sucesso!', id: result.insertId });
        }
    });
};

const read = (req, res) => {
    con.query('SELECT * FROM professor', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, endereco, data_nascimento } = req.body;

    const query = `
        UPDATE professor
        SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?
        WHERE professor_id = ?
    `;

    con.query(query, [nome, cpf, email, endereco, data_nascimento, id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Professor atualizado com sucesso!' });
        }
    });
};

const deletar = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM professor WHERE professor_id = ?`;

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Professor deletado com sucesso!' });
        }
    });
};

module.exports = {
    create,
    read,
    update,
    deletar
};
