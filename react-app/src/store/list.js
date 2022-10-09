const GET_LISTS = "list/GET_LISTS"
const GET_LIST_DETAIL = "list/GET_LIST_DETAIL"
const CREATE_LIST = "list/CREATE_LIST"
const DELETE_LIST = "list/DELETE_LIST"
const UPDATE_LIST = "list/UPDATE_LIST"

const getLists = (lists) =>{
    return {
      type:GET_LISTS,
      lists
    }
  }

const getListDetail = (list) =>{
    return {
      type:GET_LIST_DETAIL,
      list
    }
  }

const creatList = (list) =>{
    return {
      type:CREATE_LIST,
      list
    }
  }

const deleteList = (listId) => {
    return {
      type: DELETE_LIST,
      listId
    }
  }

const updateList = (list) => {
    return {
      type: UPDATE_LIST ,
      list
    }
  }


export const getListsThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/lists`);
    if (response.ok) {
      const lists = await response.json();
      dispatch(getLists(lists))
    }

    return response
  }


export const getListDetailThunk = (userId,listId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/lists/${listId}`);
    if (response.ok) {
      const list = await response.json();
      dispatch(getListDetail(list))
    }

    return response
  }

export const creatListThunk = (userId,list) => async dispatch => {
      const response = await fetch(`/api/users/${userId}/lists/new`,{
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(list)
          }
      );

      const data = await response.json()
      if (response.ok) {
        dispatch(creatList(data))
      }

      return data
    }



export const updateListThunk = (userId,list) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/lists/${list.id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
        }
    );
    const data = await response.json()
    if (response.ok) {
      dispatch(updateList(data))
    }
    return data
  }


export const deleteListThunk = (userId,listId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/lists/${listId}`,{
        method:'DELETE'
        }
    );

    if (response.ok) {
      dispatch(deleteList(listId))
    }

    return response
  }


  const initialState = {};

  export default function reducer(state = initialState, action) {

        let newState;
        switch (action.type) {
          case GET_LISTS: {
            newState = action.lists.Lists;
            return newState;
          }
          case GET_LIST_DETAIL: {
            newState = {}
            newState[action.list.id] = action.list
            return newState
          }
          case CREATE_LIST: {
            newState = {...state};
            newState[action.list.id] = action.list
            return newState;
          }
          case UPDATE_LIST: {
            newState = {...state};
            newState[action.list.id] =
                {...newState[action.list.id],...action.list}
            return newState;
          }
          case DELETE_LIST: {
            newState = {...state};
            delete newState[action.listId]
            return newState;
          }
          default:
            return state;
      }
    }
