export const URL = "http://edurent.uz";

export function PostData(endpoint, data, token) {
    return fetch(`${URL + endpoint}?f   ormat=json`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        return res.json();
    });
}


export function PutData(endpoint, data, token) {
    return fetch(`${URL + endpoint}?format=json`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function PatchData(endpoint, data, token) {
    return fetch(`${URL + endpoint}?format=json`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export function GetData(endpoint, token) {
    return fetch(`${URL + endpoint}?format=json`, {
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
