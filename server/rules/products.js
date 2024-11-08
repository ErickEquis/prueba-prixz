function createProduct(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.body.name || typeof req.body.name !== "string" || req.body.name.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el nombre del producto"
        return json
    }
    if (!req.body.description || typeof req.body.description !== "string" || req.body.description.length < 1) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesaria la descripcion del producto"
        return json
    }
    if (!req.body.price || typeof req.body.price !== "number" || req.body.price < 0) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el precio del producto"
        return json
    }

    return json
}

function updateProduct(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.params.id || typeof req.params.id !== "string") {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id del producto"
        return json
    }
    if (req.body.name) {
        if (typeof req.body.name !== "string" || req.body.name.length < 1) {
            json.codigo = 1
            json.mensaje = "Lo sentimos es necesario el nombre del producto"
            return json
        }
    }
    if (req.body.description) {
        if (typeof req.body.description !== "string" || req.body.description.length < 1) {
            json.codigo = 1
            json.mensaje = "Lo sentimos es necesario la descripcion del producto"
            return json
        }
    }
    if (req.body.price) {
        if (typeof req.body.price !== "number" || req.body.price < 0) {
            json.codigo = 1
            json.mensaje = "Lo sentimos es necesario el precio del producto"
            return json
        }
    }

    return json
}

function deleteProduct(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }

    if (!req.params.id || typeof req.params.id !== "string") {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id del producto"
        return json
    }

    return json
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
}