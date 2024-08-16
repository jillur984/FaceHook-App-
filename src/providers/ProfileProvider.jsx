import { ProfileContext } from "../context"
import { useReducer } from "react"
import { ProfileReducer,initialState} from "../reducers/ProfileReducer"


const ProfileProvider = ({children}) => {
    const[state,dispatch]=useReducer(ProfileReducer,initialState)
  return (
    <ProfileContext.Provider value={{state,dispatch}}>
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider