const proxyquire = require('proxyquire');
const data = require('./data.json');

describe('usage report', () => {
  let target = null;
  const mockValue = '12345';

  beforeEach(() => {
    target = proxyquire('./../usage-by-month.js', { './month-end-usage': () => mockValue });
  });

  it('should return an array with one entry per reading except for the first entry', () => {
    const actual = target(data.electricity);

    expect(actual).not.toBe(undefined);
    expect(actual.length).toEqual(data.electricity.length - 1);
  });

  it('should return an array of objects with the month set to the end of the month prior to the reading', () => {
    console.log(target(data.electricity));
    const [{ month: month1 }, { month: month2 }] = target(data.electricity);

    expect(month1).toEqual('2018-01');
    expect(month2).toEqual('2018-02');
  });

  it('should return an array of objects with the estimated usage set', () => {
    const [{ month: month1, usage: usage1 }, { month: month2, usage: usage2 }] = target(data.electricity);

    expect(usage1).toEqual(mockValue);
    expect(usage2).toEqual(mockValue);
  });
});