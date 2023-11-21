import express from 'express';
import {
  addBookReview,
  deleteBookReviewByRecordId,
  getAllBookReviews,
  getBookReviewByRecordId,
  publish,
  updateBookReviewByRecordId,
} from '../controllers/bookReview.js';
const router = express.Router();

router.route('/').get(getAllBookReviews).post(addBookReview);
router.route('/publish/:recordId').patch(publish);
router
  .route('/:recordId')
  .get(getBookReviewByRecordId)
  .patch(updateBookReviewByRecordId)
  .delete(deleteBookReviewByRecordId);
export default router;
