const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const router = require('./server/routers');

app.prepare().then(() => {
  const server = express();

  server.use(express.json());       // to support JSON-encoded bodies
  server.use(express.urlencoded({ extended: true }));

  server.use('/api', router);

  server.all('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
})