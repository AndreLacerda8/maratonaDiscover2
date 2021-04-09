const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res){
        return res.render('job')
    },

    async save(req, res){
        await Job.create({
            name: req.body.name, //esse req.body pega os dados passados no formulario
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()//atribuindo uma nova data, a de agora, em milissegundos, desde 1 janeiro de 1970
        })
        return res.redirect('/')
    },

    async show(req, res){
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = req.params.id//esse params.id é para pegar o :id que passamos ali embaixo no routes.get

        const job = jobs.find(job => Number(job.id) === Number(jobId))//o find procura essa comparação e quando é true ele retorna

        if(!job){
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res){
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req, res){
        const jobId = req.params.id
        
        await Job.delete(jobId)

        return res.redirect('/')
    }
}