const request = require('request');

describe('usage report', () => {
  const base_url = 'http://localhost:3000/usage-report';
  const meter_readings_base_url = 'http://localhost:3000/meter-readings';

  let meterReadings = null;
  let response = null;
  let usageReports = null;

  beforeAll((done) => {
    request.get(base_url, (error, res, body) => {
      response = res;
      usageReports = JSON.parse(body);
      request.get(meter_readings_base_url, (error, res, body) => {
        meterReadings = JSON.parse(body);
        done();
      });
    });
  });

  describe('GET', () => {
    it('should return status code 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should return reports', () => {
      expect(usageReports).toBeTruthy();
    });

    it('should return usage report for meter readings except first mmonth', () => {
      expect(usageReports.length).toBe(meterReadings.length - 1);
    });

    it('should return report with month property and value', () => {
      expect(usageReports[0].month).toBeTruthy();
    });

    it('should return report usage property and value', () => {
      expect(usageReports[0].usage).toBeTruthy();
    });
  });
});