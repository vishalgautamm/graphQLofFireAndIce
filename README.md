A Song of Fire and Ice GraphQL Wrapper
=====================

A wrapper around [API of Fire and Ice](https://anapioficeandfire.com/) built using GraphQL.

Uses:

* [graphql-js](https://github.com/graphql/graphql-js) - a JavaScript GraphQL runtime.
* [express-graphql](https://github.com/graphql/express-graphql) - to provide HTTP access to GraphQL.
* [GraphiQL](https://github.com/graphql/graphiql) - for easy exploration of this GraphQL server.

Try it out at: [Game of Thrones GraphQL](https://us-central1-gotapi-78e21.cloudfunctions.net/graphql/)

## Getting Started

Install dependencies with

```sh
npm install
```

## API of Fire and Ice

The entire data is in `./data` folder.


## Local Server

A local express server is in `index.js`. It can be run with:

```sh
node index.js
```

A GraphiQL instance will be opened at http://localhost:3000/ (or similar; the actual port number will be printed to the console) to explore the API.
