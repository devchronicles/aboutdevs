import * as express from "express";

export function redirectToHome(res: express.Response): void {
    res.redirect("/");
}
export function redirectToProfileEdit(res: express.Response): void {
    res.redirect("/config/edituserprofile");
}
