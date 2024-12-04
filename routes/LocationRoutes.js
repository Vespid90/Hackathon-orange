import express from 'express';
import { authenticate, getDeviceLocation } from '../controllers/LocationController.js';

const router = express.Router();


router.post('/real-location', async (req, res) => {
    try {
        // Extraction du numéro de téléphone
        const { phoneNumber } = req.body;

        // Appel au contrôleur pour utiliser Axios
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


//méthode GET pour les tests
// router.get('/test-location', async (req, res) => {
//     try {
//         const accessToken = await authenticate();
//         const fixedPhoneNumber = '+33699901032';
//         const locationData = await getDeviceLocation(accessToken, fixedPhoneNumber);
//
//         res.status(200).json({
//             message: 'Location retrieved successfully.',
//             data: locationData,
//         });
//     } catch (error) {
//         console.error('Error retrieving location route:', error.message);
//         res.status(500).json({
//             error: error.message || 'Internal Server Error',
//         });
//     }
// });


export default router;
