import express, { Request, Response } from 'express';
import Order from '../../models/Order';

const router = express.Router();

// Fetch all orders or search by query parameters
router.get('/', async (req: Request, res: Response) => {
  const { orderNumber, date, time, value, product, note, status } = req.query;

  let query: any = {};
  if (orderNumber) query.orderNumber = new RegExp(orderNumber as string, 'i');
  if (date) query.date = new RegExp(date as string, 'i');
  if (time) query.time = new RegExp(time as string, 'i');
  if (value) query.value = value;
  if (product) query.product = new RegExp(product as string, 'i');
  if (note) query.note = new RegExp(note as string, 'i');
  if (status) query.status = new RegExp(status as string, 'i');

  try {
    const orders = await Order.find(query);
    if (!orders.length) {
      return res.status(404).json({ msg: 'No orders found' });
    }

    const totalValue = orders.reduce((acc, order) => acc + order.value, 0);

    res.json({
      orders,
      totalValue
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Insert a new order
router.post('/register', async (req: Request, res: Response) => {
  const { orderNumber, date, time, value, product, note, status } = req.body;

  try {
    const newOrder = new Order({
      orderNumber,
      date,
      time,
      value,
      product,
      note,
      status
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
