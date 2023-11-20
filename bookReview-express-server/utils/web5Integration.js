import { Web5 } from '@web5/api';

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
      console.log(jsonObject);
      return jsonObject;
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
  console.log(recordId);
  const { record } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });
  const text = await record.data.text();
  return JSON.parse(text);
};
export {
  web5,
  userDid,
  reviewSchema,
  getReviews,
  getAllBookReviewsByDid,
  getBookReviewById,
  addReview,
};
