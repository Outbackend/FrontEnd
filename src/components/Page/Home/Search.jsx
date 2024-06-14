import Select from "react-select"
import { useCallback, useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'

import {AllItem} from "./getItem"
import SearchButton from "../../Assets/SearchButton"
import searchWindow from "./searchOpen";

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
    const window = searchWindow();
    // const [position, setPosition] = useState();
    // const [stack, setStack] = useState();
    // const [range, setRange ] = useState();

    // useEffect(()=>{
    //     setShowWindow(window.isOpen);
    // },[window.isOpen])

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
    
    if(!window.isOpen){
        return null;
    }

    return(
        <div className="pt-7 flex justify-center gap-3">
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

    )
}

export default Search
