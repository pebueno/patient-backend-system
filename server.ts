import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db';

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => res.send('API is running...'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
