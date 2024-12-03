import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let access_token = ''


async function getToken() {
    try {
        const response = await axios.post(
            'https://api.orange.com/oauth/v3/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        access_token = response.data.access_token;
        // console.log('Access Token:', response.data.access_token);
    } catch (error) {
        console.error('Error fetching token:', error.response.data);
    }
}

await getToken();


console.log(access_token)
