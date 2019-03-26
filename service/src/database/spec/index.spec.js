const data = require('./../index');
const sampleData = require('../sample-data.json');

describe('database', () => {
  it('init should import the data from the sampleData file', (done) => {
    data.init(data.connection);

    console.log('data.connection', data.connection);

    data.connection.serialize(() => {
      data.connection.all('SELECT * FROM meter_reads ORDER BY cumulative', (error, selectResult) => {
        expect(error).toBe(null);
        expect(selectResult.length).toBe(sampleData.electricity.length);
        selectResult.forEach((row, index) => {
          expect(row.cumulative).toEqual(sampleData.electricity[index].cumulative);
        });
        done();
      });
    });
  });
});