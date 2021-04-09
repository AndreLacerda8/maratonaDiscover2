const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

server.set('view engine', 'ejs')//Isso é para visualizar o ejs. Usando template engine

//Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estaticos
server.use(express.static("public"))//o use server para setar configurações no servidor

//Usar o req.body, ele está em routes.js
server.use(express.urlencoded({ extended: true }))//precisamos dessa linha para usar o req.body

//routes
server.use(routes)
server.listen(3000, () => console.log('rodando'))