# Almundo Server

[![Build Status](https://travis-ci.org/Beor18/alm-api-backend.svg?branch=master)](https://travis-ci.org/Beor18/alm-api-backend) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

- Reutilice un esquema que habia realizado para el backend lo pueden ver en [jwt-login](http://github.com/beor18/jwt-login) lo mismo para el frontend.

## Demo:

[Almundo-server Backend demo api v1](https://almundo-examen.herokuapp.com/api/v1/hoteles)

[Almundo-server Backend demo api v2 - con GraphQL](https://almundo-examen.herokuapp.com/api/v2/graphql)

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


#### Modificar .env-example y guardar como .env

```sh
MONGODB_URL=mongodb://localhost:27017/examen-almundo
SOCKET_URL_CORONA=https://TU-API-DEPLOYADA/api/v1/coronavirus
SOCKET_URL_CORONA_ARGENTINA=http://TU-API-DEPLOYADA/api/v1/coronavirus/argentina
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

#### Con Docker
```sh
$ docker-compose build && docker-compose up
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

#### Rutas de la Api (utilizar postman) v1:

```js
/api/v1/hoteles(GET)
/api/v1/hoteles/:id (GET)
/api/v1/hoteles (POST)
/api/v1/hoteles/:id (PUT)
/api/v1/hoteles/:id (DELETE)
/api/v1/hoteles/:id/habitaciones (POST)

/api/v1/coronavirus (GET)
/api/v1/coronavirus/argentina (GET) 
/api/v1/coronavirus/argentina/provincia (GET)
```

#### Rutas y query de la Api v2 con GraphQl:
```js
/api/v2/graphql
```

```js
{
  hoteles {
    id
    name
    description
  }
}
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

#### Modelo Total casos Coronavirus y noticia

```js
date: { type: String },
titulo: { type: String },
confirmados: { type: Number },
total_mundo: { type: Number },
recuperados: { type: Number },
fallecidos: { type: Number },
```

#### Modelo Mapa Argentina Coronavirus

```js
type: { type: String },
properties: {
  lugar: { type: String, required: true },
  municipalidad: { type: String, required: true },
  ciudad: { type: String, required: true },
  confirmados: { type: Number, require: true },
  fallecidos: { type: Number, require: true },
  recuperados: { type: Number, require: true },
},
geometry: {
  type: { type: String, enum: ['Point'] },
  coordinates: { type: [Number]}
}
```

#### Modelo Casos por Provincias

```js
provincia: { type: String, required: true },
municipalidad: { type: String, required: true },
ciudad: { type: String, required: true },
confirmados: { type: Number, require: true },
fallecidos: { type: Number, require: true },
recuperados: { type: Number, require: true },
```