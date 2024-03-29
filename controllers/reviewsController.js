const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const TourGuideReview = require("../models/TourGuideReview");
const ControllerHandlerFactory = require("../helpers/FactoryHandlerFunctions/ControllerHandlerFactory");
const DatabaseOperationsConstants = require("../helpers/Constants/DatabaseOperationsConstants");

const getAllReviews = ControllerHandlerFactory.getAllDocuments(Review);
//   const reviews = await Review.find().populate({
//     path: "tour",
//     select: "name",
//   });

//   res
//     .status(StatusCodes.OK)
//     .json({ status: "success", totalReviews: reviews.length, reviews });
// };

const getSingleTourReview = async (req, res) => {
  const reviews = await Review.find({ tour: req.params.tourId }).populate({
    path: "tour",
    select: "name",
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", results: reviews.length, reviews });
};

// * Start of Tour Guide Review

const getAllTourGuideReviews =
  ControllerHandlerFactory.getAllDocuments(TourGuideReview);

const getSingleTourGuideReview = ControllerHandlerFactory.getDocument(
  TourGuideReview,
  DatabaseOperationsConstants.GET_DOCUMENT_BY_ID
);

const createTourGuideReview = ControllerHandlerFactory.createDocument(
  TourGuideReview,
  DatabaseOperationsConstants.CREATE_NEW_DOCUMENT
);

// * End of Tour Guide Review
const createReview = ControllerHandlerFactory.createDocument(
  Review,
  DatabaseOperationsConstants.CREATE_NEW_DOCUMENT
);

const deleteReview = ControllerHandlerFactory.deleteOneDocument(
  Review,
  DatabaseOperationsConstants.DELETE_SINGLE_DOCUMENT_BY_ID
);

const updateReview = ControllerHandlerFactory.updateDocument(
  Review,
  DatabaseOperationsConstants.UPDATE_SINGLE_DOCUMENT_BY_ID
);

const getSingleReview = ControllerHandlerFactory.getDocument(
  Review,
  DatabaseOperationsConstants.GET_DOCUMENT_BY_ID,
  {}
);
module.exports = {
  getAllReviews,
  createReview,
  getSingleTourReview,
  deleteReview,
  updateReview,
  getSingleReview,
  createTourGuideReview,
  getAllTourGuideReviews,
  getSingleTourGuideReview,
};
