import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'

export const Projects = [
    {
        project_id: 213654,
        title: "프로젝트 이름이 엄청 길면 어떻게 될까요",
        deadline: "2024-12-31",
        position: ["백엔드", "프로트엔드", "DevOps",],
        stack: ["React", "Python", "MySQL", "Java"],
        range: "웹",
        user_name: "김인하",
        profile_img: "/UserDefault.jpg"
    },
    {
        project_id: 513512,
        title: "프로젝트 2",
        deadline: "2024-12-31",
        position: ["디자이너", "AI"],
        stack: ["Nodejs", "Spring"],
        range: "앱",
        user_name: "김인하",
        profile_img: "/UserDefault.jpg"
    },
    {
        project_id: 985632,
        title: "프로젝트 3",
        deadline: "2024-12-31",
        position: ["백엔드", "보안"],
        stack: ["AWS", "Go"],
        range: "게임",
        user_name: "김인하",
        profile_img: "/UserDefault.jpg"
    },
    {
        project_id: 915848,
        title: "프로젝트 4",
        deadline: "2024-12-31",
        position: ["3D", "프론트엔드"],
        stack: ["Unity", "Vue"],
        range: "기타",
        user_name: "김인하",
        profile_img: "/UserDefault.jpg"
    },
]

const GetProject = ({params}) => {

    const [Project, setProject] = useState([])
    const position = params?.getAll("position")
    const stack = params?.getAll("stack")
    const range = params?.getAll("range")

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('api/projects',
                    {
                        params: {
                            position,
                            stack,
                            range,
                        },
                        paramsSerializer: params => {
                            return qs.stringify(params)
                        }
                    }
                )
                setProject(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    })
    return Project
}

export default GetProject