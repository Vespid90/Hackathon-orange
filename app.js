import express from 'express';
import locationRoutes from './routes/LocationRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

app.use(express.json());


// Configuration pour gérer JSON et formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers HTML et assets statiques
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes
app.use('/api', locationRoutes);

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});