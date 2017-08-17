exports.register = function(plugin, options, next) {
  if (options.useTransact) {
    var mariasql_trans = require("mariadb-transact");
    plugin.expose("pool", new mariasql_trans(options.connectionCount));
  } else if (options.poolAsPromised) {
    options.pool = options.pool || "my_pool_sql";
    var mariasql_pool = require(options.pool);
    var pool = new mariasql_pool(options.connectionCount, options.mariasql);
    var Promise = require("bluebird");
    Promise.promisifyAll(pool);

    plugin.expose("pool", pool);
  } else {
    options.pool = options.pool || "my_pool_sql";
    var mariasql_pool = require(options.pool);
    plugin.expose(
      "pool",
      new mariasql_pool(options.connectionCount, options.mariasql)
    );
  }

  next();
};

exports.register.attributes = {
  pkg: require("./package.json")
};
