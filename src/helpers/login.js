import { deleteAllCookies, deteletAllCookie, setCookie } from './cookie';

const urlParams = new URLSearchParams(window.location.search);
const tokenQuery = urlParams.get('token');

export const login = (token) => {
    deleteAllCookies();

    // const domain = process.env.COOKIE_DOMAIN;
    //const domain = 'localhost';
    const domain = process.env.REACT_APP_CLIENT_URL
    setCookie(365, token, 'token', domain);

    window.location.replace('/store-login');
};

export const logout = () => {
    // const domain = process.env.COOKIE_DOMAIN;
    //const domain = 'localhost'
    const domain = process.env.REACT_APP_CLIENT_URL
    deteletAllCookie(domain);
    
    window.location.replace('/login');
};