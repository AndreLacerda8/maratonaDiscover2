const express = require('express')//express é uma biblioteca para criar o servidor
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')


//request, response
routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index )
routes.post('/profile', ProfileController.update )//aqui estamos passando como 2° argumento o objeto profile que criamos ali em cima, isso para poder colocar esses dados do back para o front. Ou seja, ele joga esse objeto para o html profile. Aí lá no html podemos usar essas variaveis assim: <%= profile.name %>


module.exports = routes