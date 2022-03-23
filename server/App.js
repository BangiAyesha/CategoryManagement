const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1503;
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const categoryRoutes = require("./routes/categoryRoutes");
app.use(categoryRoutes);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${PORT}`);
});
