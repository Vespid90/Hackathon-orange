import express from 'express';
import { authenticate, getDeviceLocation } from '../controllers/LocationController.js';
import { createSubscriptionEntered, createSubscriptionLeft } from '../controllers/FetchingController.js';
const router = express.Router();

router.post('/real-location', async (req, res) => {
    try {
        // Extraction du numéro de téléphone
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

router.post('/geofencing', async (req, res) => {
    try {

        const { latitude, longitude, radius, phoneNumber } = req.body;

        if (!latitude || !longitude || !radius || !phoneNumber) {
            return res.status(400).json({ error: 'Veuillez fournir latitude, longitude, rayon et numéro de téléphone.' });
        }

        const accessToken = await authenticate();

        const subscriptionIdEnter = await createSubscriptionEntered(accessToken, {
            phoneNumber,
            latitude,
            longitude,
            radius
        });
        const subscriptionIdLeft = await createSubscriptionLeft(accessToken, {
            phoneNumber,
            latitude,
            longitude,
            radius
        });

        res.status(201).json({
            message: 'Abonnement Geofencing créé avec succès',
            subscriptionIdEnter, subscriptionIdLeft,
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement Geofencing :', error.message);
        res.status(500).json({ error: error.message });
    }
});


export default router;
