import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayot";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[userInput,setUserInput] = useState({
        title: "",
        catagory: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',function(){
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }

    }

    function handleUserInput(e){

        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        
        if(!userInput.title || !userInput.description || !userInput.catagory || !userInput.thumbnail || !userInput.createdBy){
            toast.error('All Fields are mandatory');
            return;
        }

        const responce = await dispatch(createNewCourse(userInput));

        if(responce?.paload?.success){
            setUserInput({
                title: "",
                catagory: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            })
        }

        navigate('/courses');


    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={onFormSubmit}
                    className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative'
                >   

                    <Link className='absolute top-8 text-2xl link text-accent cursor-pointer'>
                    <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-2xl font-bold">Create New Course</h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div className="" >
                                <label htmlFor="image_upload" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            src={userInput.previewImage} 
                                            alt="" 
                                            className="w-full h-44 m-auto border"/>
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload Your Course Thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_upload"
                                    accept=".jpg, .jpeg, .png" 
                                    name="image_upload"
                                    onChange={handleImageUpload}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold">
                                    Course Title: 
                                </label>
                                <input 
                                    type="text" 
                                    required
                                    name="title"
                                    id="title"
                                    placeholder="Enter Course Title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                    />
                            </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">
                                   Course Instructor: 
                                </label>
                                <input 
                                    type="text" 
                                    required
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter Course Instructor Name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                <label htmlFor="catagory" className="text-lg font-semibold">
                                   Course Catagory: 
                                </label>
                                <input 
                                    type="text" 
                                    required
                                    name="catagory"
                                    id="catagory"
                                    placeholder="Enter Course Catagory"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.catagory}
                                    onChange={handleUserInput}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-lg font-semibold">
                                   Course Description: 
                                </label>
                                <textarea 
                                     required
                                    name="description"
                                    id="description"
                                    placeholder="Enter Course Description"
                                    className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                    />
                                </div>

                            </div>
                    </main>


                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 rounded-sm font-semibold text-lg">
                        Create Course
                    </button>

                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;