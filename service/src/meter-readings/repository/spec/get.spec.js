const proxyquire = require('proxyquire');

describe('meter reading repository', () => {
  describe('get', () => {
    it('should get data from database', async () => {
      const expected = [{ data: 'data' }];
      const mockDb = {
        connection: {
          all: (q, cb) => setTimeout(() => cb(null, expected)),
        },
      };
      const target = proxyquire('./../get.js', { './../../database': mockDb });
      const actual = await target();

      expect(actual).toBeDefined('data is not defined');
      expect(actual).toEqual(expected);
    });

    it('should reject when there is an error', async () => {
      const mockDb = {
        connection: {
          all: (q, cb) => setTimeout(() => cb({ message: 'Hello' }, null)),
        },
      };
      const target = proxyquire('./../get.js', { './../../database': mockDb });

      try {
        await target();
      } catch (err) {
        expect(err).toBeTruthy('error message is empty');
      }
    });
  });
});