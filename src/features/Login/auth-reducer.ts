import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {action} from '@storybook/addon-actions';

type PayloadType = {
    value: boolean
}

const initialState = {
    isLoggedIn: false
}

export const loginTC = createAsyncThunk('auth/loginTC', async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({value: false})
        }
    } catch (error: any) {
        handleServerNetworkError({message: error}, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({value: false})
    }

})

export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError({message: error}, dispatch)
        return rejectWithValue({})
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<Pick<PayloadType, 'value'>>) {
            state.isLoggedIn = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true;
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false;
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// thunks



