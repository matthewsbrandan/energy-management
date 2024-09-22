import express from 'express';
import passport from 'passport';
import { CreateUserFactory } from '../../factories/User/CreateUserFactory';

// --prefix: /auth
const authRouter = express.Router();

authRouter.post('/register', (req, res) => CreateUserFactory().handle(req,res));
authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) return res.status(500).json({
      result: false,
      response: err.message ?? 'Houve um erro ao lidar com o login'
    })

    if(!user) return res.status(500).json(info.message ? {
      result: false,
      response: info.message
    } : info)

    req.login(user, (err) => {
      if(err) return res.status(500).json({
        result: false,
        response: 'Houve um erro ao finalizar a autenticação'
      });

      return res.status(200).json({
        result: true,
        response: `Bem vindo(a) ${user.name}`
      });
    });
  })(req, res, next);
});
authRouter.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default authRouter;