import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;




async function authenticate() {
    try {
        const response = await axios.post('https://api.orange.com/oauth/v3/token',
            'grant_type=client_credentials', // Correctly formatted form data
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Authentication error:', error.response?.data || error.message);
    }
}



// export async function createSubscriptionEntered(accessToken) {
//
//     const response = await axios.post('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated', {
//         protocol: 'HTTP',
//         sink: 'https://webhook.site/78b1911c-85cf-486d-87c0-45d7a8d0b9af',
//         types: ['org.camaraproject.geofencing-subscriptions.v0.area-entered'],
//         config: {
//             subscriptionDetail: {
//                 device: { phoneNumber: '+33699901032' },
//                 area: {
//                     areaType: 'CIRCLE',
//                     center: { latitude: '48.816', longitude: '2.305' },
//                     radius: 2000
//                 }
//             },
//             initialEvent: true,
//             subscriptionMaxEvents: 10,
//             subscriptionExpireTime: '2024-12-05T16:12:00.000Z'
//         }
//     }, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         }
//     });
//     return response.data.id;
// }
//
//
// export async function createSubscriptionLeft(accessToken) {
//     const response = await axios.post('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated', {
//         protocol: 'HTTP',
//         sink: 'https://webhook.site/78b1911c-85cf-486d-87c0-45d7a8d0b9af',
//         types: ['org.camaraproject.geofencing-subscriptions.v0.area-left'],
//         config: {
//             subscriptionDetail: {
//                 device: { phoneNumber: '+33699901032' },
//                 area: {
//                     areaType: 'CIRCLE',
//                     center: { latitude: 48, longitude: 2 },
//                     radius: 2000
//                 }
//             },
//             initialEvent: true,
//             subscriptionMaxEvents: 10,
//             subscriptionExpireTime: '2024-12-05T16:12:00.000Z'
//         }
//     }, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         }
//     });
//     return response.data.id;
// }

export async function createSubscriptionEntered(accessToken, { phoneNumber, latitude, longitude, radius }) {
    const response = await axios.post('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated', {
        protocol: 'HTTP',
        sink: 'https://webhook.site/faa5efd7-a481-4995-9290-1a813b52d7be',
        types: ['org.camaraproject.geofencing-subscriptions.v0.area-entered'],
        config: {
            subscriptionDetail: {
                device: { phoneNumber },
                area: {
                    areaType: 'CIRCLE',
                    center: { latitude, longitude },
                    radius,
                },
            },
            initialEvent: true,
            subscriptionMaxEvents: 10,
            subscriptionExpireTime: '2024-12-05T16:30:00.000Z',
        },
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data.id;
}

export async function createSubscriptionLeft(accessToken, { phoneNumber, latitude, longitude, radius }) {
    const response = await axios.post('https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/simulated', {
        protocol: 'HTTP',
        sink: 'https://webhook.site/faa5efd7-a481-4995-9290-1a813b52d7be',
        types: ['org.camaraproject.geofencing-subscriptions.v0.area-left'],
        config: {
            subscriptionDetail: {
                device: { phoneNumber },
                area: {
                    areaType: 'CIRCLE',
                    center: { latitude, longitude },
                    radius,
                },
            },
            initialEvent: true,
            subscriptionMaxEvents: 10,
            subscriptionExpireTime: '2024-12-05T16:30:00.000Z',
        },
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data.id;
}



async function getSubscription(accessToken) {
    const response = await axios.get(`https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data)
    return response.data;
}


async function deleteSubscription(accessToken, subscriptionId) {
    await axios.delete(`https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions/${subscriptionId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}



// // Usage
// (async () => {
//     const accessToken = await authenticate();
// //     const subscriptionId = await createSubscriptionEntered(accessToken);
// //     console.log('Subscription created with ID:', subscriptionId);
// //     const subscriptionId2 = await createSubscriptionLeft(accessToken);
// //
// await getSubscription(accessToken)
//
//     const getSub = await getSubscription(accessToken)
//     await getSub
// //
// //     await deleteSubscription(accessToken, subscriptionId);
// //     console.log('Subscription deleted');
// })();

