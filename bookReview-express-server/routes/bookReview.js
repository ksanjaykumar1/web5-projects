import express from 'express';
import {
  addBookReview,
  deleteBookReviewByRecordId,
  getAllBookReviews,
  getBookReviewByRecordId,
  updateBookReviewByRecordId,
} from '../controllers/bookReview.js';
const router = express.Router();

router.route('/').get(getAllBookReviews).post(addBookReview);
router
  .route('/:recordId')
  .get(getBookReviewByRecordId)
  .patch(updateBookReviewByRecordId)
  .delete(deleteBookReviewByRecordId);
export default router;
