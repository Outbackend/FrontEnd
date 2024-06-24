import { useSearchParams } from "react-router-dom";
import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"
import useStackStore from "../../../variables/States/StackStore"

const ProjectList = () => {
    const [params, getParams] = useSearchParams();
    const Projects = GetProjects()
    // const position = params?.getAll("position")
    // const stack = params?.getAll("stack")
    // const range = params?.getAll("range")
    const { stacks } = useStackStore()
    const {stackList, positionList, rangeList} = stacks

    return(
        <div className="
            grid 
            grid-cols-auto-fill
            justify-center
            gap-8
            my-5
            py-10px">
            {Projects.filter((project) => {
                if(positionList.length === 0 && stackList.length === 0 && rangeList.length === 0) return true
                const matchPosition = project.wanted.some(w => positionList.includes(w.stack))
                const matchStack = stackList.some(stk => project.stack.includes(stk))
                const matchRange = rangeList.some(rng => project.category.includes(rng))

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