# Prueba técnica | Desarrollador Node.js | Prixz

## Descripción

Backend para gestionar productos y usuarios. Permite crear, editar, eliminar y visualizar productos, así como registrar y autenticar usuarios.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Ejecutar la aplicación](#ejecutar-la-aplicacion)
- [Endpoints y payloads de la API](#endpoints-y-payloads-de-la-api)
- [Usuarios](#usuarios)
- [Productos](#productos)


## Instalación

### Prerrequisitos
- Node.js (v20.x o superior)
- npm (v10.x o superior)
- SQLite3

### Paso a paso

1. Clona el repositorio
   ```bash
   git clone https://github.com/ErickEquis/prueba-prixz.git
   cd prueba-prixz
   ```

2. Instala las dependencias
    ```bash 
    npm install
    ```

## Ejecutar la aplicación

Para iniciar la aplicación en modo de desarrollo, usa:
    npm start

La aplicación estará disponible en http://localhost:8880

## Endpoints y payloads de la API

## Usuarios
### POST /api/users
#### Crea un nuevo usuario

Payload
```bash
{
    "username": "Usuario1",
    "password": "1234567890",
    "email": "Usuario1@correo.com"
}
```

#### Respuesta

```bash
{
    "message": "Usuario registrado con éxito"
}
```

### POST /api/login
#### Inicia sesion con un usuario

Payload
```bash
{
    "username": "Usuario1",
    "password": "1234567890"
}
```

#### Respuesta

```bash
{
    "token": "xxxxxxxxxxxxxx"
}
```

### GET /api/users
#### Obtiene una lista de todos los usuarios registrados
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{}
```

#### Respuesta

```bash
    [
        {
            "id": 1,
            "username": "Usuario1",
            "password": "XXXXXXXXXXXXXX",
            "email": "usuario1@correo.com",
            "createdAt": "2024-11-08 18:07:16.674 +00:00",
            "updatedAt": "2024-11-08 18:07:16.674 +00:00"
        },
        {
            "id": 2,
            "username": "Usuario2",
            "password": "XXXXXXXXXXXXXX",
            "email": "usuario2@correo.com",
            "createdAt": "2024-11-08 18:07:16.674 +00:00",
            "updatedAt": "2024-11-08 18:07:16.674 +00:00"
        }
    ]
```

### PUT /api/users/:id
#### Actualiza a un usuario mediante su id (los campos son opcionales)
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{
    "username": "Usuario1",
    "email": "usuario1@correo.com"
}
```

#### Respuesta

```bash
    {
        "message": "Usuario actualizado con éxito"
    }
```

### DELETE /api/users/:id
#### Elimina a un usuario junto con sus productos asociados
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{}
```

#### Respuesta

```bash
    {
        "message": "Usuario eliminado con éxito"
    }
```
## Productos

### GET /api/products
#### Obtiene la lista de los productos del usuario autenticado
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{}
```

#### Respuesta

```bash
[
    {
        "id": 2,
        "userId": 1,
        "name": "Producto1",
        "description": "Producto1",
        "price": 2.5,
        "createdAt": "2024-11-08 18:11:06.272 +00:00",
        "updatedAt": "2024-11-08 18:11:06.272 +00:00"
    },
    {
        "id": 3,
        "userId": 1,
        "name": "Producto2",
        "description": "Producto2",
        "price": 2.5,
        "createdAt": "2024-11-08 18:11:12.296 +00:00",
        "updatedAt": "2024-11-08 18:11:12.296 +00:00"
    },
    {
        "id": 4,
        "userId": 1,
        "name": "Producto3",
        "description": "Producto3",
        "price": 2.5,
        "createdAt": "2024-11-08 18:11:13.264 +00:00",
        "updatedAt": "2024-11-08 18:11:13.264 +00:00"
    }
]
```

### POST /api/products
#### Crea un nuevo producto y lo asocia al usuario autenticado
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{
    "name": "Producto5",
    "description": "Producto5",
    "price": 2.5
}
```

#### Respuesta

```bash
{
    "message": "Producto creado con éxito, productId: 5"
}
```

### PUT /api/products/:id
#### Actualiza un producto y asociado al usuario autenticado (los campos son opcionales)
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{
    "name": "Producto5",
    "description": "Producto5",
    "price": 3
}
```

#### Respuesta

```bash
{
    "message": "Producto creado con éxito, productId: 5"
}
```

### DELETE /api/products/:id
#### Elimina un producto asociado al usuario autenticado
##### Debe enviarse token dentro de headers

```bash
"Authorization": "token"
```

Payload
```bash
{}
```

#### Respuesta

```bash
{
    "message": "Producto eliminado con éxito"
}
```

