import express from 'express';
import { authenticate, getDeviceLocation } from '../controllers/LocationController.js';
import { createSubscriptionEntered } from '../controllers/FetchingController.js';
const router = express.Router();


router.post('/real-location', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const accessToken = await authenticate();
        const locationData = await getDeviceLocation(accessToken, phoneNumber);

        // Retourne les données au client (navigateur)
        res.status(200).send(`
            <h1>Résultat de l'API :</h1>
            <pre>${JSON.stringify(locationData, null, 2)}</pre>
            <a href="/">Retour</a>
        `);
    } catch (error) {
        console.error('Erreur API :', error.message);
        res.status(500).send(`
            <h1>Erreur :</h1>
            <pre>${error.message || 'Erreur inconnue'}</pre>
            <a href="/">Retour</a>
        `);
    }
});

router.get('/test-location', async (req, res) => {
    try {
        const accessToken = await authenticate();
        const fixedPhoneNumber = '+33699901032';
        const locationData = await getDeviceLocation(accessToken, fixedPhoneNumber);

        res.status(200).json({
            message: 'Location retrieved successfully.',
            data: locationData,
        });
    } catch (error) {
        console.error('Error retrieving location route:', error.message);
        res.status(500).json({
            error: error.message || 'Internal Server Error',
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

        const subscriptionId = await createSubscriptionEntered(accessToken, {
            phoneNumber,
            latitude,
            longitude,
            radius
        });

        res.status(201).json({
            message: 'Abonnement Geofencing créé avec succès',
            subscriptionId,
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement Geofencing :', error.message);
        res.status(500).json({ error: error.message });
    }
});


export default router;
