import { readCookie } from "./cookie";
import { logout } from "./login";
const token = readCookie("token");

const callAPIWithGetMethod = async(pathURL, bearTokenFlg) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (bearTokenFlg) {
        myHeaders.append("Authorization", "Bearer " + token);
    } 
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let fetchResult;
    await fetch(process.env.REACT_APP_API_URL + pathURL, requestOptions)
        .then(response => {
            if (response.status === 401) logout();
            else if (response.ok) {
                return response.json();
            }

            throw Error(response.status);
        })
        .then(result => {
            fetchResult = result;
        })
        .catch((errorCode) => {
            if (errorCode === 401) {
                logout();
                console.log(10000)
            } else {
                fetchResult = { 'ok': false, 'errorCode': errorCode };
            }
        })

    return fetchResult;
}


const callAPIWithPostMethod = async(pathURL, data, bearTokenFlg) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (bearTokenFlg) {
        myHeaders.append("Authorization", "Bearer " + token);
    } 

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

  
    let fetchResult;
    await fetch(process.env.REACT_APP_API_URL + pathURL, requestOptions)
        .then(response => {
            if (response.status === 401) logout();
            else if (response.ok) {
                return response.json();
            }

            throw Error(response.status);
        })
        .then(result => {
            fetchResult = result;
        })
        .catch((errorCode) => {
            if (errorCode === 401) {
                logout();
            } else {
                fetchResult = { 'ok': false, 'errorCode': errorCode };
            }
        })

    return fetchResult;
}

export { callAPIWithGetMethod, callAPIWithPostMethod };