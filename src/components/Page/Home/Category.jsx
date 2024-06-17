import { useSearchParams } from "react-router-dom"
import CategoryBox from "./CategoryBox";
import Container from "../../Assets/Container"
import searchOpen from "./searchOpen"

export const skillTags = [
    {label: 'ALL'},
    {label: 'WEB'},
    {label: 'APP'},
    {label: 'Game'},
    {label: 'AI'},
    {label: '3D'},
    {label: 'Disigner'},
    {label: 'Java'},
    {label: 'AWS'},
    {label: 'Python'},
    {label: 'Django'},
    {label: 'React'},
    {label: 'Unity'},
    {label: 'Figma'},
    {label: 'Nodejs'},
]

const Category = () => {

    const [params, setParams] = useSearchParams();
    const skillTag = params?.get("skillTag")
    const window = searchOpen();

    if (window.isOpen){
        return null;
    }
    return (
        <Container>
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
            ">
            {skillTags.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={skillTag===item.label}
                />
            ))               
            }
        </div>
        </Container>
    )
}

export default Category