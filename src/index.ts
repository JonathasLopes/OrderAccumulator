import express from 'express';
import cors from 'cors';
import endpoints from './endpoints';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api', endpoints);

global.limit = 1000000;

app.listen(process.env.PORT, () => console.log("Server running"));