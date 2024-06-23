import { useSearchParams } from "react-router-dom";
import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"

const ProjectList = () => {
    const [params, getParams] = useSearchParams();
    const Projects = GetProjects({params})
    const position = params?.getAll("position")
    const stack = params?.getAll("stack")
    const range = params?.getAll("range")

    return(
        <div className="
            pt-20
            grid 
            grid-cols-auto-fill
            justify-center
            gap-8
            my-10px
            py-10px">
            {Projects.filter((project) => {
                if(position.length === 0 && stack.length === 0 && range.length === 0) return true
                const matchPosition = project.wanted.some(w => position.includes(w.stack))
                const matchStack = stack.some(stk => project.stack.includes(stk))
                const matchRange = range.some(rng => project.category.includes(rng))

                return matchPosition || matchStack || matchRange
            }).map(project => (
                <ProjectBox
                    key={project.id}
                    data={project}
                />
                )
            )}
        </div>
    )
}

export default ProjectList