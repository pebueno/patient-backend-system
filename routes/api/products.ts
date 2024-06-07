import express, { Request, Response } from 'express';
import Product from '../../models/Product';

const router = express.Router();

// Create a new product
router.post('/', async (req: Request, res: Response) => {
  const { name, description, price, category, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
