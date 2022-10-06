const GET_REVIEW = "review/GET_REVIEW"
const CREATE_REVIEW = "review/CREATE_REVIEW"
const DELETE_REVIEW = "review/DELETE_REVIEW"
const UPDATE_REVIEW = "review/UPDATE_REVIEW"

const getReviews = (reviews) =>{
    return {
      type:GET_REVIEW,
      reviews
    }
  }

const creatReview = (review) =>{
    return {
      type:CREATE_REVIEW,
      review
    }
  }

const deleteReview = (reviewId) => {
    return {
      type: DELETE_REVIEW,
      reviewId
    }
  }

const updateReview = (review) => {
    return {
      type: UPDATE_REVIEW,
      review
    }
  }

export const getUserReviewsThunk = (userId) => async dispatch => {
      const response = await fetch(`/api/users/${userId}/reviews`);
      if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews))
      }

      return response
    }

export const getReviewsThunk = (trailId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/reviews`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(getReviews(reviews))
    }

    return response
  }


export const creatReviewThunk = (trailId,review) => async dispatch => {
      const response = await fetch(`/api/trails/${trailId}/reviews/new`,{
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(review)
          }
      );
      const data = await response.json()
      if (response.ok) {
        dispatch(creatReview(data))
      }

      return data
    }



export const updateReviewThunk = (trailId,review) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/reviews/${review.id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
        }
    );
    const data = await response.json()
    if (response.ok) {
      dispatch(updateReview(data))
    }
    return data
  }


export const deleteReviewThunk = (trailId,reviewId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/reviews/${reviewId}`,{
        method:'DELETE'
        }
    );
    if (response.ok) {
      dispatch(deleteReview(reviewId))
    }

    return response
  }


  const initialState = {};

  export default function reducer(state = initialState, action) {

        let newState;
        switch (action.type) {
          case GET_REVIEW: {
            newState = action.reviews.Reviews;
            return newState;
          }
          case CREATE_REVIEW: {
            newState = {...state};
            newState[action.review.id] = action.review
            return newState;
          }
          case UPDATE_REVIEW: {
            newState = {...state};
            newState[action.review.id] =
                {...newState[action.review.id],...action.review}
            return newState;
          }
          case DELETE_REVIEW: {
            newState = {...state};
            delete newState[action.reviewId]
            return newState;
          }
          default:
            return state;
      }
    }
