import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayot";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCourseLectures ,deleteCourseLecture } from "../../Redux/Slices/LectureSlice";

function Displaylecture(){

    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation()

    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    const [currentVideo , setCurrentVideo] = useState(0);

    useEffect(() => {
        console.log("Hello");
        console.log(state);
        if(!state){
            navigate("/course");
        }
        dispatch(getCourseLectures(state._id));
    },[]);

    async function onLectureDelete(courseId, lectureId){
        console.log(courseId,lectureId);
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5 ">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {state.title}
                </div>
                { ( lectures && lectures.length > 0 ) ? 
                (<div className="flex justify-center gap-10 w-full">

                   <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            controlsList="nodownload"
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                        ></video>
                        <div className="">
                            <h1>
                                <span className="text-yellow-500">
                                    Title : { " "}
                                </span>
                            {lectures && lectures[currentVideo]?.title}
                            </h1>

                            <p>
                                <span className="text-yellow-500 line-clamp-4">Description : { " " }</span>
                                <span></span>{lectures && lectures[currentVideo]?.description}<span/>
                            </p>
                        </div>
                   </div>

                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-center">
                            <p>Lecture List</p>
                            {role === 'ADMIN' && (
                                <button onClick={() => navigate("/course/addlecture",{state: {...state}})} className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded py-1 cursor-pointer text-center mx-2 px-2 text-white">Add New Lecture</button>
                            )}
                        </li>
                        {lectures && lectures.map((lecture,idx) => {
                            return(
                               <li
                                className="space-y-2"
                                key={lecture._id}>

                                <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                    <span>{" "} Lecture {idx+1} </span>
                                    {lecture?.title}
                                </p>

                                {role === 'ADMIN' && (
                                <button onClick={() => onLectureDelete(state?._id, lecture?._id)} 
                                className="bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded font-semibold py-2 cursor-pointer text-center px-2">Delete Lecture</button>
                            )}

                                </li> 
                            )
                        })
                    }
                    </ul>

                </div>) : (
                        role && role === 'ADMIN' && (
                            <button onClick={() => navigate("/course/addlecture",{state: {...state}})}
                            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded font-semibold py-2 cursor-pointer text-center px-2">Add New Lecture</button>
                    )
                )}
            </div>
        </HomeLayout>
    )
}

 export default Displaylecture;