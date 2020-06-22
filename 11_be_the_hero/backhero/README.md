# Semana OmniStack 11

## Knex

Query Builder: table('users').select('*').where()

```console
yarn add knex sqlite3

npx knex init
```
Npx apenas executa comando

## Migrations com Knex

Para criar migration

```console
npx knex migrate:make create_ongs
```

Para rodar migration

```console
npx knex migrate:latest 
```