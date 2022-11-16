import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userData: [],
        currentUser: null
    },
    reducers: {
        toggleCurrentUser(state, {payload}) {
                state.currentUser = state.userData.find(user => (user.email === payload.log || user.username === payload.log) && user.password === payload.pass)
            },
        addNewUserPost(state, {payload}) {
            let idx = state.userData.findIndex(el => el.id === state.currentUser.id)
                state.currentUser.posts.unshift({
                    ...payload,
                    comments: []
                })
                state.userData[idx].posts.unshift({
                    ...payload,
                    comments: []
                })
            },
            delUserPost(state,{payload}) {

                state.currentUser.posts = [...state.currentUser.posts.filter(post => post.id !== payload)]

            },
            logout(state) {
                state.currentUser = null
            }    
        },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                userData: [...payload]
            }
        }
    }
})

export const selectUsers = state => state.users

export const {toggleCurrentUser, addNewUserPost, delUserPost, logout} = usersSlice.actions

export const usersReducer = usersSlice.reducer