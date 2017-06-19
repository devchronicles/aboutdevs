import * as express from 'express';

export function redirectToHome(res: express.Response) {
    res.redirect('/');
}
export function redirectToProfileEdit(res: express.Response) {
    res.redirect('/config/edituserprofile');
}
