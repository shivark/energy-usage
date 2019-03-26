const docs = require('koa-docs');

const doc = () => docs.get('/docs', {
  title: 'Bulb energey usage API.',
  version: '1.0.0',
  theme: 'simplex',
  routeHandlers: 'disabled',
  groups: [
    {
      groupName: 'Meter readings',
      routes: [
        { method: 'GET', path: '/meter-readings', meta: { friendlyName: 'Get meter readings' } },
        {
          method: 'POST',
          path: '/meter-readings',
          meta:
                        {
                          friendlyName: 'Add meter reading',
                          description: 'To insert a new meter reading, use Postman or Fiddler. In the request body add meter readings in json as below:',
                          extendedDescription:
                                '```'
                                + '{"cumulative": 123456,"reading_date": "2017-09-10T00:00:00.000Z","unit": "kwt"}'
                                + '```',
                        },
        },
      ],
    },

    { groupName: 'Usage reports', routes: [{ method: 'GET', path: '/usage-report', meta: { friendlyName: 'Get usage reports' } }] },
  ],
});

module.exports = doc;