console.log("pokrenuto");

///pokretanje funkcije za koriscenje env fajla
require("dotenv").config();
//async errors
require("express-async-errors");

/// express
const express = require("express");

const app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

//handling errors and not found

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware

app.use(express.json());

//routes

app.get("/", (req, res) => {
    res.send('<h1> Store Api</h1> <a href="api/vi//products">products </a>');
});

app.use("/api/v1/products", productsRouter);
//products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//dynamic port

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is listening on a port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();