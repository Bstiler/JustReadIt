// import Readability from 'mozilla-readability';
import {JSDOM} from 'jsdom';
import express from 'express';
import bodyParser from 'body-parser';
const Readability = require('readability');

/**
 * Cleans a HTML string
 * @param {string} source - A string with the HTML code.
 */
function cleanHTML (source: string): string {
    const DOM = (new JSDOM(source)).window.document;
    const parser = new Readability(DOM);
    const article = parser.parse();
    return article?.content ?? (() => {throw new Error('Invalid Content')})()
}

/**
 * This express handler parses HTML text and returns the clean version.
 * @param req - Express Request object
 * @param res - Express Response object
 */
function cleanHTMLhandler (req: express.Request, res: express.Response) {
    const rawText = req.body;
    const cleanText = cleanHTML(rawText);
    res.type('html')
        .status(200)
        .send(cleanText);
}

/**
 * A function to parse most of the possible errors.
 * @param err - The error ocurred
 * @param req - Express request object
 * @param res - express response object
 */
function errorHandler (err: {status: number, type: string}, req: express.Request, res: express.Response) {
    const status = err.status ?? 400;
    const type = err.type ?? 'Unknown Error';
    res.status(status)
        .send(`${type}\nRequest Body:\n${String(req.body)}`);
}

export const rawTextRouter = express.Router()

rawTextRouter.use('/text/html', bodyParser.text({ type: 'text/html' }));
rawTextRouter.route('/text/html')
    .post(cleanHTMLhandler, errorHandler);

export default { rawTextRouter };