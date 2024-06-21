import { getToken } from './auth_jwt/cookies';


export default function sendRequest({url, method, data}) {
    try {
        const accessToken = getToken('access_token');
        const refreshToken = getToken('access_token');

        console.log(accessToken);
        console.log(refreshToken);
    } catch {

    }
}
