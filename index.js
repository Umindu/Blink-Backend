require('dotenv').config();
const express = require('express');
const router = require('./src/routes/_index.routes');
const connectDB = require('./src/db/connect');

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(express.json());
connectDB();

app.get('/test', (req, res) => {
  res.json({ message: 'Test ok' });
});

app.use('/api/v1/', router);

app.listen(SERVER_PORT, () => console.log('Server is listening on port '+SERVER_PORT));

