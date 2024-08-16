import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";
import { usePost } from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";
import PostEntry from "../components/posts/PostEntry";

const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  const [showEditModal, setShowEditModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  
  

  const handleEditPost = (post) => {
    setPostToEdit(post)
    setShowEditModal(true);
    
    console.log(post)
  };

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.post.DATA_FETCHED_ERROR,
          error: error.message,
        });
      }
    };
    fetchPost();
  }, []);

  if (state?.loading) {
    return <p>We are Working</p>;
  }
  if (state?.error) {
    return <p>Error in Fetching Post {state?.error?.message}</p>;
  }
  return (
    <div>
      {showEditModal ? <PostEntry  post={postToEdit} onCreate={()=>setShowEditModal(false)} /> : <NewPost  />}
      
      <PostList posts={state?.posts} onEdit={handleEditPost} />
      
    </div>
  );
};

export default HomePage;
