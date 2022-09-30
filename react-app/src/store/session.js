// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_API = 'session/ADD_API';
const ADD_NPS_API = 'session/ADD_NPS_API';


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

const addNpsApi = (api) =>({
  type:ADD_NPS_API,
  api
})


const initialState = { user: null };

// export const addNpsApiThunk = () => async (dispatch) => {
//   const response = await fetch('/api/auth/npskeys');
//   if (response.ok) {
//     const api = await response.json();
//     console.log('res in thunk-------',api)
//     dispatch(addNpsApi(api))
//   }

//   return response
// }

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
    // case ADD_NPS_API: {
    //   newState = {...state};
    //   newState['nps'] = action.api
    //   return newState
    // }
    default:
      return state;
  }
}
