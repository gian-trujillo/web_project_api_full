export const BASE_URL = "http://api.projectarounddomain.mooo.com"

export const signup = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else if (res.status === 400) {
            console.log(res);
            throw new Error("no se ha proporcionado uno o más campos");
        } else {
            throw new Error(`Error: ${res.status}`);
        }

    }).catch((err) => {
        console.log(err);   
    });
};

export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else if (res.status === 400) {
            throw new Error("uno de los campos se rellenó de forma incorrecta");
        }  else if (res.status === 401) {
            throw new Error("no se ha encontrado al usuario con el correo electrónico especificado");
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    }).catch((err) => {
        console.log(err);
    });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else if (res.status === 401) {
            throw new Error("token no válido");
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    }).catch((err) => {
        console.log(err);
    });
};