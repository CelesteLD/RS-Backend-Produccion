import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config( {
    path: path.join(__dirname, '../../.env')
});

export const env = (variable) => {
    return process.env[variable];
}
 
