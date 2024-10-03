import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'
import productRouter from './routes/productRoutes';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Instancia o app
const app = new Hono();

// Usar o middleware de CORS do Hono
// app.use('*', cors());
// app.use(
//   '*',
//   cors({
//     origin: process.env.ALLOWED_ORIGIN || '*',
//     allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
//     allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
//     exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
//     maxAge: 600,
//     credentials: true,
//   })
// );

const corsConfig = {
    origin: process.env.ALLOWED_ORIGIN || '',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH']
}

app.use(cors(corsConfig))
app.options("", cors(corsConfig))

app.get('/', (c) => c.text('Servidor EsayCart Modelo'));

app.route('/', productRouter);

// Servir a aplicação
// const port = process.env.PORT || 3000;
// try {
//     serve(app).listen(port, () => {
//         console.log(`Servidor rodando na porta: ${port}`);
//     });
// } catch (error) {
//     console.error('Erro ao iniciar servidor:', error);
// }

// export default app;

serve({
    fetch: app.fetch,
    port: 3001,
});