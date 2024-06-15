import { useSearchParams } from "react-router-dom"
import CategoryBox from "./CategoryBox";
import Container from "../../Assets/Container"
import searchOpen from "./searchOpen"

export const skillTags = [
    {label: 'ALL'},
    {label: 'Web'},
    {label: 'APP'},
    {label: 'Game'},
    {label: 'AI'},
    {label: 'React'},
    {label: 'Disigner'},
    {label: 'Springboot'},
    {label: 'skilltag1'},
    {label: 'skilltag2'},
    {label: 'skilltag3'},
    {label: 'skilltag4'},
    {label: 'skilltag5'},
    {label: 'skilltag6'},
    {label: 'skilltag7'},
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
            pt-5
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto">
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