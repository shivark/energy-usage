const sqlite3 = require('sqlite3').verbose();
const sampleData = require('./sample-data.json');

let connection = null;
const CREATE_METER_TABLE_QUERY = 'CREATE TABLE meter_reads (cumulative INTEGER, reading_date TEXT, unit TEXT)';
const INSERT_METER_TABLE_QUERY = 'INSERT INTO meter_reads (cumulative, reading_date, unit) VALUES (?, ?, ?)';
const SQLITE_CONNECTION_MESSAGE = 'Connected to the in-memory SQlite database.';

const init = (connection) => {
  connection.serialize(() => {
    connection.run(CREATE_METER_TABLE_QUERY);
    const { electricity } = sampleData;
    electricity.forEach((data) => {
      connection.run(
        INSERT_METER_TABLE_QUERY,
        [data.cumulative, data.readingDate, data.unit],
      );
    });
  });
};

const createConnection = () => new sqlite3.Database(process.env.DATABASE_NAME, sqlite3.OPEN_READWRITE, connectionError);
const connectionError = err => (err ? console.error(err.message) : console.log(SQLITE_CONNECTION_MESSAGE));

module.exports = {
  get connection() {
    return connection || (connection = createConnection());
  },
  init,
};