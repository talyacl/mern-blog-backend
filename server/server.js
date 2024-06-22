require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB();


app.get('/', (req, res) => {
    res.send('Hello from the Server!');
});



app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
