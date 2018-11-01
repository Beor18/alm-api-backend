# Almundo Server

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


#### Rutas de la Api (utilizar postman)


```js
/api/hoteles(GET)
/api/hotel/agregar (POST)
/api/hotel/ver/:id (GET)
/api/hotel/modificar/:id (POST)
/api/hotel/delete/:id (DELETE)
```

#### Modelo Hotel

```js
name: { type: String },
stars: { type: Array },
image: { type: String },
price: { type: Number},
amenities: { type: Array }
```