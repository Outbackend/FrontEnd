import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'

export const GetProjects = ({params}) => {

    const [Project, setProject] = useState([])
    const position = params?.getAll("position")
    const stack = params?.getAll("stack")
    const range = params?.getAll("range")

    useEffect(() => {
        const fetchData = async () => {
            try{
                //const response = await axios.get('dummy/ProjectList.json')
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

export default GetProjects