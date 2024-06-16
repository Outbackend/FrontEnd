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
                px-1
                hover:text-[#304cad]
                transition
                cursor-pointer    
            `}
            >
            <div className={`font-medium text-s bg-white rounded-2xl px-4 py-1 border-2
                ${selected?'text-white':'text-black'}
                ${selected?'bg-gray-500':'bg-white'}
                `}>
                {label}
            </div>
        </div>
    )
}

export default CategoryBox