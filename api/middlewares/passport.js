const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel'); // Certifique-se de ajustar o caminho conforme necessário
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        console.log(email)
        const usuarioEmailExistente = await User.findOne({ email });

        if (!usuarioEmailExistente) {
            return done(null, false, { message: 'E-mail ou senha inválidos' });
        }

        const senhaCorreta = await bcrypt.compare(password, usuarioEmailExistente.password);
        if (!senhaCorreta) {
            return done(null, false, { message: 'E-mail ou senha inválidos' });
        }

        if (!usuarioEmailExistente.active) {
            return done(null, false, { message: 'Cadastro pendente de aprovação!' });
        }

        usuarioEmailExistente.password = undefined;
        return done(null, usuarioEmailExistente);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
