import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import Field from "../../components/common/Field";
import { useForm } from "react-hook-form";
import addPhotoIcon from "../../assets/icons/addPhoto.svg";
import { actions } from "../../actions";
import { useEffect } from "react";

const PostEntry = ({onCreate,post}) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { state: profile } = useProfile();
  const { api } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  

  const handlePostSubmit = async(formData) => {
    console.log(formData);
    dispatch({type:actions.post.DATA_FETCHING})
     try{
     
      const response=await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`,{formData})
      if(response.status===200){
        dispatch({type:actions.post.DATA_CREATED,data:response.data})
        // close the Ui
        onCreate()
      }
     }
     catch(error){
      console.error(error)
      dispatch({
        type: actions.post.DATA_FETCHED_ERROR,
        error:error.message
    });
     }
  };

  const user = profile?.user ?? auth?.user;

  useEffect(() => {
    if (post) {
      setValue("content", post.content);
      
    }
  }, [post, setValue]);
  return (
    <>
      <div className="card relative">
        <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
         {post ? "Edit Post" :"Create Post"} 
        </h6>

        <form onSubmit={handleSubmit(handlePostSubmit)}>
          <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
            <div className="flex items-center gap-3">
              <img
                className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                alt="avatar"
              />
              <div>
                <h6 className="text-lg lg:text-xl">
                  {user?.firstName} {user?.lastName}
                </h6>

                <span className="text-sm text-gray-400 lg:text-base">
                  Public
                </span>
              </div>
            </div>

            <label
              className="btn-primary cursor-pointer !text-gray-100"
              htmlFor="photo"
            >
              <img src={addPhotoIcon} alt="Add Photo" />
              Add Photo
            </label>
            <input type="file" name="photo" id="photo" className="hidden" />
          </div>

          <Field label="" error={errors.content}>
            <textarea
              {...register("content", {
                required: "Adding some text is mandatory!",
              })}
              name="content"
              id="content"
              placeholder="Share your thoughts..."
              className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            >

            </textarea>
          </Field>
          <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button
              className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostEntry;
