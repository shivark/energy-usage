const db = require('../../database');

const ERROR_MESSAGE = 'Error hapened while getting meter readings: ';
const QUERY = 'SELECT * FROM meter_reads';

module.exports = () =>
    new Promise((resolve, reject) =>
        db.connection.all(QUERY, (err, data) =>
            (err ? reject(ERROR_MESSAGE, err) : resolve(data))));