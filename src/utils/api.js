import { getItem } from './storage';

const onResponce = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))

class API {
    constructor({ url, token }) {
        this.url = url;
        this.token = `Bearer ${token}`;
    }

    async getAllProducts() {
        const res = await fetch(`${this.url}/products`, {
            headers: {
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }

    async getUserInfo() {
        const res = await fetch(`${this.url}/users/me`, {
            headers: {
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }

    async getAuthorReviewInfo(id) {
        const res = await fetch(`${this.url}/users/${id}`, {
            headers: {
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }

    async getProductInfo(id) {
        const res = await fetch(`${this.url}/products/${id}`, {
            headers: {
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }

    async updateUserInfo(updateUser) {
        const res = await fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: this.token,
            },
            body: JSON.stringify(updateUser),
        });
        return onResponce(res);
    }

    async search(serachQuery) {
        const res = await fetch(`${this.url}/products/search?query=${serachQuery}`, {
            headers: {
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }

    async changeLikeStatus(productId, isLike) {
        const res = await fetch(`${this.url}/products/likes/${productId}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization: this.token,
            },
        });
        return onResponce(res);
    }
}

const config = {
    url: 'https://api.react-learning.ru',
    token: getItem('token'),
};

export const api = new API(config);