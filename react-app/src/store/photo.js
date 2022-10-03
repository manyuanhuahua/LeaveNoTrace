const GET_PHOTO = "photo/GET_PHOTO"
const CREATE_PHOTO = "photo/CREATE_PHOTO"
const DELETE_PHOTO = "photo/DELETE_PHOTO"
const UPDATE_PHOTO = "photo/UPDATE_PHOTO"


const getPhotos = (photos) =>{
    return {
      type:GET_PHOTO,
      photos
    }
  }

const creatPhoto = (photo) =>{
    return {
      type:CREATE_PHOTO,
      photo
    }
  }

const deletePhoto = (photoId) => {
    return {
      type: DELETE_PHOTO,
      photoId
    }
  }

const updatePhoto = (photo) => {
    return {
      type: UPDATE_PHOTO,
      photo
    }
  }



export const getPhotosThunk = (trailId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/photos`);
    if (response.ok) {
      const photos = await response.json();
      dispatch(getPhotos(photos))
    }

    return response
  }

export const createPhotoThunk = (trailId,photo) => async dispatch => {
      console.log('in thunk000000',photo)
      const response = await fetch(`/api/trails/${trailId}/photos/new`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(photo),
        });
      const data = await response.json()
      if (response.ok) {
        dispatch(creatPhoto(data))
      }

      return data
    }



export const updatePhotoThunk = (trailId,photo) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/photos/${photo.id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(photo)
        }
    );
    const data = await response.json()
    if (response.ok) {
      dispatch(updatePhoto(data))
    }
    return data
  }


export const deletePhotoThunk = (trailId,photoId) => async dispatch => {
    const response = await fetch(`/api/trails/${trailId}/photos/${photoId}`,{
        method:'DELETE'
        }
    );
    if (response.ok) {
      dispatch(deletePhoto(photoId))
    }

    return response
  }



  const initialState = {};

  export default function reducer(state = initialState, action) {

        let newState;
        switch (action.type) {
          case GET_PHOTO: {
            newState = action.photos.Photos;
            return newState;
          }
          case CREATE_PHOTO: {
            newState = {...state};
            newState[action.photo.id] = action.photo
            return newState;
          }
          case UPDATE_PHOTO: {
            newState = {...state};
            newState[action.photo.id] =
                {...newState[action.photo.id],...action.photo}
            return newState;
          }
          case DELETE_PHOTO: {
            newState = {...state};
            delete newState[action.photoId]
            return newState;
          }

          default:
            return state;
      }
    }
