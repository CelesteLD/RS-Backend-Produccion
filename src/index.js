import express from 'express';
import { router } from './Router/router.js';
import dotenv from 'dotenv';
import cors from 'cors';
import '../associations.js'; // Importa las asociaciones después de configurar la base de datos

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        'https://restaurantessolidarios.es', 
        'https://www.restaurantessolidarios.es', 
        'https://restaurantessolidarios.com', 
        'https://www.restaurantessolidarios.com',
        'https://restaurantessolidarios.org', 
        'https://www.restaurantessolidarios.org'
    ],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});