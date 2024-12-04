const con = require('../connect/database.js');

const create = (req, res) => {
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = `
        INSERT INTO veiculos (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: 'Veículo criado com sucesso!', id: result.insertId });
        }
    });
};

const read = (req, res) => {
    con.query('SELECT * FROM veiculos', (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = `
        UPDATE veiculos
        SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ?, cliente_id = ?
        WHERE veiculos_id = ?
    `;

    con.query(query, [marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id, id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Veículo atualizado com sucesso!' });
        }
    });
};

const deletar = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM veiculos WHERE veiculos_id = ?`;

    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'Veículo deletado com sucesso!' });
        }
    });
};

module.exports = {
    create,
    read,
    update,
    deletar
};
