import { useNavigate } from "react-router-dom"

const ProjectBox = ({
    data
}) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={()=>navigate(`/Project/${data.project_id}`)} //프로젝트 id
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="
                 aspect-square
                 rounded-xl
                 shadow-sm
                 border-solid
                 border-2
                 group-hover:scale-110
                 h-75
                 ">
                <div className="flex flex-row top-3 left-3 p-2 bg-blue-100">
                    <img  src={data.profile_img}  //유저 프로필 이미지
                        alt="User"
                        style={{width:'40px',
                                height:'40px',
                                borderRadius:'9999px' }}
                    />
                    <div className="font-semibold text-lg p-2">
                        {data.user_name}
                    </div>
                    <div className="text-sm px-6 pt-0.5 my-2 ml-auto bg-white rounded-lg font-light border-2">
                        {/* {data.range} */}
                    </div>
                </div>
                <hr/>
                <div className="font-semibold text-lg p-3 truncate">
                     {data.title}
                </div>
                <hr className="w-3/5 h-0.5 bg-gray-200 rounded mx-auto"/>
                <div className="flex flex-wrap flex-row gap-2 font-semibold text-neutral-500 p-3">
                    {data.positionList.map(tmp => (
                        <div className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700">{tmp}</div>
                    )) }
                </div>
                <hr className="w-3/5 h-0.5 bg-gray-200 rounded mx-auto"/>
                <div className="flex flex-wrap flex-row gap-2 font-semibold text-neutral-500 p-3">
                    {data.skillTagList.map(tmp => (
                            <div className="px-3 py-1 text-xs bg-gray-100 rounded-full text-sky-800">{tmp}</div>
                    ))}
                </div>
                <div className="p-3 text-gray-500 text-sm">
                    마감일 : {data.deadline}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectBox