const request = require('request');

describe('meter readings', () => {
  const base_url = 'http://localhost:3000/meter-readings';

  describe('GET', () => {
    let response = null;
    let readings = null;

    beforeAll((done) => {
      request.get(base_url, (error, res, body) => {
        response = res;
        readings = JSON.parse(body);
        done();
      });
    });

    it('should return status code 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should return meter readings', () => {
      expect(readings).toBeTruthy();
      expect(readings.length).toBeGreaterThan(1);
    });

    it('should return meter readings with cumulative property and value', () => {
      expect(readings[0].cumulative).toBeTruthy();
    });

    it('should return meter readings with reading-date property and value', () => {
      expect(readings[0].reading_date).toBeTruthy();
    });

    it('should return meter readings with unit property and value', () => {
      expect(readings[0].unit).toBeTruthy();
    });
  });

  describe('SET', () => {
    let postResponse = null;
    let meterReadings = null;
    let initalNumberOfReadings = 0;
    const newMeterReading = {
      cumulative: 1,
      reading_date: '2017-09-10T00:00:00.000Z',
      unit: 'e2eTest',
    };

    beforeAll((done) => {
      request.get(base_url, (error, response, body) => {
        initalNumberOfReadings = JSON.parse(body).length;

        request.post(base_url, { json: true, body: newMeterReading }, (error, response, body) => {
          postResponse = response;

          request.get(base_url, (error, response, body) => {
            meterReadings = JSON.parse(body);
            done();
          });
        });
      });
    });

    it('should return status code 200', () => {
      expect(postResponse.statusCode).toBe(200);
    });

    it('should increase number of meter readings', () => {
      expect(meterReadings.length).toBe(initalNumberOfReadings + 1);
    });

    it('should insert data correctly', () => {
      expect(meterReadings[meterReadings.length - 1]).toEqual(jasmine.objectContaining(newMeterReading));
    });
  });
});