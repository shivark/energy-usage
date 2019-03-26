const target = require('./../month-end-usage');

describe('monthEndUsage', () => {
  it('should return an estimate for the month end usage', () => {
    const data = {
      r1: {
        cumulative: 25,
        reading_date: '2018-03-23T00:00:00.000Z',
        unit: 'kWh',
      },
      r2: {
        cumulative: 45,
        reading_date: '2018-04-07T00:00:00.000Z',
        unit: 'kWh',
      },
    };

    const actual = target(data);

    // c1 + (((c2 - c1) / diffInDays(t2, t1)) * daysToMonthEnd(t1));
    // should be (((c2 - c1) / (t2 - t1)) * (end of month - t1)) + c1
    // which is  25 + ((45 - 25) / (15 * 8))
    expect(actual.toFixed(2)).toEqual('35.67');
  });
});