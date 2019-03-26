const db = require('./../../database');
const moment = require('moment');

const ERROR_MESSAGE = 'An error hapened while inserting data to meter readings: ';
const SUCCESS_MESSAGE = 'Inserted meter reading successfully.';
const WRONG_DATE_FORMAT = 'WRONG DATE FORMATE INSERTED';

module.exports = ({ cumulative, reading_date, unit }) => {

    return new Promise((resolve, reject) => {
        if (isDataValid(reading_date)) {
            console.log('insdie IF')
            db.connection.run(query`${cumulative} ${reading_date} ${unit}`, err =>
                (err ? reject(ERROR_MESSAGE, err) : resolve(SUCCESS_MESSAGE))
            );
        } else {
            console.log('insdie ELSE');
            reject(WRONG_DATE_FORMAT)
        }
    });
}

function isDataValid(date) {
    console.log('IS future', moment().isAfter(date));
    console.log('Date', date);
    return moment().isAfter(date);
}

const query = (_, cumulative, reading_date, unit) =>
    `INSERT INTO meter_reads VALUES (${cumulative},"${reading_date}", "${unit}")`;