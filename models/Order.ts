import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  orderNumber: string;
  date: string;
  time: string;
  value: number;
  product: string;
  note: string;
  status: string;
}

const OrderSchema: Schema = new Schema({
  orderNumber: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  value: { type: Number, required: true },
  product: { type: String, required: true },
  note: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
