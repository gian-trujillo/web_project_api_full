import { getToken } from './tokens'

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _makeRequest(endpoint, options = {}) {
    const token = getToken();

    return fetch(`${this._url}${endpoint}`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      ...options
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserData() {
    return this._makeRequest('/users/me', {
      headers: {
        ...this._headers,
        Accept: "application/json",
      },
    });
  }

  getCards(abortSignal) {
    return this._makeRequest('/cards', { signal: abortSignal });
  }

  getCompleteData(jwt) {
    return Promise.all([this.getUserData(jwt), this.getCards()]);
  }

  updateUserInfo(newUserName, newUserJob) {
    return this._makeRequest('/users/me', {
      method: "PATCH",
      body: JSON.stringify({
        name: newUserName,
        about: newUserJob,
      }),
    });
  }

  updateUserAvatar(link) {
    return this._makeRequest('/users/me/avatar', {
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  sendCardData(name, link) {
    return this._makeRequest('/cards', {
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardID) {
    return this._makeRequest(`/cards/${cardID}`, {
      method: "DELETE",
    });
  }

  toggleLike(cardID, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._makeRequest(`/cards/${cardID}/likes`, {
      method: method,
    });
  }
}

export const api = new Api({
  url: "http://api.projectarounddomain.mooo.com",
  headers: {
    "Content-Type": "application/json",
  },
});
