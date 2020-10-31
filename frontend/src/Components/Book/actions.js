import { BOOK_REQUEST, BOOK_SUCCESS, BOOK_ERROR } from "./actionTypes"
import axios from "axios"

export const bookRequest = payload => ({
    type: BOOK_REQUEST,
    payload
})

export const bookSuccess = payload => ({
    type: BOOK_SUCCESS,
    payload
})

export const bookError = payload => ({
    type: BOOK_ERROR,
    payload
})

export const bookData = payload => async dispatch => {
    dispatch(bookRequest());
    try{
        const {data} = await axios.get('http://localhost:9000/api/user/getbooks')
        console.log(data)
        dispatch(bookSuccess(data))
    }
    catch(e){
        dispatch(bookError(e))
    }
}