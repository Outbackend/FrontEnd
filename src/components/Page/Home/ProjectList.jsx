import { useSearchParams } from "react-router-dom";
import ProjectBox from "./ProjectBox";
import getProjects from "./getProjects"
import Container from "../../Assets/Container";

const ProjectList = () => {
    //cont Projects = getProjects({searchParams})
    const Projects = getProjects;
    const [params, getParams] = useSearchParams();

    return(
        <Container>
        <div className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            my-10px
            py-10px">
            {Projects.map(project => (
                <ProjectBox
                    data={project}
                />
                )
            )}
        </div>
        </Container>
    )
}

export default ProjectList