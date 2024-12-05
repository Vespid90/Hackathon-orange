import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export async function authenticate() {
    try {
        const response = await axios.post('https://api.orange.com/oauth/v3/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Erreur d\'authentification:', error.response?.data || error.message);
        throw error;
    }
}

export async function getDeviceLocation(accessToken, phoneNumber) {
    try {
        const response = await axios.post(
            'https://api.orange.com/camara/location-retrieval/orange-lab/v0/retrieve',
            {
                device: { phoneNumber }
                // maxAge: 60 //-> ne pas mettre si num tel offline (erreur 422)
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Cache-Control': 'no-cache',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data?.area?.center) {
            throw new Error('Coordonnées non disponibles');
        }

        return response.data.area.center;
    } catch (error) {
        console.error('Erreur de récupération de localisation:', error.response?.data || error.message);
        throw error;
    }
}