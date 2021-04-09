const Database = require('../db/config')


module.exports = {
    async get(){
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)//isso aqui é para pegar todos os campos da tabela profile. o get() pega um dado, que aqui é o suficiente, pois só tem um profile, mas não funcionaria nos jobs

        await db.close()

        
        return{
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }//isso aqui é porque tinhamos os nomes com - mas no banco de dados nao pode então nele usamos _
    },

    async update(newData){
        const db = await Database()
        
        db.run(`UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]}
        `)//aqui estamos atualizando o profile, setando todos esses campos acima com seu novo valor. Aqui os campos name e avatar tem que estar entre "" pois são textos

        await db.close()
    }
}