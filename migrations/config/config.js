module.exports = {
  development: {
    username: 'root',
    password: 'secret',
    database: 'erp-server-rbac',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true,
    },
    define: {
      freezeTableName: true,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true,
    },
    define: {
      freezeTableName: true,
    },
  },
};
