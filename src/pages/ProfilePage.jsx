import { useProfile } from '../hooks/useProfile'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'
import { actions } from '../actions'
import MyPosts from '../components/profile/MyPosts'
import ProfileInfo from '../components/profile/ProfileInfo'


const ProfilePage = () => {
  const{auth}=useAuth()
  const{api}=useAxios()

  const{state,dispatch}=useProfile()

  useEffect(()=>{
    dispatch({
      type:actions.profile.DATA_FETCHING
    })
    const fetchProfile=async()=>{
    try{
      const response=await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
      // setUser(response?.data?.user)
      // setPosts(response?.data?.posts)
      if(response.status===200){
        dispatch({type:actions.profile.DATA_FETCHED,data:response.data})
      }
    }
    catch(error) {
      console.error(error);
      dispatch({
          type: actions.profile.DATA_FETCHED_ERROR,
          error: error.message
      });
  }
  
    }

    fetchProfile()
    
  },[])
  if(state?.loading){
   return <p>Profile Data Fetch is Loading</p>
  }
  return (
    <>
   <ProfileInfo/>
  <MyPosts/>
    </>
  )
}

export default ProfilePage