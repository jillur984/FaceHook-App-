import { actions } from "../actions"

const initialState={
    posts:[],
    loading:false,
    error:null
}
const PostReducer=(state,action)=>{
    switch(action.type){
        case actions.post.DATA_FETCHING:{
           return {
            ...state,
            loading:true
           } 
        }
        case actions.post.DATA_FETCHED:{
            return {
             ...state,
             loading:false,
             posts:action.data
            } 
         }
         case actions.post.DATA_FETCHED_ERROR:{
            return {
             ...state,
             loading:false,
             error:action.error.message
            } 
         }
         case actions.post.DATA_CREATED:{
            return {
             ...state,
             loading:false,
             posts:[...state.posts,action.data]
            } 
         }
         case actions.post.DATA_EDITED:{
            return {
             ...state,
             loading:false,
             user:action.data
            } 
         }
         case actions.post.POST_DELETED:{
            return {
             ...state,
             loading:false,
             posts:state.posts.filter((item)=>item.id!==action.data)
             
            } 
         }
      //    case actions.post.POST_IMAGE_UPDATED: {
      //       return {
      //           ...state,
      //           loading: false,
      //           posts: state.posts.map((post) =>
      //               post.id === action.data.id ? { ...post, image: action.image } : post
      //           ),
      //       };
      //   }
         
         default:
            return state
    }
}

export{initialState,PostReducer}