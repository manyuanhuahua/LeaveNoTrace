const GET_ACTIVITY = "activity/GET_ACTIVITY"
const CREATE_ACTIVITY = "activity/CREATE_ACTIVITY"
const DELETE_ACTIVITY = "activity/DELETE_ACTIVITY"
const UPDATE_ACTIVITY = "activity/UPDATE_ACTIVITY"

const getActivities = (activities) =>{
    return {
      type: GET_ACTIVITY,
      activities
    }
  }

const createActivity = (activity) =>{
    return {
      type: CREATE_ACTIVITY,
      activity
    }
  }

const deleteActivity = (activityId) => {
    return {
      type: DELETE_ACTIVITY,
      activityId
    }
  }

const updateActivity = (activity) => {
    return {
      type: UPDATE_ACTIVITY,
      activity
    }
  }


export const getActivitiesThunk = (trailId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/activities`);
    if (response.ok) {
      const activities = await response.json();
      dispatch(getActivities(activities))
    }

    return response
  }


export const createActivityThunk = (trailId,activity) => async dispatch => {
      const response = await fetch(`/api/trails/${trailId}/activities/new`,{
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(activity)
          }
      );
      const data = await response.json()
      if (response.ok) {
        dispatch(createActivity(data))
      }

      return data
    }



export const updateActivityThunk = (trailId,activity) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/activities/${activity.id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
        }
    );

    const data = await response.json()
    if (response.ok) {
      dispatch(updateActivity(data))
    }
    return data
  }


export const deleteActivityThunk = (trailId,activityId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/reviews/${activityId}`,{
        method:'DELETE'
        }
    );
    if (response.ok) {
      dispatch(deleteActivity(activityId))
    }

    return response
  }


  const initialState = {};

  export default function reducer(state = initialState, action) {

        let newState;
        switch (action.type) {
          case GET_ACTIVITY: {
            newState = action.activities;
            return newState;
          }
          case CREATE_ACTIVITY: {
            newState = {...state};
            newState[action.activity.id] = action.activity
            return newState;
          }
          case UPDATE_ACTIVITY: {
            newState = {...state};
            newState[action.activityId] =
                {...newState[action.activityId],...action.activity}
            return newState;
          }
          case DELETE_ACTIVITY: {
            newState = {...state};
            delete newState[action.reviewId]
            return newState;
          }
          default:
            return state;
      }
    }
