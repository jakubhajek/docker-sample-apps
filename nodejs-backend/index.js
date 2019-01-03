const os = require('os');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan(app.get('env') === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(compression());

app.get('/', (req, res) => {
  res.json({
    ...req.headers,
    hostname: os.hostname(),
    date: new Date().toISOString()
  });
});

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'UP' });
});

app.use((_req, res, _next) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
});

process.on('uncaughtException', err => {
  console.error(err.stack);
  process.exit(1);
});
