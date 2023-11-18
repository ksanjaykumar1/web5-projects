import express from 'express';
import {
  addBookReview,
  deleteBookReviewByRecordId,
  getAllBookReviews,
  updateBookReviewByRecordId,
} from '../controllers/bookReview';
const router = express.Router();

router.route('/').get(getAllBookReviews).post(addBookReview);
router
  .route('/:id').get
  .patch(updateBookReviewByRecordId)
  .delete(deleteBookReviewByRecordId);
export default router;
