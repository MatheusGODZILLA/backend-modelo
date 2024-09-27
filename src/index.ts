import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import productRouter from './routes/productRoutes';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Instancia o app
const app = new Hono();

// Usar o middleware de CORS do Hono
app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    c.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if (c.req.method === 'OPTIONS') {
        return c.text('OK', 200);
    }

    await next();
});

app.get('/', (c) => {
  return c.text('Servidor EasyCart Modelo');
});

app.route('/', productRouter);

// Servir a aplicação
const port = process.env.PORT || 3000;
try {
    serve(app).listen(port, () => {
        console.log(`Servidor rodando na porta: ${port}`);
    });
} catch (error) {
    console.error('Erro ao iniciar servidor:', error);
}