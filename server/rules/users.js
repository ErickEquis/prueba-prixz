const regexp_email = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

function createUser(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.body.username || typeof req.body.username !== "string" || req.body.username.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el nombre de usuario"
        return json
    }
    if (!req.body.email || typeof req.body.email !== "string" || req.body.email.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el correo del usuario"
        return json
    }
    if (!regexp_email.test(req.body.email)) {
        json.codigo = 1
        json.mensaje = "Lo sentimos correo no valido"
        return json
    }
    if (!req.body.password || typeof req.body.password !== "string" || req.body.password.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesaria la contraseña del usuario"
        return json
    }

    return json
}

function login(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.body.username || typeof req.body.username !== "string" || req.body.username.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el nombre de usuario"
        return json
    }
    if (!req.body.password || typeof req.body.password !== "string" || req.body.password.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesaria la contraseña del usuario"
        return json
    }

    return json
}

function updateUser(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.params.id || typeof req.params.id !== "string") {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id de usuario"
        return json
    }
    if (!req.body.username || typeof req.body.username !== "string" || req.body.username.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el nombre de usuario"
        return json
    }
    if (!req.body.email || typeof req.body.email !== "string" || req.body.email.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el correo del usuario"
        return json
    }
    if (!regexp_email.test(req.body.email)) {
        json.codigo = 1
        json.mensaje = "Lo sentimos correo no valido"
        return json
    }

    return json
}

function deleteUser(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.params.id || typeof req.params.id !== "string") {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id de usuario"
        return json
    }

    return json
}

module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser
}