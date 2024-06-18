import { useSearchParams } from "react-router-dom";
import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"
import Container from "../../Assets/Container";

const ProjectList = () => {
    const [params, getParams] = useSearchParams();
    const Projects = GetProjects({params})

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
                    key={project.project_id}
                    data={project}
                />
                )
            )}
        </div>
        </Container>
    )
}

export default ProjectList