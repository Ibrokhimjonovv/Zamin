import { setToken, removeToken } from './cookies';
import { URL } from '../hooks/fetchdata';



export const loginFunc = async (username, password) => {
    console.log(username, password);
    try {
        const response = await fetch(`${ URL }/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response);

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        const { access, refresh } = data;
        setToken('access_token', access);
        setToken('refresh_token', refresh, 14);
        return true;
    } catch (error) {
        console.error('Login failed a', error);

        return false;
    }
};

export const logout = () => {
    removeToken('access_token');
    removeToken('refresh_token');
};
