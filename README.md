# Almundo Server

- Me hubiera gustado incoorporar las validaciones en el backend (carpeta validación)
- Reutilize un esquema que habia realizado para el backend lo pueden ver en [jwt-login](http://github.com/beor18/jwt-login) lo mismo para el frontend.

#### Cosas por mejorar y realizar:

- Modelo Hotel > [ACTUALIZADO AHORA SE GUARDA COMO NUMERO Y NO COMO ARRAY]
- Hacer el filtrado de busqueda en la api (solo backend) en el frontend esta realizado (menos el filtrado por estrellas). 

#### Objetivo profesional y personal:

Crecer profesionalmente y seguir aprendiendo en el día a día. ¡ Nunca paro de aprender !

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/es).

Setee variable de entorno de MongoDb:

```sh
$ export MONGODB_URL="mongodb://..."
$ ejemplo: export MONGODB_URL="mongodb://localhost:27017/examen-almundo
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

Testear Api Rest (En construcción):

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
```

#### Modelo Hotel

```js
name: { type: String },
stars: { type: Array },
image: { type: String },
price: { type: Number},
amenities: { type: Array }
```