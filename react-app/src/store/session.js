// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_API = 'session/ADD_API';
const GET_REVIEWS = 'session/GET_REVIEWS'
const GET_ACTIVITIES = 'session/GET_ACTIVITIES'
const GET_PHOTOS = 'session/GET_PHOTOS'




const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const addApi = (api) =>({
  type:ADD_API,
  api
})

const getReviews = (reviews) =>{
  return {
    type:GET_REVIEWS,
    reviews
  }
}

const getActivities = (activities) =>{
  return {
    type:GET_ACTIVITIES,
    activities
  }
}

const getPhotos = (photos) =>{
  return {
    type:GET_PHOTOS,
    photos
  }
}
const initialState = { user: null };


export const addApiThunk = () => async (dispatch) => {
  const response = await fetch('/api/auth/apikeys');

  if (response.ok) {
    const api = await response.json();
    dispatch(addApi(api))
  }

  return response
}


export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      // console.log('in thunk---',data.errors)
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password,profile_img) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      profile_img
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getReviewsThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews))
  }

  return response
}

export const getActivitiesThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/activities`);
  if (response.ok) {
    const activities = await response.json();
    dispatch(getActivities(activities))
  }

  return response
}

export const getPhotosThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/photos`);
  if (response.ok) {
    const photos = await response.json();
    dispatch(getPhotos(photos))
  }

  return response
}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ADD_API: {
      newState = {...state};
      newState['api'] = action.api
      return newState
    }
    case GET_REVIEWS: {
      newState = action.reviews.Reviews;
      return newState;
    }
    case GET_PHOTOS: {
      newState = action.photos.Photos;
      return newState;
    }
    case GET_ACTIVITIES: {
      newState = action.activities.Activities;
      return newState;
    }
    default:
      return state;
  }
}
