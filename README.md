# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```bash
docker-compose up -d
```

- El -d significa **detached**

- MongoDB URL Local:

```bash
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.dev** a **.env** y llenar las variables

## Llenar la base de datos con información de pruebas

Llamará:

```
http://localhost:3000/api/seed
```
