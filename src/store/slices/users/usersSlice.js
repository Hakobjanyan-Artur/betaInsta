import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";
import { v4 as uuidv4 } from 'uuid'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userData: [],
        botMes: null,
        currentUser: null,
    },
    reducers: {
        toggleCurrentUser(state, {payload}) {
                state.currentUser = state.userData.find(user => (user.email === payload.log || user.username === payload.log) && user.password === payload.pass)
            },
        addNewUserPost(state, {payload}) {
            let idx = state.userData.findIndex(el => el.id === state.currentUser.id)
                state.userData[idx].posts.unshift({
                    ...payload,
                    comments: []
                })
                state.currentUser.posts.unshift({
                    ...payload,
                    comments: []
                })
            },
            delUserPost(state,{payload}) {

                state.currentUser.posts = [...state.currentUser.posts.filter(post => post.id !== payload)]

            },
            logout(state) {
                state.currentUser = null
            },
            sendMess(state, {payload}) {
                let idx = state.userData.findIndex(el => el.id === state.currentUser.id)
                state.currentUser.messages = [
                    ...state.currentUser.messages,
                    {
                        id: uuidv4(),
                        user: payload.user,
                        mess: payload.mess
                    },
                    {
                        id: uuidv4(),
                        user: 'instabot',
                        mess: state.botMes,  
                    }
                ]
                state.userData[idx].messages = [
                    ...state.currentUser.messages
                ]
            },
            botMess(state, {payload}) {
                switch (payload.mess) {
                    case 'hello':
                        return {
                            ...state,
                            botMes: `Hello ${payload.user},my name is Instabot,
                            i was created by the developer of the instagram demo 
                            program so that you would not be bored,
                            here are the commands i can run (
                                hello,
                                how are you doing ?,
                                turn on the music = "play music",
                                turn off the music = "stop",
                                
                            ) 
                            `
                        }
                    case 'howareyoudoing?' :
                        return {
                            ...state,
                            botMes: `OK, thank you, turn on the music for you?`
                        }  
                    case 'playmusic':
                        return {
                            ...state,
                            
                        botMes : `ok`
                        }
                    case 'stop': 
                        return {
                            ...state,
                            botMes: `of course`
                        }
                                
                    default:
                        return {
                            ...state,
                            botMes: 'I do not understand'
                        }
                }
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

export const {toggleCurrentUser, addNewUserPost, delUserPost, logout, sendMess, botMess} = usersSlice.actions

export const usersReducer = usersSlice.reducer