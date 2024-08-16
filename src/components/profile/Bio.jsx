import { useState } from "react";
import EditIcon from '../../assets/icons/edit.svg'
import CheckIcon from '../../assets/icons/check.svg'
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const Bio = () => {
  const{state,dispatch}=useProfile()
  const{api}=useAxios()
  const[bio,setBio]=useState(state?.user?.bio)
  const[editMode,setEditMode]=useState(false)
  const handleBioEdit=async()=>{
    dispatch({
      type:actions.profile.DATA_FETCHING})

    try{
      const response=await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,{bio})
      if(response.status===200){
       dispatch({type:actions.profile.USER_DATA_EDITED},response.data)
      }
    }
    catch(error){
      console.error(error)
    }
    setEditMode(false)
     
  }
  return (
    <>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
          ):(
            <textarea className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            cols={55}
            rows={4} 
            >
            </textarea>
          )}
        </div>
        {
          !editMode ? (
            <button className="flex-center h-7 w-7 rounded-full">
            <img src={EditIcon} alt="Edit" onClick={()=>setEditMode(true)} />
          </button>
          ):(
            <button className="flex-center h-7 w-7 rounded-full" onClick={handleBioEdit}>
          <img src={CheckIcon} alt="check" />
        </button>
          )
        }
    

        
      </div>
    
    </>
  );
};

export default Bio;
