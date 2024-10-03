import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';
import { cors } from 'hono/cors';
import productRouter from './routes/productRoutes';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração da API para o Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath('/api');

// Usar o middleware de CORS do Hono
app.use('*', cors());
app.use(
  '*',
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);

// Rotas
app.get('/', (c) => {
  return c.text('Servidor EasyCart Modelo');
});

// Usar o roteador de produtos
app.route('/', productRouter);

// Exportar o manipulador
export default handle(app);