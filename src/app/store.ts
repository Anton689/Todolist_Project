import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

export function useActions<T extends ActionCreatorsMapObject >(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(()=> {
        return bindActionCreators(actions, dispatch)
    }, [])
}

