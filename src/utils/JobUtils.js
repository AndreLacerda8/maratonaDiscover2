module.exports = {
    remainingDays(job){
        //calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()//quando tem só o toFixed() sem argumento ele deixa sem casas decimais e arredondado.
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)//aqui setamos o dia de vencimento, pegando o dia que o projeto foi criado + o tanto de dias para finalizar
        const dueDate = createdDate.setDate(dueDay)
    
        const timeDiffInMs = dueDate - Date.now()//isso tudo esta em milissegundos
    
        //Transformar milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}