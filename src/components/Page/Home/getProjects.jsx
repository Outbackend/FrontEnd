import axios from 'axios'
import qs from 'qs'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export const GetProjects = () => {

    const [params, getParams] = useSearchParams();
    const [Project, setProject] = useState([])
    const position = params?.getAll("position")
    const stack = params?.getAll("stack")
    const range = params?.getAll("range")

    useEffect(() => {
        console.log(params)
        const fetchData = async () => {
            try{
                const response = await axios.get('http://47.128.234.198:5000/project/list',
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
    },[params])

    return Project
}

export default GetProjects