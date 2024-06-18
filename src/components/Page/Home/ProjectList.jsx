import { useSearchParams } from "react-router-dom";
import ProjectBox from "./ProjectBox";
import getProject from "./getProjects"
import Container from "../../Assets/Container";

const ProjectList = () => {
    const [params, getParams] = useSearchParams();
    const Projects = getProject({params})

    return(
        <Container>
        <div className="
            pt-20
            grid 
            grid-cols-auto-fill
            justify-center
            gap-8
            my-10px
            py-10px">
            {Projects?.map(project => (
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