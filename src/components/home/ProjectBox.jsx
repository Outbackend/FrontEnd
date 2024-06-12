import { useNavigate } from "react-router-dom"

const ProjectBox = ({
    data
}) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={()=>navigate(`/Project/${data.id}`)} //프로젝트 id
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square
                 relative
                 rounded-xl
                 ">
                <div className="flex flex-row top-3 left-3">
                    <img  src={data.profile_img}  //유저 프로필 이미지
                        alt="User"
                        style={{width:'50px',
                                height:'50px',
                                borderRadius:'9999px' }}
                    />
                    <div className="font-semibold text-lg">
                        {data.user_name}
                    </div>
                </div>
                <hr/>
                <div className="font-semibold text-lg">
                     {data.name}
                </div>
                <div className="flex flex-row gap-2 font-light text-neutral-500">
                    {data.recruit.map(tmp => (
                        <div>{tmp}</div>
                    )) }
                </div>
                <div className="flex flex-row gap-2 font-light text-neutral-500">
                    {data.stack.map(tmp => (
                            <div>{tmp}</div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectBox