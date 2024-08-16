import LogoutIcon from "../../assets/icons/logout.svg";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const{setAuth}=useAuth()
    const navigate=useNavigate()
    const handleLogout=()=>{
      setAuth({})
      navigate("/login")
    }
  return (
    <>
     <button className="icon-btn" onClick={handleLogout}>
            <img src={LogoutIcon} alt="Logout" />
          </button>
    </>
  )
}

export default Logout