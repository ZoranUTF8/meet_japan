/* Because of the library, we do not
need the next(exception) call anymore.
The library handles everything under the hood.
If an exception occurs in an async route, the
execution is automatically passed to the express error\
 handling middleware. */
require("express-async-errors");
const express = require("express");
const unknownEndpointHandler = require("./routes/notFound");
const app = express();
const cors = require("cors");
// * Middleware
const Logger = require("./middleware/AppLogger");
const ErrorHandler = require("./middleware/ErrorHandler");
// * Routes
const tourRouter = require("./routes/tours");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/reviews");
const adminRouter = require("./routes/admin");
const bookingRouter = require("./routes/bookings");
// * Security
const security = require("./helpers/Security");
const cookieParser = require("cookie-parser");

//  * Middleware

// ? Body parser, reading data from request body to req.body and limit payload to 10kb
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
// ? Cookie parser that parses data from cookie
app.use(cookieParser());
// ? Enable CORS middleware
app.use(
  cors({
    origin: [
      // ? LOCAL TESTING
      "http://localhost:3000", // update the origin value to match the actual domain where your frontend application will be hosted
      "http://127.0.0.1",
      // ? ONLINE TESTING
      "https://meet-japan-frontend-dev.onrender.com",
      // your origins here
    ],
    credentials: true,
  })
);
app.set("trust proxy", 1); // trust first proxy

// ! Production environment
if (process.env.NODE_ENV === "production") {
  app.use("/api/v1", security.rateLimiterConfig);
  app.use(security.configuredHelmet());
  app.use(security.userDataSanitizer());
  app.use(security.xssSanitizer());
  app.use(security.preventParameterPollution());
  // ! Remove later for production and use only for development
  app.use(Logger.requestLogger);
}
// ! Any middleware needed for development only
if (process.env.NODE_ENV !== "production") {
  app.use(Logger.requestLogger);
}

// ! Check how to serve images
app.use(express.static(`${__dirname}/public`)); // ? Static files location

// * End of middleware

//  * Routers mounting
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/booking", bookingRouter);
// * The starting API call for GET /
app.get("/", (req, res) => {
  res.send(
    "Welcome to meet japan api. You can view the documentation here: https://documenter.getpostman.com/view/25275561/2s93z9bhMZ#intro"
  );
});

// * Unknown endpoint
app.all("*", unknownEndpointHandler);
// * This has to be the last loaded middleware. So it can catch all errors
app.use(ErrorHandler);
module.exports = app;
