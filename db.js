
const Pool = require('pg').Pool;
const { types } = require('pg');

// 1082 = OID du type DATE
types.setTypeParser(1082, (val) => val);


// this code will work and a table will be created if you have already created the "testWad" database.
const pool = new Pool({
    user: "postgres",
    password: "supramaroc", // Enter your password here
    database: "Hub", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        //await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


const createEventsTableQuery1 = `CREATE TABLE IF NOT EXISTS "Events" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(200) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date" DATE NOT NULL,
    "hour" VARCHAR(20) NOT NULL,
    "location" VARCHAR(200) NOT NULL
);
`;
execute(createEventsTableQuery1).then(result => {
  if (result) {
    //console.log("Table Events créée ou déjà existante.");
  }
});
const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "mail" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "Author" BOOLEAN DEFAULT false
);
`;

execute(createUsersTableQuery).then(result => {
  if (result) {
    //console.log("Table Users créée ou déjà existante.");
  }
});

module.exports = pool;