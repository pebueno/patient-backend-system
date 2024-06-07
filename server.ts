import express from 'express';
import bodyParser from 'body-parser';
//import passport from 'passport'; 
import connectDB from './db';

import userRoutes from './routes/api/users';
import patientsRoutes from './routes/api/patients';
/*
import nutritionistRoutes from './routes/api/nutritionists';
import retailRoutes from './routes/api/retail';
import anamnesesRoutes from './routes/api/anamneses';
import anthropometryRoutes from './routes/api/anthropometry';
*/
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize()); For future authentication strategies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientsRoutes);
/*
app.use('/api/nutritionists', nutritionistRoutes);
app.use('/api/retail', retailRoutes);
app.use('/api/anamneses', anamnesesRoutes);
app.use('/api/anthropometry', anthropometryRoutes);
*/

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
