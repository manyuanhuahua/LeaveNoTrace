const GET_ALL_PARKS = "park/GET_ALL_PARKS"
const GET_PARK_DETAIL = "post/GET_POST_DETAIL"

const getAllParks = (parks) => {
    return {
      type: GET_ALL_PARKS,
      parks
    }
  }

const getParkDetail = (park) => {
    return {
      type: GET_PARK_DETAIL,
      park
    }
  }


export const getAllparksThunk = () => async dispatch => {
    const response = await fetch('/api/parks/all');
    if (response.ok) {
      const parks = await response.json();
      dispatch(getAllParks(parks))
    }

    return response
  }

export const getParkDetailThunk = (parkId) => async dispatch => {
    const response = await fetch(`/api/parks/${parkId}`);
    if (response.ok) {
      const park = await response.json();
      dispatch(getParkDetail(park))
    }

    return response
  }


const initialState = {};

export default function reducer(state = initialState, action) {

      let newState;
      switch (action.type) {
        case GET_ALL_PARKS: {
          newState = action.parks.Parks;
          return newState;
        }
        case GET_PARK_DETAIL: {
          newState = {}
          newState[action.park.id] = action.park
          return newState
        }

        default:
          return state;
    }
  }
