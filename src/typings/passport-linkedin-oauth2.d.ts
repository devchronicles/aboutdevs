declare module "passport-linkedin-oauth2" {

    import passport = require("passport");
    import express = require("express");

    interface OAuth2StrategyOption {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope: string[];
        state?: boolean;
    }

    class OAuth2Strategy implements passport.Strategy {
        name: string;

        constructor(options: OAuth2StrategyOption,
                    verify: (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => void);

        authenticate(req: express.Request, options?: OAuth2StrategyOption): void;
    }
}
