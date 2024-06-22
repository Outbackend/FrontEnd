import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"

const ProjectList = () => {
    const Projects = GetProjects()

    return(
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
                    key={project.uuid}
                    data={project}
                />
                )
            )}
        </div>
    )
}

export default ProjectList