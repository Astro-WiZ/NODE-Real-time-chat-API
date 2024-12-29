import express from "express";
import connectMongoDb from "./connection.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 8080;

// MongoDB Connections
connectMongoDb();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI;
const secretKey = process.env.SECRET_KEY;

app.use(
    session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl }),
    })
);

// Routes
app.use("/user", userRoutes);

app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
);
