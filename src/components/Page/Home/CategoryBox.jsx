import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from 'query-string'

const CategoryBox = ({label, selected}) => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const handleClick = useCallback(() => {
        let Query = {}
        if(params){
            Query = queryString.parse(params.toString())
        }
        const updateQuery = {
            ...Query,
            skillTag: label
        }

        if(params?.get('skillTag') === label ||
            label === 'ALL'){
            delete updateQuery.skillTag
        }

        const url = queryString.stringifyUrl(
            {
                url : "/",
                query: updateQuery
            },
            {skipNull: true}
        )

        navigate(url)
    }, [label, params, navigate])
    
    return(
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-3
                border-b-2
                hover:text-[#304cad]
                transition
                cursor-pointer    
                ${selected?'border-gray-900':'border-transparent'}
                ${selected?'text-gray-900':'text-black'}      
            `}
            >
            <div className="font-medium text-s">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox