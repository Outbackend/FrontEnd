import axios from 'axios'
import { useEffect, useState} from 'react'

export const GetProjects = () => {

    const [Project, setProject] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('/dummy/ProjectList.json')
                //const response = await axios.get('http://47.128.234.198:5000/project/list')
                setProject(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    },[])

    return Project
}

export default GetProjects