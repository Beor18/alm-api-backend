# Almundo Server

[![Build Status](https://travis-ci.org/Beor18/alm-api-backend.svg?branch=master)](https://travis-ci.org/Beor18/alm-api-backend)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

- Reutilice un esquema que habia realizado para el backend lo pueden ver en [jwt-login](http://github.com/beor18/jwt-login) lo mismo para el frontend.

## Demo:

[Almundo-server Backend demo](https://almundo-examen.herokuapp.com/api/hoteles)

#### Objetivo profesional y personal:

Crecer profesionalmente y seguir aprendiendo en el día a día. ¡ Nunca paro de aprender !

### Commits Messages

| etiqueta  | mensaje                       |
|-----------|-------------------------------|
| feat:     | "Un nuevo feature importante" |
| fix:      | "fixeado bug"                 |
| refactor: | "refactorización de código"   |
| docs:     | "documentación"               |

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Setee variable de entorno de MongoDb:

```sh
$ export MONGODB_URL="mongodb://..."
$ ejemplo: export MONGODB_URL="mongodb://localhost:27017/examen-almundo"
```

Instalar las dependencias e iniciar:

```sh
$ npm install
```

En modo desarrollo

```sh
$ npm run dev
```

En modo produccion

```sh
$ npm start
```

En modo debug:

```sh
$ npm run debug
```

Lanzar nueva version:

```sh
$ npm run release
```

Testear Api Rest:

```sh
$ npm run dev
$ npm test
```


#### Ejemplo de agregar hotel mediante Postman y/o similar:

```
Field Name: name | value: ingrese titulo del hotel
Field Name: stars | value: 1 (ahora como numero)
Field Name: image | value: 6623490_6_b.jpg
Field Name: price | value: 1267.57
Field Name: amenities | value: business-center
Field Name: amenities | value: nightclub
```

#### Rutas de la Api (utilizar postman):

```js
/api/hoteles(GET)
/api/hoteles/:id (GET)
/api/hoteles (POST)
/api/hoteles/:id (PUT)
/api/hoteles/:id (DELETE)
/api/hoteles/:id/habitaciones (POST)
```

#### Modelo Hotel

```js
name: { type: String },
description: { type: String },
address: { type: String },
neighborhood: { type: String },
province: { type: String },
latitude: { type: String },
longitude: { type: String },
stars: { type: Number },
image: { type: String },
price: { type: Number},
discount: { type: Number },
phone: { type: String },
amenities: { type: Array },
rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
```

#### Modelo Habitaciones

```js
name: { type: String },
price: { type: Number },
description: { type: String },
availability: { type: Number },
image: { type: String },
amenities: { type: Array }
```