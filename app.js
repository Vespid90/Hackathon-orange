import express from 'express';
import locationRoutes from './routes/LocationRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:63342',
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', locationRoutes);


app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});