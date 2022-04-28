const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// middleware

const http = require('http').Server(app, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors())

app.use(helmet());
app.use(compression());


const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')

app.use('/api/post', postRoute)
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 5000;

const db = require('./models')

db.sequelize.sync().then(() => {
    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
});