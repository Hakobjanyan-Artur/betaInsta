import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";


const postsSlice = createSlice({

    name: 'posts',
    initialState: [],
    reducers: {
        addNewComment(state, {payload}) {
            let idx = state.findIndex(post => post.id === payload.id)
                state[idx].comments.push({
                    id: new Date().getTime(),
                    username: payload.username,
                    body: payload.txt
        })
        },
        addNewPost(state,{payload}) {
                state.unshift({
                    ...payload,
                    comments: []
        })
    },
        delPost(state,{payload}) {
            return[
                ...state.filter(post => post.id !== payload)
            ]
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            console.log('load...');
        },
        [fetchPosts.fulfilled]: (state, {payload}) => {
            return payload
        }
    },
    [fetchPosts.rejected]: () => {
            console.log('error');
    }
})

export const selectPosts = state => state.posts

export const {addNewComment, addNewPost, delPost} = postsSlice.actions

export const postsReducer = postsSlice.reducer