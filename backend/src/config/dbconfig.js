const { Client } = require("pg");

const client = new Client({
    user: 'admin', // admin
    host: 'localhost', // localhost
    database: 'db_ekspedisi', // db_ekspedisi
    password: '1234', // 12345
    port: 5432
});

// const client = new Client({
//     user: process.env.DB_USER, // admin
//     host: process.env.DB_SERVER, // localhost
//     database: process.env.DB_DATABASE, // db_ekspedisi
//     password: process.env.DB_PASSWORD, // 12345
//     port: Number(process.env.DB_PORT)
// });



// console.log(client)
client.connect()

module.exports = client;