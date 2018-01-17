import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as colors from "colors";
import * as passport from "passport";
import setupPassport from "./passport/setupPassport";
import apiRoute from "./routes/api";
import appRoute from "./routes/app";
import authRoute from "./routes/auth";
import * as favicon from "serve-favicon";
import * as throng from "throng";
import cookieSession = require("cookie-session");

const nodeEnv = process.env.NODE_ENV || "development";
const isDev = nodeEnv === "development";
const port = process.env.PORT || 4000;

const WORKERS = process.env.WEB_CONCURRENCY || 1;

function startServer() {
    const app = express();

    setupPassport(passport);

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(cookieSession({
        name: "session",
        keys: ["this is a very long key"],
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // delay
    app.use((req, res, next) => {
        setTimeout(next, 0);
    });

    // favicon
    app.use(favicon("public/favicon.ico"));

    // routes
    if (!isDev) {
        app.use("/static", express.static("dist/static"));
    }

    app.use("/a", authRoute);
    app.use("/api", apiRoute);
    app.use("", appRoute);

    app.listen(port, () => {
        /* tslint:disable */
        console.log(colors.green(`AboutDevs started. Port: ${port}. NODE_ENV: ${process.env.NODE_ENV}`));
        /* tslint-enable */
    });
}

throng({
    workers: WORKERS,
    start: startServer,
});
