import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayot";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture(){

    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const[userInput,setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: '',
        description: "",
        videoSrc: ""
    })

    function handleInputChange(e){
        const {name , value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideoUpload(e){
        const video = e.target.files[0];
        const sources = window.URL.createObjectURL(video);
        console.log(sources);
        
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: sources
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error("All Fields Are Required/Mandatory");
            return;
        }

        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: '',
                description: "",
                videoSrc: ""
            })
        }
    }

    useEffect(() => {
        if(!courseDetails) navigate('/courses')
    },[])

    return(
        <HomeLayout>

            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx016">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button>
                            <AiOutlineArrowLeft  className="absolute left-2 text-xl text-green-500" onClick={() => navigate(-1)}/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">Add New Lecture</h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Enter The Lecture Title"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                            id="title"
                            />
                        
                        <textarea 
                            type="text" 
                            name="description"
                            placeholder="Enter The Lecture Description"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll"
                            value={userInput.description}
                            id="description"
                            />

                            {userInput?.videoSrc ? (
                                <video 
                                    src={userInput.videoSrc}
                                    controls
                                    controlsList="nodownload nofullscreen"
                                    disablePictureInPicture
                                    className="object-fill rounded-tl-lg rounded-tr-lg"
                                    accept="video/mp4 video/x-mp4 video/*"
                                ></video>
                            ) : (
                                <div className="h-48 border flex items-center justify-center cursor-pointer">
                                    <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture">Choose Your Video</label>
                                    <input 
                                        type="file" 
                                        className="hidden"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleVideoUpload}
                                        />
                                </div>
                                
                            )}
                            <button type="submit" className="btn btn-primary py-1 font-semibold text-xl">Add New Lectures</button>
                    </form>
                </div>
            </div>

        </HomeLayout>
    )
}

export default AddLecture;