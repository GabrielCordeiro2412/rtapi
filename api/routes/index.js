const bodyParser = require('body-parser')
const instituicao = require('../routes/InstituicaoRoutes')
const plano = require('../routes/PlanoRoutes')
const materia = require('../routes/MateriaRoutes')
const turma = require('../routes/TurmaRoutes')
const rewards = require('../routes/RewardsRoutes')
const usuario = require('../routes/UserRoutes')
const userRewards = require('../routes/UserRewardsRoutes')
const turmaMateria = require('../routes/TurmaMateriaRoutes')
const pergunta = require('../routes/PerguntaRoutes')
const feedback = require('../routes/FeedbackRoutes')

module.exports = app => {
    app.use(bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    instituicao,
    plano,
    materia,
    turma,
    rewards,
    usuario,
    userRewards,
    turmaMateria,
    pergunta,
    feedback
    );
}