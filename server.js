const express = require('express');
const morgan = require('morgan');
const moment = require('moment');

/**
 * winston configure to support transport logstash and console
 */
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');
 
const esTransportOpts = {
  level: 'info'
};

// winston.add(winston.transports.Elasticsearch, esTransportOpts);

const logger = new winston.Logger({
  transports: [
    new Elasticsearch(esTransportOpts),
    new winston.transports.Console
  ]
});

const app = express();

app.use(morgan('dev'));

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

app.get('/info', async (req, res) => {
  logger.info('User request GET /test');

  await sleep(100);
  res.status(200).json({ resp: true });
});

app.get('/error', async (req, res) => {
  logger.error(new Error('error app'));

  await sleep(100);
  res.status(200).json({ resp: true });
});

app.listen(8080, () => {
  logger.info('App listen on port 8080');
});
