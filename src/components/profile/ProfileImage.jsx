import { useProfile } from "../../hooks/useProfile";
import EditIcon from '../../assets/icons/edit.svg'
import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const ProfileImage = () => {
  const uploadImageRef = useRef();

  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const handleImageUpload = (e) => {
    e.preventDefault();
    uploadImageRef.current.addEventListener("change", uploadImageDisplay);
    uploadImageRef.current.click();
  };

  const uploadImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of uploadImageRef.current.files) {
        formData.append("avatar", file);
      }
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCHED_ERROR,
        error: error.message,
      });
      console.log(error);
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt="Jillur Rahman"
      />

      <button
        className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        onClick={handleImageUpload}
      >
        <img src={EditIcon} alt="Edit" />
      </button>
      <input type="file" id="file" ref={uploadImageRef} hidden />
    </div>
  );
};

export default ProfileImage;
