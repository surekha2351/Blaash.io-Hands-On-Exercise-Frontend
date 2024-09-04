const fetch = require('node-fetch');

// The rest of your code remains the same...

async function getAllPlaylists() {
    const url = "https://5yiek6g5g0.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getAllPlayList";
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
        "X-Tenant-Key": "TYKE070323"
    };
    const body = JSON.stringify({ Content_Type: 2 });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the entire response
        return data;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        return null;
    }
}
getAllPlaylists();