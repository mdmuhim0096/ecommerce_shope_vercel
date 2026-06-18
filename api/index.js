const express = require("express");
const app = express();

require("dotenv").config();
require("../db/db");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const { clientUrl } = require("./helper/utils");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use("/api/subscribe", require("../router/subscribe"));
app.use("/api/auth", require("../router/user"));
app.use("/api/anlytics", require("../router/anlytics"));
app.use("/api/cart", require("../router/cart"));
app.use("/api/cupon", require("../router/cupon"));
app.use("/api/payment", require("../router/payment"));
app.use("/api/product", require("../router/product"));
app.use("/api/order", require("../router/order"));
app.use("/api/category", require("../router/category"));
app.use("/api/testimonials", require("../router/testimonials"));

module.exports = serverless(app);