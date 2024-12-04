const con = require('../connect/database.js');

const create = (req, res) => {
    const { cliente_id, professor_id, numero, tipo } = req.body;

    const query = `
        INSERT INTO telefone (cliente_id, professor_id, numero, tipo)
        VALUES (?, ?, ?, ?)
    `;

    con.query(query, [cliente_id, professor_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: 'Telefone criado com sucesso!', id: result.insertId });
        }
    });
};

const read = (req, res) => {
    con.query('SELECT * FROM telefone', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { cliente_id, professor_id, numero, tipo } = req.body;

    const query = `
        UPDATE telefone
        SET cliente_id = ?, professor_id = ?, numero = ?, tipo = ?
        WHERE telefone_id = ?
    `;

    con.query(query, [cliente_id, professor_id, numero, tipo, id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Telefone atualizado com sucesso!' });
        }
    });
};

const deletar = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM telefone WHERE telefone_id = ?`;

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Telefone deletado com sucesso!' });
        }
    });
};

module.exports = {
    create,
    read,
    update,
    deletar,
};
