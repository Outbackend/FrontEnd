import ProjectBox from "./ProjectBox";
import { GetProjects }  from "./getProjects"
import useStackStore from "../../../variables/States/StackStore"

const ProjectList = () => {
    const Projects = GetProjects()
    const { stacks } = useStackStore()
    const {stackList, positionList, rangeList, searchTerm} = stacks

    const sortedProjects = Projects.sort((a, b) => b.modifiedDate.localeCompare(a.modifiedDate));

    return(
        <div className="
            grid 
            grid-cols-auto-fill
            justify-center
            gap-8
            my-5
            py-10px">
            {sortedProjects.filter((project) => {
                if(positionList.length === 0 && stackList.length === 0 && rangeList.length === 0 && !searchTerm) return true
                const matchPosition = project.wanted.some(w => positionList.includes(w.stack))
                const matchStack = stackList.some(stk => project.stack.includes(stk))
                const matchRange = rangeList.some(rng => project.category.includes(rng))

                if(searchTerm){
                    const matchSearchTerm = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase())
                    return matchPosition || matchStack || matchRange || matchSearchTerm 
                }
                else 
                    return matchPosition || matchStack || matchRange

}               ).map(project => (
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