// server.ts (exemplo de Express)
import 'zone.js/node';
import express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import bootstrap from './main.server';

function createApp() {
  const server = express();

  // Configura o engine de renderização Angular Universal:
  server.engine('html', ngExpressEngine({ bootstrap }));
  server.set('view engine', 'html');
  server.set('views', 'dist/atividades-turisticas-portugal/browser');

  // Rota default
  server.get('*', (req, res) => {
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
