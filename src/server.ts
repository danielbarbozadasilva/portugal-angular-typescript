import 'zone.js/node';
import express, { Request, Response } from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import bootstrap from './main.server';

function createApp() {
  const server = express();
  
  server.engine('html', ngExpressEngine({ bootstrap }));
  server.set('view engine', 'html');
  server.set('views', 'dist/atividades-turisticas-portugal/browser');

  server.get('*', (req: Request, res: Response) => {
    res.render('index', { req });
  });

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;
  const app = createApp();

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

run();
