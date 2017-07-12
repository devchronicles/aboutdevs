import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import cookieSession = require('cookie-session');
import * as colors from 'colors';
import * as passport from 'passport';
import setupPassport from './passport/setupPassport';
import apiRoute from './routes/api';
import appRoute from './routes/app';
import authRoute from './routes/auth';

const app = express();

setupPassport(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieSession({
    name: 'session',
    keys: ['this is a very long key'],
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
}));
app.use(passport.initialize());
app.use(passport.session());

// delay
app.use((req, res, next) => { setTimeout(next, 0); });

// routes
app.use('/auth', authRoute);
app.use('/api', apiRoute);
app.use('', appRoute);

app.listen(4000, '0.0.0.0', () => {
    /* tslint:disable */
    console.log(colors.green(`IndieJobs started at http://localhost:4000/. NODE_ENV: ${process.env.NODE_ENV}`));
    /* tslint-enable */
});

export default app; // for testing
