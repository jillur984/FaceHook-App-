import { PostContext } from "../context"
import { useReducer } from "react"
import { initialState, PostReducer } from "../reducers/PostReducer"
export const PostProvider=({children})=>{
    const[state,dispatch]=useReducer(PostReducer,initialState)
    return (
        <PostContext.Provider value={{state,dispatch}}>
            {children}
        </PostContext.Provider>
    )
}