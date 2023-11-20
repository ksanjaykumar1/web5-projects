import {
  getReviews,
  getBookReviewById,
  addReview,
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
  const { bookName, authorName, datePublished, genre, identifier } = req.body;
  const record = await addReview({
    bookName,
    authorName,
    datePublished,
    genre,
    identifier,
  });
  res.status(StatusCodes.OK).json({ record });
};

export const updateBookReviewByRecordId = async (req, res) => {};
export const deleteBookReviewByRecordId = async (req, res) => {};
