import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayot'
import { getAllCourses } from '../../Redux/Slices/courseSlice';
import CourseCard from '../../Components/CourseCard';
function CourseList(){
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state.courses);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourses();
    },[])


    return(
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white'>
                <h1 className='text-center text-3xl font-semibold mb-5'>Explore The Courses <span className='text-yellow-500 font-bold'>Make By Industry Experts</span></h1>
                <div className='mb-10 flex flex-wrap gap-14'>
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element}/>
                    })}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList;