const headers = {
    "Content-Type": "application/json"
}

const BASE_URL = 'https://api.react-learning.ru';

const onResponce = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

export const signup = async data => {
    const res = await fetch(`${BASE_URL}/signup`, {
        headers,
        body: JSON.stringify(data),
        method: 'POST'
    })
    return onResponce(res)
}

export const signin = async data => {
    const res = await fetch(`${BASE_URL}/signin`, {
        headers,
        body: JSON.stringify(data),
        method: 'POST'
    })
    return onResponce(res)
}

export const checkToken = async (token) => {
    const res = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });
    return onResponce(res);
};
