import Select from "react-select"
import { useCallback, useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'

import {AllItem} from "./getItem"
import SearchButton from "../../Assets/SearchButton"
import searchWindow from "./searchOpen";
import Container from "../../Assets/Container";

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
    const window = searchWindow();
    const [position, setPosition] = useState([]);
    const [stack, setStack] = useState([]);
    const [range, setRange ] = useState([]);

    const handler = (event) => {
        const updatedPosition = []
        const updatedStack = []
        const updatedRange = []
        event.forEach((value) => {
            if(value.group === '포지션') {
                updatedPosition.push(value.value);
            } else if(value.group === '스택') {
                updatedStack.push(value.value);
            } else if(value.group === '분야') {
                updatedRange.push(value.value);
            }
    })
        setPosition(updatedPosition)
        setStack(updatedStack)
        setRange(updatedRange)
    }

    const onSubmit = useCallback(async () => {

        let currentQuery = {};
    
        if (params) {
          currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = {
          ...currentQuery,
            position: position,
            stack: stack,
            range: range,
        };
        
        const url = qs.stringifyUrl({
          url: '/',
          query: updatedQuery,
        }, { skipNull: true });
    
        navigate(url)
      }, 
      [
        position,
        stack,
        range,
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
                    control:()=>'p-2 border-2 w-96',
                    input:() =>'pe-3 text-lg',
                    option:() =>'text-lg',
                }} 
                theme={(theme)=>({
                    ...theme,
                    borderRadius:20,
                    colors:{
                    ...theme.colors,
                    primary:'black',
                    }
                })}
                styles={{
                    multiValueRemove:(styles)=>({
                        ...styles,
                        ':hover':{backgroundColor: '#5C9CDD'}
                    }),
                }}
                onChange={handler}
            />
            <SearchButton
                onClick={onSubmit}
            />
        </div>
    )
}

export default Search
