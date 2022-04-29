import { deleteAllCookies, deteletAllCookie, setCookie } from './cookie';

const urlParams = new URLSearchParams(window.location.search);
const tokenQuery = urlParams.get('token');

export const login = (token) => {
    deleteAllCookies();

    // const domain = process.env.COOKIE_DOMAIN;
    const domain = 'localhost';

    setCookie(365, token, 'token', domain);

    window.location.replace('/store-login');
};

export const logout = () => {
    // const domain = process.env.COOKIE_DOMAIN;
    const domain = 'localhost'

    deteletAllCookie(domain);
    
    window.location.replace('/login');
};