import Select from "react-select"
import { useCallback, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'

import {AllItem} from "./getItem"
import SearchButton from "../../Assets/SearchButton"

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const formatGroupLabel = (AllItem) => (
    <div style={groupStyles}>
        <span>{AllItem.label}</span>
    </div>
);

const Search = () => {

    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const [skillTag, setSkilltag] = useState([]);
    // const [position, setPosition] = useState();
    // const [stack, setStack] = useState();
    // const [range, setRange ] = useState();

    const handler = (event) => {
        const selected = []
        event.map((value) => (
            selected.push(value.value)
        ))
        setSkilltag(selected)
    }

    const onSubmit = useCallback(async () => {

        let currentQuery = {};
    
        if (params) {
          currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = {
          ...currentQuery,
          skillTag
        };
        
        const url = qs.stringifyUrl({
          url: '/',
          query: updatedQuery,
        }, { skipNull: true });
    
        navigate(url)
      }, 
      [
        skillTag,
        navigate, 
        params
      ]);

    return(
        <div>
            <div className="flex justify-center gap-3 mx-5">
                <Select
                    placeholder="검색어를 입력하세요"
                    isMulti
                    options={AllItem}
                    formatOptionLabel={formatGroupLabel}
                    classNames={{
                        control:()=>'p-2 border-2',
                        input:() =>'pe-3 text-lg',
                        option:() =>'text-lg'}} 
                    theme={(theme)=>({
                        ...theme,
                        borderRadius:20,
                        colors:{
                        ...theme.colors,
                        primary:'black',
                        }
                    })}
                    onChange={(e)=>{handler(e)}}
                />
                <SearchButton
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}

export default Search
