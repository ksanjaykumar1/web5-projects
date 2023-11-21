import {
  getReviews,
  getBookReviewById,
  addReview,
  updateByReviewByRecordID,
  deleteByReviewByRecordID,
  publishByUpdating,
} from '../utils/web5Integration.js';

import { StatusCodes } from 'http-status-codes';

export const getAllBookReviews = async (req, res) => {
  const records = await getReviews();
  res.status(StatusCodes.OK).json({ records });
};
export const getBookReviewByRecordId = async (req, res) => {
  //   console.log(req.params.recordId);
  const record = await getBookReviewById(req.params.recordId);
  res.status(StatusCodes.OK).json({ record });
};
export const addBookReview = async (req, res) => {
  const {
    bookName,
    authorName,
    datePublished,
    genre,
    identifier,
    publishReview,
  } = req.body;
  const record = await addReview(
    {
      bookName,
      authorName,
      datePublished,
      genre,
      identifier,
    },
    publishReview
  );
  res.status(StatusCodes.OK).json({ record });
};

export const updateBookReviewByRecordId = async (req, res) => {
  const { updateReview } = req.body;
  const recordId = req.params.recordId;
  const record = await updateByReviewByRecordID(recordId, updateReview);
  res.status(StatusCodes.OK).json({ record });
};
export const publish = async (req, res) => {
  const recordId = req.params.recordId;
  const response = await publishByUpdating(recordId);
  res.status(StatusCodes.OK).json({ response });
};
export const deleteBookReviewByRecordId = async (req, res) => {
  const recordId = req.params.recordId;
  const record = await deleteByReviewByRecordID(recordId);
  res.status(StatusCodes.OK).json({ record });
};
