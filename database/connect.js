const mariadb = require("mysql");

const pool = mariadb.createPool({
  host: "mohmind015.cafe24.com",
  port: 3306,
  user: "mohmind015",
  password: "GQLT6xJ^8sVzn6d",
  database: "mohmind015",
  connectionLimit: 5,
  multipleStatements: true,
    typeCast: function (field, next) {
        if (field.type == 'VAR_STRING') {
            return field.string();
        }
        return next();
    }

});

module.exports = pool;
