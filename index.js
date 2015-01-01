
exports.register = function(plugin, options, next) {
  var mariasql_pool = require('my_pool_sql');

  plugin.expose('pool', new mariasql_pool( options.connectionCount, options.mariasql ) );
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
