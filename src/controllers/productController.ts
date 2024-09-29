import { PrismaClient, Status } from '@prisma/client';
import { Context } from 'hono';

const prisma = new PrismaClient();

// Função para listar todos os produtos
export const getProducts = async (c: Context) => {
  try {
    const products = await prisma.product.findMany();
    return c.json(products);
  } catch (error) {
    return c.json({ error: 'Erro ao buscar produtos.' }, 500);
  }
};

// Função para buscar um produto por ID
export const getProductById = async (c: Context) => {
  const { id } = c.req.param();
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      return c.json({ error: 'Produto não encontrado.' }, 404);
    }
    return c.json(product);
  } catch (error) {
    return c.json({ error: 'Erro ao buscar produto.' }, 500);
  }
};

// Função para criar um novo produto
export const createProduct = async (c: Context) => {
  const formData = await c.req.parseBody();
  
  const { name, price, description, status, tag } = formData as { name: string, price: string, description: string, status: string, tag: string };
  const imageUrl = formData.image ? String(formData.image) : '';

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        status: status as Status,
        tag,
      },
    });
    return c.json(newProduct, 201);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return c.json({ error: 'Erro ao criar produto.' }, 500);
  }
};

// Função para atualizar um produto existente
export const updateProduct = async (c: Context) => {
  const { id } = c.req.param();
  const { name, price, description, imageUrl, status, tag } = await c.req.json();
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        description,
        imageUrl,
        status,
        tag,
      },
    });
    return c.json(updatedProduct);
  } catch (error) {
    return c.json({ error: 'Erro ao atualizar produto.' }, 500);
  }
};

// Função para deletar um produto
export const deleteProduct = async (c: Context) => {
  const { id } = c.req.param();
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    return c.json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    return c.json({ error: 'Erro ao deletar produto.' }, 500);
  }
};

// Função para listar todas as tags
export const getTags = async (c: Context) => {
  try {
    const tags = await prisma.product.findMany({
      select: {
        tag: true,
      },
      distinct: ['tag'],
    });

    const uniqueTags = tags.map(product => product.tag);

    return c.json(uniqueTags);
  } catch (error) {
    return c.json({ error: 'Erro ao buscar tags.' }, 500);
  }
};

// Função para buscar produtos por múltiplas tags
export const getProductsByTag = async (c: Context) => {
  const { tags } = c.req.query(); // Recebe as tags como query parameter (exemplo: ?tags=tag1,tag2)

  try {
    const tagsArray = tags.split(','); // Converte a string de tags em um array
    const products = await prisma.product.findMany({
      where: {
        tag: {
          in: tagsArray, // Utiliza o operador "in" para buscar produtos com qualquer uma das tags
        },
      },
    });

    if (products.length === 0) {
      return c.json({ error: 'Nenhum produto encontrado para essas tags.' }, 404);
    }

    return c.json(products);
  } catch (error) {
    return c.json({ error: 'Erro ao buscar produtos.' }, 500);
  }
};