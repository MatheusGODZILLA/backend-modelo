import prisma from "../prisma/client";
import { Product } from "@prisma/client";

// Função para listar todos os produtos
export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

// Função para buscar um produto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

// Função para criar um novo produto
export const createProduct = async (data: Product): Promise<Product> => {
  return await prisma.product.create({
    data,
  });
};

// Função para atualizar um produto
export const updateProduct = async (id: number, data: Partial<Product>): Promise<Product | null> => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

// Função para deletar um produto
export const deleteProduct = async (id: number): Promise<Product | null> => {
  return await prisma.product.delete({
    where: { id },
  });
};