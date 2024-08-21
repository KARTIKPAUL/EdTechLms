import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayot";
import {Chart as ChartJs , ArcElement , Tooltip , Legend , CategoryScale , LinearScale , BarElement , Title} from "chart.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {FaUsers} from 'react-icons/fa'
import { deleteCourses, getAllCourses } from "../../Redux/Slices/courseSlice";
import { getStatsData } from "../../Redux/Slices/stateSlice";
import { getPaymentRecord } from "../../Redux/Slices/razorpaySlice";
import { FcSalesPerformance } from 'react-icons/fc'
import { GiMoneyStack } from 'react-icons/gi'
import { BsCollectionPlayFill , BsTrash } from 'react-icons/bs'


ChartJs .register(ArcElement , Tooltip , Legend , CategoryScale , LinearScale , BarElement , Title);


function AdminDashBoard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {allUserCount , subscribeCount} = useSelector((state) => state.stat);
    const {allPayments,monthlySalesRecord} = useSelector((state) => state.razorpay);
    console.log(allPayments?.count);
    

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                fontColor: 'green',
                data: [allUserCount, subscribeCount],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            },
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord || Array(12).fill(8),
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }

        ]
    }

    const myCourses = useSelector((state) => state?.courses?.courseData);
    console.log(myCourses);
    

    async function onCourseDelete(id) {
        if(window.confirm('Are You Sure To Delete The Course')){
            const res = await dispatch(deleteCourses(id));
            if(res?.payload?.success){
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                const res = await dispatch(getPaymentRecord());
                console.log(res);
                
            }
        )()
    },[])


    return(
        <HomeLayout>

            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">Admin DashBoard</h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-lg">
                        <div className="w-80 h-80">
                        <Pie data={userData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5 ">
                            <div className="flex items-center justify-betweeen p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Registered Users</p>
                                    <h3 className="text-4xl font-bold">{allUserCount}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>
                            </div>

                            <div className="flex items-center justify-betweeen p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subcribed Users</p>
                                    <h3 className="text-4xl font-bold">{subscribeCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl"/>
                            </div>

                        </div>
                    </div>

                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-lg">
                    <div className="h-80 w-full relative">
                        <Bar className="absolute bottom-0 h-80 w-full" data= {salesData}/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center justify-betweeen p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Subscription Count</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count || subscribeCount}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl"/>
                    </div>

                    <div className="flex items-center justify-betweeen p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count || subscribeCount * 200}</h3>
                                </div>
                                <GiMoneyStack className="text-yellow-500 text-5xl"/>
                    </div>

                    </div>
                </div>

                </div>

            <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-center text-3xl forn-semibold">Courses OverView</h1>
                    <button className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-lg py-2 px-4 font-semibold text-lg cursor-pointer" onClick={() => navigate('/course/create')}>Create New Course</button>
                </div>

                <table className="table overflow-x-scroll">
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Course Title</th>
                                    <th>Course Category</th>
                                    <th>Instructor</th>
                                    <th>Total Lectures</th>
                                    <th>Description</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myCourses?.map((course,idx) => {
                                        return(
                                            <tr key={course._id}>
                                                <td>{idx+1}</td>
                                                <td>
                                                <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td>
                                                {course?.catagory}
                                            </td>
                                            <td>
                                                {course?.createdBy}
                                            </td>
                                            <td>
                                                {course?.numbersOfLectures}
                                            </td>
                                            <td className="max-w-28 overflow-hidden text-elliipsis whitespace-nowrap">
                                                <textarea 
                                                    className="w-80 h-auto resize-none bg-transparent"
                                                    value={course?.description} 
                                                    readOnly></textarea>
                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 rounded-md text-xl py-2 px-4 font-bold" onClick={() => navigate('/course/displaylectures',{state: {...course}})}>
                                                <BsCollectionPlayFill />
                                                
                                                </button>

                                                <button className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 rounded-md text-xl py-2 px-4 font-bold"onClick={() => onCourseDelete(course?._id)}>
                                                <BsTrash />
                                                
                                                </button>

                                                
                                                
                                            </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>

            </div>

            </div>

        </HomeLayout>
    )
}

export default AdminDashBoard;