/**
 * server.ts - Responsável por subir o servidor Node que servirá
 * sua aplicação Angular SSR + eventuais APIs REST no front.
 */
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.APP_NODE_ENV === 'development' ? '.env.test' : '.env',
});

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../atividades-turisticas-portugal');

// Cria a instância do Express
const app = express();

// Cria a instância do Angular SSR Engine
const angularApp = new AngularNodeAppEngine();

app.get('/v1/auth/check-token', (res: Response) : any => {
  console.log(res.status);
});

// Serve arquivos estáticos da pasta ../browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Para qualquer outra rota, delega para o Angular SSR
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Se este arquivo for executado diretamente (node server.ts),
 * inicia servidor na porta process.env.PORT ou 4000
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.warn(`Angular SSR server rodando em http://localhost:${port}`);
  });
}

// Exporta o request handler para uso em dev-server ou funções serverless
export const reqHandler = createNodeRequestHandler(app);
