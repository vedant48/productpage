const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000",
  })
);

app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const port  = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
