const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./src/routes/blog.routes');

const app = express();

//Middleware  
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/v1/blog/posts', blogRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});


//server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});