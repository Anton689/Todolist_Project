import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isBoolean} from 'util';


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // взаимодействие с сервером
    status: RequestStatusType
    // ошибка  - мы запишем текст ошибки
    error: string | null
    isInitialized: boolean
}

type PayloadType = {
    error: string | null
    value: boolean
    status: RequestStatusType
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// slice
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<Pick<PayloadType, 'error'>>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<Pick<PayloadType, 'status'>>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<Pick<PayloadType, 'value'>>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const  {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions
export const appReducer = slice.reducer

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }

        dispatch(setAppInitializedAC({value: true}));
    })
}

