const sqlite3 = require('sqlite3')
const { open } = require('sqlite')//aqui só importamos a funcionalidade open de sqlite, pois só precismao dele do sqlite

//Configurar conexão, abertura
module.exports = () =>
    open({
        filename: './database.sqlite',//arquivo em que vai guardar as informações
        driver: sqlite3.Database//driver é quem pega a informação, faz o trabalho e guarda ela no filename
    })//exportamos dessa forma porque o open precisa estar dentro de uma estrutura de função