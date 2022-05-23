import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


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

export const initializeAppTC = createAsyncThunk('app/initialize', async (_, {dispatch, rejectWithValue}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }
    } catch (e) {

    }
})


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
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const {setAppErrorAC, setAppStatusAC} = slice.actions
export const appReducer = slice.reducer



