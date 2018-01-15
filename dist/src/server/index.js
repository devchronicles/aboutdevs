"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const colors = require("colors");
const passport = require("passport");
const setupPassport_1 = require("./passport/setupPassport");
const api_1 = require("./routes/api");
const app_1 = require("./routes/app");
const auth_1 = require("./routes/auth");
const favicon = require("serve-favicon");
const cookieSession = require("cookie-session");
const nodeEnv = process.env.NODE_ENV || "development";
const isDev = nodeEnv === "development";
const port = process.env.PORT || 4000;
const app = express();
setupPassport_1.default(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieSession({
    name: "session",
    keys: ["this is a very long key"],
    maxAge: 365 * 24 * 60 * 60 * 1000,
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
app.use("/auth", auth_1.default);
app.use("/api", api_1.default);
app.use("", app_1.default);
app.listen(port, () => {
    /* tslint:disable */
    console.log(colors.green(`AboutDevs started. Port: ${port}. NODE_ENV: ${process.env.NODE_ENV}`));
    /* tslint-enable */
});
//# sourceMappingURL=index.js.map