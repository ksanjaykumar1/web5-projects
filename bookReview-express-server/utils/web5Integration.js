import { Web5 } from '@web5/api';
import { NotFoundError } from '../errors/index.js';

const { web5, did: userDid } = await Web5.connect();

const reviewSchema = {
  context: 'https://schema.org/',
  type: 'Review',
  get uri() {
    return this.context + this.type;
  },
};

//Query book review (search for DWN records)
async function getReviews() {
  let response = await web5.dwn.records.query({
    message: {
      filter: {
        schema: reviewSchema.uri,
      },
    },
    dateSort: 'createdAscending',
  });
  let recordData = await Promise.all(
    response.records.map(async (record) => {
      const text = await record.data.text();
      const jsonObject = JSON.parse(text);
      return { ...jsonObject, recordId: record._recordId };
    })
  );
  return recordData;
}

const addReview = async ({
  bookName,
  authorName,
  datePublished,
  genre,
  identifier,
}) => {
  // check if review already exists
  const review = {
    '@type': 'Book',
    name: bookName,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished,
    genre,
    identifier,
  };
  const response = await web5.dwn.records.create({
    data: review,
    message: {
      schema: reviewSchema.uri,
      dataFormat: 'application/json',
      published: true,
    },
  });

  if (response.status.code === 202) {
    console.log(`Review for ${review.name} added successfully`);
  } else {
    console.log(`${response.status}. Error adding review for ${review.name}`);
  }
  return response.record;
};
const getAllBookReviewsByDid = async (did) => {
  const { records } = await web5.dwn.records.query({
    from: did,
    message: {
      filter: {
        schema: reviewSchema.uri,
      },
    },
  });
  return records;
};
const getBookReviewById = async (recordId) => {
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  if (!record) {
    throw new NotFoundError(`No such review with record Id ${recordId}`);
  }
  const text = await record.data.text();
  return JSON.parse(text);
};
const updateByReviewByRecordID = async (recordId, updateData) => {
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId,
      },
    },
  });
  if (!recordId) {
    throw new NotFoundError(`No such review with record Id ${recordId}`);
  }
  const text = await record.data.text();
  const review = JSON.parse(text);
  const updatedReview = { ...review, ...updateData };

  // Update the record
  const response = await record.update({ data: updatedReview });
  return response;
};
export {
  web5,
  userDid,
  reviewSchema,
  getReviews,
  getAllBookReviewsByDid,
  getBookReviewById,
  addReview,
  updateByReviewByRecordID,
};
