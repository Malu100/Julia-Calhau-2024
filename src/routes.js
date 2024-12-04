const express =  require('express')
const router = express.Router();

const clientes = require('./controller/controllerclientes')
const professores = require('./controller/controllerprofessores')
const telefones = require('./controller/controllertelefones')
const veiculos = require('./controller/contollerveiculos')

const teste = (req, res) => {
    res.json("Back-end, respondendo com sucesso")
}

router.get('/', teste)


router.post('/clientes', clientes.create)
router.get('/clientes', clientes.read)
router.put('/clientes/:id', clientes.update)
router.delete('/clientes', clientes.deletar)


router.post('/professores', professores.create)
router.get('/professores', professores.read)
router.put('/professores', professores.update)
router.delete('/professores', professores.deletar)


router.post('/telefones', telefones.create)
router.get('/telefones', telefones.read)
router.put('/telefones', telefones.update)
router.delete('/telefones', telefones.deletar)


router.post('/veiculos', veiculos.create)
router.get('/veiculos', veiculos.read)
router.put('/veiculos', veiculos.update)
router.delete('/veiculos', veiculos.deletar)


module.exports = router