import PostCard from "./PostCard"


const PostList = ({posts,onEdit}) => {
 

  return (
   !! posts && posts.map((post)=><PostCard key={post.id} post={post} onEdit={onEdit}  />)
  )
}

export default PostList