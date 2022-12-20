import cors  from 'cors';
import express from 'express';
import morgan from'morgan';
require("dotenv").config();

import router from './api/routers/notification'

const bodyParser = require ('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

// Enable cors
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ type: 'application/json'}));

app.use('/api/notifications', router)
app.get('/api/', (req, res) => res.send('Welcome to Notification service'));
app.listen(port, () => {
  console.log(`Welcome to notification service running on port ${port}`);
});
