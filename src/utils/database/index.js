const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "projetoclienteservidor",
    password: ""
});

const fazerConsulta = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {fazerConsulta, con};