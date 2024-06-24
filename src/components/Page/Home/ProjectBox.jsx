import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import UserImg from "../../Layout/header/LogoUser"

const ProjectBox = ({
    data
}) => {
    const navigate = useNavigate()
    const [publisher, setPublisher] = useState({})
    const fetchUser = async () => {
        try{
            const response = await axios.get(`http://13.212.106.4:5000/user/${data.publisher}`)
            setPublisher(response.data)
            console.log(data.publisher)
        }catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div
            onClick={()=>navigate(`/project/${data.id}`)} //프로젝트 id
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
                    <UserImg  src={publisher.profile_img}  
                        alt="User"
                        style={{width:'40px',
                                height:'40px',
                                borderRadius:'9999px' }}
                    />
                    <div className="font-semibold text-lg p-2">
                        {publisher.nickname}
                    </div>
                    <div className="text-sm px-6 pt-1 my-2 ml-auto bg-white rounded-lg font-light border-2">
                        {data.category}
                    </div>
                </div>
                <hr/>
                <div className="font-semibold text-lg p-3 truncate">
                     {data.name}
                </div>
                <hr className="w-3/5 h-0.5 bg-gray-200 rounded mx-auto"/>
                <div className="flex flex-wrap flex-row gap-2 font-semibold text-neutral-500 p-3">
                    {data.wanted.map(tmp => (
                        <div className="px-3 py-1 text-xs bg-gray-200 rounded-full text-gray-700">{tmp.stack}</div>
                    )) }
                </div>
                <hr className="w-3/5 h-0.5 bg-gray-200 rounded mx-auto"/>
                <div className="flex flex-wrap flex-row gap-2 font-semibold text-neutral-500 p-3">
                    {data.stack.map(tmp => (
                            <div className="px-3 py-1 text-xs bg-gray-100 rounded-full text-sky-800">{tmp}</div>
                    ))}
                </div>
                <div className="p-3 text-gray-500 text-sm">
                    마감일 : {data.endDate}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectBox