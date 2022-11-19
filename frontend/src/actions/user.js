import API from "../utils/api";

export const ACTION_TYPES = {
    USER_CREATE: 'USER_CREATE',
    USER_UPDATE: 'USER_UPDATE',
    USER_DELETE: 'USER_DELETE',
    USER_FETCH: 'USER_FETCH',
    USER_FETCH_ALL: 'USER_FETCH_ALL',
    // USER_PAGINATION: 'USER_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.user().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.USER_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5,access, name = "", email = "") => dispatch => {
    // API.user().fetchPagination(page, Math.abs(limit), name, email)
    //     .then(res =>{
    //         dispatch({
    //             type: ACTION_TYPES.USER_PAGINATION,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => console.log(err))
    let url="";
    if(access=='GodLevel')
    url='department/list_god'
    else if(access=='SuperAdmin')
    url='department/list_sub_admins/'+name
    else if(access=='SubAdmin')
    url='department/list_sub'
    else url=""
    API.user(url).fetchAll()
        .then(res =>{
            console.log(res)
            dispatch({
                type: ACTION_TYPES.USER_FETCH_ALL,
                payload: res.data.list
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.user().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.user().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.user().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    API.user().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}