import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import colors from 'colors';
import passport from 'passport';
import setupPassport from './passport/setupPassport';
import authRoute from './routes/auth';
import apiRoute from './routes/api';
import appRoute from './routes/app';

const app = express();

setupPassport(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoute);
app.use('/api', apiRoute);
app.use('', appRoute);

app.listen(4000, '0.0.0.0', () => {
    console.log(colors.green(`IndieJobs started at http://localhost:4000/. NODE_ENV: ${process.env.NODE_ENV}`));
});
