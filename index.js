import mongoose from 'mongoose';
import redis from 'redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import home from './app/api/home';
import auth from './app/api/auth/auth';
import bitcoin from './app/api/bitcoin/bitcoin';
import market from './app/api/bitcoin/market';
import bodyParser from 'body-parser';

export const app = express();

export const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

const url = "mongodb://localhost:27017/kriptovalute"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error: '));

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(session({
  secret: 'redis secret',
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
  saveUninitialized: false,
  resave: false
}));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);
app.use('/auth', auth);
app.use('/bitcoin', bitcoin);
app.use('/bitcoin/market', market);

const hostname = '127.0.0.1';
const port = 8080;

app.listen(port, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});
