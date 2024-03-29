// * This function creates a response with a JWT (JSON Web Token) cookie
const createResponseWithJWT = (
  res, // Response object from the Express framework
  statusCode, // HTTP status code for the response
  statusMessage, // Status message for the response
  jwtToken, // JWT token to be included in the response and cookie
  message, // Optional message to be included in the response
  data // Optional data to be included in the response
) => {
  // Define cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // Cookie expiration date
    httpOnly: true, // Cookie cannot be accessed by JavaScript/browser on the client side
  };

  // Set 'secure' option for the cookie if in production mode
  // ! put back to secure before  prod
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = false; // Cookie will only be sent over HTTPS
  }

  // Set the JWT cookie in the response
  res.cookie("jwt", jwtToken, cookieOptions);

  // Set the HTTP status code and send the JSON response
  res.status(statusCode).json({
    status: statusMessage, // Status message of the response
    message: message || null, // Optional message, defaulting to null if not provided
    data: data || null, // Optional data, defaulting to null if not provided
    jwtToken, // JWT token included in the response
  });
};

// Export the function to make it available for use in other modules
module.exports = createResponseWithJWT;
