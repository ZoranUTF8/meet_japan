const express = require("express");
const router = express.Router();
const applicationMiddleware = require("../middleware/index");
const bookingController = require("../controllers/bookingController");

router.post(
  "/checkout-session/:tourId",
  applicationMiddleware.RouteProtect.protectedRoute,
  applicationMiddleware.RoleRestrictedRoute.restrictTo("user"),
  bookingController.getCheckoutSession
);

router.get(
  "/tour/:tour/user/:user/price/:price",
  applicationMiddleware.RouteProtect.protectedRoute,
  applicationMiddleware.RoleRestrictedRoute.restrictTo("user"),
  applicationMiddleware.CreateBookingMiddleware.createBookingCheckout
);

router.get(
  "/my_bookings",
  applicationMiddleware.RouteProtect.protectedRoute,
  applicationMiddleware.RoleRestrictedRoute.restrictTo("user"),
  bookingController.getAllUserBookings
);

router.delete(
  "/my_bookings/tour/:tourId",
  applicationMiddleware.RouteProtect.protectedRoute,
  applicationMiddleware.RoleRestrictedRoute.restrictTo("user"),
  bookingController.cancelBookedTour
);

module.exports = router;
