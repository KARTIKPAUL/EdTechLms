import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { getUserData, updateProfile } from '../../Redux/Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayot'
import { BsPersonCircle } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai';


function EditProfile(){

    


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[data,setData] = useState({
        previewImage: "",
        fullName: "",
        avater: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    const user = useSelector((state) => state.auth.data);
    
   
    

    function handleImageUpload(e){
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if(uploadImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load',function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avater: uploadImage

                })
            })
        }

    }

    function handleInputChange(e){
        const { name , value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        //console.log(data);
        e.preventDefault();
        if(!data.fullName || !data.avater){
            toast.error('All Fields Are Mandatory');
            return;
        }
        if(data.fullName.length < 5){
            toast.error('Name Must be 5 Character');
            return;
        }

        const formData = new FormData();
        formData.append('fullName',data.fullName);
        formData.append('avater', data.avater);

        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");

    }


    return(
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form 
                    onSubmit={onFormSubmit}
                    className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]'
                >
                    <h1 className='text-center text-2xl font-semibold'>Edit Profile</h1>
                    <label 
                        className='cursor-pointer' htmlFor='image_upload'>

                            {
                                data.previewImage ? (
                                    <img 
                                        src={data.previewImage} 
                                        className='h-28 w-28 rounded-full m-auto' 
                                    />
                                ) : (
                                    <BsPersonCircle 
                                    className ="w-28 h-28 rounded-full m-auto"
                                    
                                    />
                                )
                            }

                    </label>

                    <input 
                        onChange={handleImageUpload}
                        className="hidden"
                        type='file'
                        id='image_upload'
                        name='image_upload'
                        accept = '.jpg, .jpeg, .png'
                    />

                
                    <div className='flex flex-col gap-1'>
                        <label 
                            htmlFor="fullName"
                            className='text-lg font-semibold'
                        ></label>
                        <input 
                            type="text" 
                            name="fullName" 
                            id="fullName" 
                            placeholder='Enter Name'
                            className='tranparent px-2 py-1 border'
                            value={data.fullName}
                            onChange={handleInputChange}
                            />
                    </div>

                    

                            <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer'>
                                Update Profile
                            </button>

                            <Link to='/user/profile'>
                                <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-4'>
                                <AiOutlineArrowLeft /> Go Back To Profile
                                    
                                </p>
                            </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile;