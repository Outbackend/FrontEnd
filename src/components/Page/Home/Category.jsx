import { useSearchParams } from "react-router-dom"
import CategoryBox from "./CategoryBox";
import Container from "../../Assets/Container"
import searchOpen from "./searchOpen"

export const skillTags = [
    {label: 'ALL', value:'ALL'},
    {label: 'WEB', value: '웹', group: 'range'},
    {label: 'APP', value: '앱', group: 'range'},
    {label: 'Game', value: '게임', group: 'range'},
    {label: 'AI', value:'AI', group:'position'},
    {label: '3D', value:'3D', group:'position'},
    {label: 'Disigner', value:'디자이너', group:'position'},
    {label: 'Java', value:'Java', group:'stack'},
    {label: 'AWS', value:'AWS', group:'stack'},
    {label: 'Python', value:'Python', group:'stack'},
    {label: 'Django', value:'Django', group:'stack'},
    {label: 'React', value:'React', group:'stack'},
    {label: 'Unity', value:'Unity', group:'stack'},
    {label: 'Figma', value:'Figma', group:'stack'},
    {label: 'Nodejs', value:'Nodejs', group:'stack'},
]

const Category = () => {

    const [params, setParams] = useSearchParams();
    const position = params?.get("position")
    const stack = params?.get("stack")
    const range = params?.get("range")
    const window = searchOpen();

    if (window.isOpen){
        return null;
    }
    return (
        <div className="
            p-2
            mt-7
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto 
            scrollbar-hide
            bg-gray-200
            rounded-lg
            bg-black
            ">
            {skillTags.map((item) => (
                <CategoryBox
                    key={item.label}
                    item={item}
                    selected={position===item.value || stack===item.value || range===item.value}
                />
            ))               
            }
        </div>
    )
}

export default Category