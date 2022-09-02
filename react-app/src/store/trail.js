const GET_ALL_TRAILS = "trail/GET_ALL_TRAILS"
const GET_TRAIL_DETAIL = "trail/GET_TRAIL_DETAIL"
const GET_PARK_TRAILS ="trail/GET_PARK_TRAILS"
const GET_NEARBY_TRAILS ="trail/GET_NEARBY_TRAILS"


const getAllTrails = (trails) => {
    return {
      type: GET_ALL_TRAILS,
      trails
    }
  }

const getTrailDetail = (trail) => {
    return {
      type: GET_TRAIL_DETAIL,
      trail
    }
  }

const getParkTrails = (trails) => {
    return {
        type: GET_PARK_TRAILS,
        trails
    }
  }

const getNearbyTrails = (trails) => {
    return {
        type: GET_NEARBY_TRAILS,
        trails
    }
  }


export const getAlltrailsThunk = () => async dispatch => {
    const response = await fetch('/api/trails/all');
    if (response.ok) {
      const trails = await response.json();
      dispatch(getAllTrails(trails))
    }

    return response
  }

export const getTrailDetailThunk = (trailId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}`);
    if (response.ok) {
      const trail = await response.json();
      dispatch(getTrailDetail(trail))
    }

    return response
  }


export const getParkTrailsThunk = (parkId) => async dispatch => {
    const response = await fetch(`/api/parks/${parkId}/trails`);
    if (response.ok) {
      const trails = await response.json();
      dispatch(getParkTrails(trails))
    }

    return response
  }


export const getNearbyTrailsThunk = (parkId,trailId) => async dispatch => {
    const response = await fetch(`/api/parks/${parkId}/trails/${trailId}/nearby`);
    if (response.ok) {
      const trails = await response.json();
      dispatch(getNearbyTrails(trails))
    }

    return response
  }



const initialState = {};

export function nearby(state = initialState, action) {

  let newState;
  switch (action.type) {
    case GET_NEARBY_TRAILS: {
      newState = action.trails;
      return newState;
    }

    default:
      return state;
}
}

export default function trail(state = initialState, action) {

      let newState;
      switch (action.type) {
        case GET_ALL_TRAILS: {
          newState = action.trails;
          return newState;
        }
        case GET_TRAIL_DETAIL: {
          newState = {}
          newState[action.trail.id] = action.trail
          return newState
        }
        case GET_PARK_TRAILS: {
            newState = action.trails;
            return newState;
          }
        default:
          return state;
    }
  }
