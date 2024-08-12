import { useNavigate } from "react-router-dom";

function CourseCard({data}){
    const navigate = useNavigate();
    return(
        <div onClick={() => navigate('/course/description',{state: {...data}})} className="text-white w-22rem h-440px shadow-lg 
        rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
            <div className="overflow-hidden">
                <img
                src={data?.thumbnail?.secure_url}
                alt="courseThumbnail" 
                className="48 w-full rounded-tl-lg rounded-tr-lg gorup-hover:scale=[1,2] ease-in-out duration-300" />

                <div className="p-4 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">{data?.title}</h2>

                    <p className="line-clamp-2">{data?.description}</p>

                    <p className="line-clamp-2 font-semibold">
                      <span className="text-yellow-500 font-bold">Catagory: </span>{data?.catagory}
                    </p>

                    <p className="line-clamp-2 font-semibold">
                      <span className="text-yellow-500 font-bold">Total Lectures: </span>{data?.numbersOfLectures}
                    </p>

                    <p className="line-clamp-2 font-semibold">
                      <span className="text-yellow-500 font-bold">Instructors: </span> {data?.createdBy}
                    </p>

                </div>

            </div>
        </div>
    )
}

export default CourseCard;