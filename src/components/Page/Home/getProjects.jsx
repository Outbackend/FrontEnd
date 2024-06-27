import axios from "axios";
import { useEffect, useState } from "react";

export const GetProjects = () => {
  const [Project, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/project/list"
        );
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return Project;
};

export default GetProjects;
