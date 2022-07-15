import { Buffer } from 'buffer';

const baseUrl = 'https://api-m.sandbox.paypal.com'

export const paypalApi = {
    authorize: async (clientId, secretId) => {
        var myHeaders = new Headers();
        
        const token = Buffer.from(clientId + ':' + secretId).toString('base64')
        myHeaders.append("Authorization", "Basic " + token);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        urlencoded.append("ignoreCache", "true");
        urlencoded.append("return_authn_schemes", "true");
        urlencoded.append("return_client_metadata", "true");
        urlencoded.append("return_unconsented_scopes", "true");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const result = await fetch(`${baseUrl}/v1/oauth2/token`, requestOptions)
            // .then(response => response.json())
            // .catch(error => console.log('error', error));

        return result.json();
    }
}