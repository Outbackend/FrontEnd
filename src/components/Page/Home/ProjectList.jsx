import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"
import useStackStore from "../../../variables/States/StackStore"

const ProjectList = ({ searchTerm }) => {
    const Projects = GetProjects()
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
                if(positionList.length === 0 && stackList.length === 0 && rangeList.length === 0 && searchTerm === '') return true
                const matchPosition = project.wanted.some(w => positionList.includes(w.stack))
                const matchStack = stackList.some(stk => project.stack.includes(stk))
                const matchRange = rangeList.some(rng => project.category.includes(rng))

                const matchSearchTerm = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase())

                return matchPosition || matchStack || matchRange || matchSearchTerm
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