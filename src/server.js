const express = require('express')
const cors = require('cors')

const app = express()
const clientes = []

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API da Barbearia funcionando!')
})

app.post('/clientes', (req, res) => {
  const {nome} = req.body
  const novoCliente = {
      nome,
      cortes: 0,
      cortesGratis: false
  }
  clientes.push(novoCliente)
  res.status(201).json(novoCliente)
})

app.get('/clientes', (req, res) =>{
  res.json(clientes)
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})

app.put('/clientes/:nome', (req, res)=>{
  const {nome} = req.params
  const cliente = clientes .find(cliente => cliente.nome === nome)

  if (!clientes){
    return res.status(400).json({erro:'cliente não encontrado'})
  }
  cliente.cortes += 1

  if(cliente.cortes >= 9 && cliente.cortes < 11)
  res.json(cliente)
})
