import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import bcrypt from 'bcrypt'
import path from 'path'
import ejs from 'ejs'
import http from 'http'
import flash from 'connect-flash';


import { Strategy as LocalStrategy } from 'passport-local'
import { Server, Socket } from 'socket.io'

import { router } from './routes/route'
import { User } from '@prisma/client'
import { FindUserByEmailFactory } from './factories/User/FindUserByEmailFactory'
import { FindUserByIdFactory } from './factories/User/FindUserByIdFactory'
import { route } from './routes/routenames'
import { SocketEvents } from './routes/socket-events'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000} // 24h -> 1d
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (email: string, password: string, done: any) => {
    const user = await FindUserByEmailFactory().useCase.execute({
      email, options: { include: ['password'] }
    })

    if (!user) return done(null, false, { result: false, response: 'Usuário não encontrado' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return done(null, false, { result: false, response: 'Senha incorreta' });

    return done(null, user);
  })
);
passport.serializeUser<any, any>((user: User, done: any) => { done(null, user.id) });
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await FindUserByIdFactory().useCase.execute(id)

    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.route = route
  res.locals.messages = req.flash('message');
  next();
});

app.use(router)

export let shared_socket : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = undefined;
io.on('connection', async (socket) => {
  shared_socket = socket;
  new SocketEvents(socket)
});

const port = process.env.SERVER_PORT || 3000

server.listen(port, () => console.log(`server running on http://localhost:${port}`))

export { app }