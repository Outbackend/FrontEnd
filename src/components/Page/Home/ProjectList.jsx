import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"
import Container from "../../Assets/Container";

const ProjectList = () => {
    const Projects = GetProjects()

    return(
        <Container>
        <div className="
            pt-20
            grid 
            grid-cols-auto-fill
            justify-center
            gap-8
            my-10px
            py-10px
            bg-black">
            {Projects?.map(project => (
                <ProjectBox
                    key={project.uuid}
                    data={project}
                />
                )
            )}
        </div>
        </Container>
    )
}

export default ProjectList