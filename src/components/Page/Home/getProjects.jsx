import axios from 'axios'
import { useEffect, useState} from 'react'

export const GetProjects = ({params}) => {

    const [Project, setProject] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                //const response = await axios.get('/dummy/ProjectList.json')
                const response = await axios.get('/project/list')
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