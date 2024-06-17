import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from 'query-string'

const CategoryBox = ({item, selected}) => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const handleClick = useCallback(() => {
        let Query = {}
        if(params){
            Query = queryString.parse(params.toString())
        }

        let updateQuery = {...Query}

        if(params?.get(`${item.group}`) === item.value){
            delete updateQuery[item.group]
        }
        else{
            delete updateQuery.position
            delete updateQuery.stack
            delete updateQuery.range
            if (item.value !== 'ALL') {
                updateQuery[item.group] = item.value;
            }
        }

        const url = queryString.stringifyUrl(
            {
                url : "/",
                query: updateQuery
            },
            {skipNull: true}
        )

        navigate(url)
    }, [item, params, navigate])
    
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
            <div className={`font-medium text-s rounded-2xl px-4 py-1 border-2
                ${selected?'text-white':'text-black'}
                ${selected?'bg-gray-500':'bg-white'}
                `}>
                {item.label}
            </div>
        </div>
    )
}

export default CategoryBox