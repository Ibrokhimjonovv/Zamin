import Cookies from 'js-cookie';

export const setToken = (name, token, days=1) => {
    Cookies.set(name, token, { expires: days });
};

export const getToken = (name) => {
    return Cookies.get(name);
};

export const removeToken = (name) => {
    Cookies.remove(name);
};
