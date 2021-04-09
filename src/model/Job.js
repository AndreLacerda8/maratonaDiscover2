const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)//aqui estamos fazendo tipo um get mas pegando todos os jobs no caso

        await db.close()

        return jobs.map(job => {
            return{
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            }//fazemos isso por aquele motivo de no front e back estar com - e no banco de dados não pode - e então está com _
        })
    },

    async update(updatedJob, jobId){
        const db = await Database()

        await db.run(`UPDATE jobs SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]},
            WHERE id = ${jobId}
        `)//usamos esse WHERE id para saber qual job que vai ser alterado, se não ele altera tudo

        await db.close()
    },
    
    async delete(id){
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)//aqui deletamos de jobs a linha(todo o elemento) onde o id é = a id que recebemos na função

        await db.close()
        
        //data = data.filter(job => Number(job.id) !== Number(id))//quando é verdadeiro ele mantem se for false, ele tira do array e devolve só o array com os true. Ele filtra de acordo com a função e devolve o array filtrado. ISSO é só pra entender o filter, pois não usamos ele, pois agora estamos usando o banco de dados
    },

    async create(newJob){
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }
}