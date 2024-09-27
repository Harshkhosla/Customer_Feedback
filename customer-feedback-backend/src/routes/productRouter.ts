import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ProductRouter = Router();

// Create a product
ProductRouter.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

// Get all products
ProductRouter.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
});

export default ProductRouter;
