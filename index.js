  const express = require('express');
    const app = express();

    require('dotenv').config();
    
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    require('./config/database').connect();

    const routes = require('./routes/user');
    app.use('/api/v1', routes);

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });

db = require('./config/database');
db.connect();
console.log('Connected to the database');

app.get('/', (req, res) => {
    res.send('Hello World');
});


