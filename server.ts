import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db";

import userRoutes from "./routes/api/users";
import patientsRoutes from "./routes/api/patients";
import anamnesesRoutes from "./routes/api/anamneses";
import anthropometryRoutes from "./routes/api/anthropometry";
import ordersRoutes from "./routes/api/orders";
import productsRoutes from "./routes/api/products";

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/anamneses", anamnesesRoutes);
app.use("/api/anthropometry", anthropometryRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
