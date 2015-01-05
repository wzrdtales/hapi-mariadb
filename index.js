
exports.register = function(plugin, options, next) {
  

  if( options.useTransact )
  {
    var mariasql_trans = require("mariadb-transact");
    plugin.expose('pool', new mariasql_trans( options.connectionCount ) );
  }
  else
  {
    var mariasql = require('my_pool_sql');
    plugin.expose('pool', new mariasql_pool( options.connectionCount, options.mariasql ) );
  }
  
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
