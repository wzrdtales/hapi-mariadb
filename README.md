hapi-mariasql
=================

This plugin is a collection of multiple plugins which are working together with [mariasql](https://www.npmjs.com/package/mariasql).

It enables you currently to register the following plugins:
 * [my_pool_sql](https://www.npmjs.com/package/my_pool_sql)
 * [mariadb-transact](https://www.npmjs.com/package/mariadb-transact)



Usage
-----

To use my_pool_sql you don't need to define anything, this is the default option. If you want to use mariadb-transact, you need to add the parameter `useTransact`.

For more Informations about the usage itself, please view the documentation of the projects listed and linked above.

### my_pool_sql

```js
var Hapi = require( 'hapi' );

var server = new Hapi.Server();
server.connection(
{
    port: 3000
} );

server.register(
{
    register: require( 'hapi-mariadb' ),
    options:
    {
        mariasql: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'password',
            db: 'database',
            multiStatements: true
        },
        connectionCount: 8
    }
}, function ( err ) {} );


server.route(
{
    method: 'GET',
    path: '/',
    handler: function ( request, reply )
    {
        var sql = request.server.plugins['hapi-mariadb'].pool;
        sql.query( 'SELECT * FROM table', function( err, result )
        {
            console.log( result );
        } );
        reply( 'Database test!' );
    }
} );

server.start( function ()
{
    console.log( 'Server running at:', server.info.uri );
} );
```

### mariadb-transact 

```js
var Hapi = require( 'hapi' );

var server = new Hapi.Server();
server.connection(
{
    port: 3000
} );

server.register(
{
    register: require( 'hapi-mariadb' ),
    options:
    {
        mariasql: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'password',
            db: 'database',
            multiStatements: true
            metadata: true
        },
        useTransact: true
    }
}, function ( err ) {} );


server.route(
{
    method: 'GET',
    path: '/',
    handler: function ( request, reply )
    {
        var sql = request.server.plugins[ 'hapi-mariadb' ].pool;

        transact.init().then( function ()
        {
            return transact.basic().then( function ( sql )
            {
                return sql.fetchArray( "SHOW DATABASES" ).then( function ( res )
                {
                    return console.log( res );
                } );
            } ).then( function ()
            {
                return transact.begin();
            } ).then( function ( sql )
            {
                return sql.command( "DELETE FROM mytable WHERE id=3" ).then( function ( res )
                {
                    console.log( res );
                    return sql.commit();
                } ).then( function ()
                {
                    return transact.close();
                } );
            } );
        } )[ "catch" ]( function ( err )
        {
            return console.error( err.stack );
        } );

        reply( 'Database test!' );
    }
} );

server.start( function ()
{
    console.log( 'Server running at:', server.info.uri );
} );
```

License
-------
MIT