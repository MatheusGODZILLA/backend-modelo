import { Hono } from 'hono';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getTags, getProductsByTag } from '../controllers/productController';

const productRouter = new Hono();

// Rota para listar todos os produtos
productRouter.get('/products', getProducts);

// Rota para buscar um produto por ID
productRouter.get('/products/:id', getProductById);

// Rota para criar um novo produto
productRouter.post('/products', createProduct);

// Rota para atualizar um produto existente
productRouter.put('/products/:id', updateProduct);

// Rota para deletar um produto
productRouter.delete('/products/:id', deleteProduct);

// Rota para listar todas as tags
productRouter.get('/tags', getTags);

// Rota para buscar produtos por tag
productRouter.get('/products/tag/:tag', getProductsByTag);

export default productRouter;