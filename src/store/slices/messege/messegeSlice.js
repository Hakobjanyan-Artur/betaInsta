import { createSlice } from "@reduxjs/toolkit";

const messegeSlice = createSlice({

    name:'messege',
    initialState: {
        user: 'user',
        txt: '',
        message: [],
    },
    reducers: {
        addMessage(state, {payload}) {

            return{
                ...state,
                message: [
                    ...state.message,
                    {
                        id: new Date().getTime().toString(),
                        user: state.user === 'user' ? payload.user : 'Instabot',
                        mess: payload.mess
                    }
                ],
                user: state.user === 'user' ? 'Instabot' : 'user'
            }
        },
        addMessageInsta(state,{payload}) {
            
            return{
                ...state,
                message: [
                    ...state.message,
                    {
                        id: new Date().getTime().toString(),
                        user: state.user === 'user' ? payload.user : 'Instabot',
                        mess: state.txt
                    }
                ],
                user: state.user === 'user' ? 'Instabot' : 'user'
            }   
        },
        instaBotMess(state,{payload}) {
            
            switch (payload.mess) {
                case 'barev':
                    return {
                        ...state,
                        txt: `Barev ${payload.user} jan, inch anem qo hamar ? `
                    }
                case 'inchkarasanes?':
                    return {
                        ...state,
                         txt: `Karam erg miacnem, kuzes ? `
                    }    
                case 'ha':
                    return {
                        ...state,
                        txt : `du problem chunes`
                    }      
                default:
                    return {
                        ...state,
                        txt: 'I do not understand'
                    }
            }
        }
    }
})

export const selectMessege = state => state.messege

export const {addMessage, addMessageInsta, instaBotMess} = messegeSlice.actions

export const messegeReducer = messegeSlice.reducer