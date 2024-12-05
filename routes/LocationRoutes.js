import express from 'express';
import { authenticate, getDeviceLocation } from '../controllers/LocationController.js';

const router = express.Router();

router.post('/real-location', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ error: 'Numéro de téléphone requis' });
        }

        const accessToken = await authenticate();
        const locationData = await getDeviceLocation(accessToken, phoneNumber);

        res.status(200).json(locationData);
    } catch (error) {
        console.error('Erreur API:', error);
        res.status(500).json({
            error: error.message || 'Erreur interne du serveur'
        });
    }
});

export default router;