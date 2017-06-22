import * as express from 'express';

export default function(req: express.Request, res: express.Response, next: () => any) {
    setTimeout(next, 1000);
}
