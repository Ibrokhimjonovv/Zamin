import { URL } from "./fetchdata";


export function PostDataCreative(endpoint, data, token) {
    return fetch(`${URL + endpoint}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function PutDataCreative(endpoint, data, token) {
    return fetch(`${URL + endpoint}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}
export function PatchDataCreative(endpoint, data, token) {
    return fetch(`${URL + endpoint}`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function GetDataCreative(endpoint, token) {
    return fetch(`${URL + endpoint}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    });
}
