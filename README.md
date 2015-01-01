hapi-mariasql
=================

Registers the wrapped ([my_pool_sql](https://www.npmjs.com/package/my_pool_sql)) [mariasql](https://www.npmjs.com/package/mariasql) connector as a plugin.  

Usage
-----
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

License
-------
MIT