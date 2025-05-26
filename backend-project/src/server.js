require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: process.env.allowedOrigin,
  credentials: true,
}));
app.use(express.json());

app.use('/api/spareparts', require('./routes/sparePart.routes'));
app.use('/api/stockin', require('./routes/stockIn.routes'));
app.use('/api/stockout', require('./routes/stockOut.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.listen(process.env.PORT, () => {
  console.log("Running on port http://localhost:" + process.env.PORT + "");
});