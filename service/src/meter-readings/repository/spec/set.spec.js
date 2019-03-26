const proxyquire = require('proxyquire');

fdescribe('meter reading repository', () => {
  describe('set', () => {
    const data = {
      cumulative: 19150,
      reading_date: '2017-11-04T00:00:00.000Z',
      unit: 'kWh',
    };

    it('should insert data to database', async () => {
      const mockDb = {
        connection: {
          run: (q, cb) => setTimeout(() => cb(null, 'some message')),
        },
      };
      const target = proxyquire('./../set.js', { './../../database': mockDb });
      const actual = await target(data);

      expect(actual).toBeTruthy();
    });

    it('should reject when there is an error', async () => {
      const mockDb = {
        connection: {
          run: (q, cb) => setTimeout(() => cb({ message: 'error' }, null)),
        },
      };
      const target = proxyquire('./../set.js', { './../../database': mockDb });

      try {
        await target(data);
      } catch (err) {
        expect(err).toBeTruthy('error message is empty');
      }
    });

    fit('should reject when the wrong data type has been passed', async () => {
      const data = {
        cumulative: 19150,
        reading_date: '2020-11-04T00:00:00.000Z',
        unit: 'kWh',
      };
      const mockDb = {
        connection: {
          run: (q, cb) => setTimeout(() => cb(null, 'some message')),
        },
      };
      const target = proxyquire('./../set.js', { './../../database': mockDb });

      const actual = await target(data);


      expect(actual).toBeFalsy();

      console.log('Actual ', actual);
      try {
        await target(data);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  });
});