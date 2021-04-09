//Esse arquivo só roda uma vez, no inicio, ele é para criar as tabelas.

const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()//com isso já iniciamos a conexão com o banco de dados, por causa do open. PRECISAMOS do await para esperar a conexão ser estabelecida para depois mandar os dados, pois não dá para ter execução entes de terminar o Database(), de ter conexão.

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);//esse exec é para executar. dentro dos parenteses usamos SQL(comandos de banco de dados)
        //todas as tabelas precisam ter uma primary key. ele tem um incremento automatico, por causa desse autoincrement, ou seja, ele seta o id automaticamente. o primary key diz que esse id é o identificador do elemento. ele não precisa chamar id pode ser cpf por exemplo.

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "André",
            "https://github.com/AndreLacerda8.png",
            3000,
            5,
            6,
            4,
            60
        );`)//isso é para rodar o comando no banco de dados
        //Ele vai inserir no profile os valores em values de acordo com os campos passados em cima, de acordo com a ordem

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`)

        await db.close()//aqui encerramos a conexão
    }
}

initDb.init()