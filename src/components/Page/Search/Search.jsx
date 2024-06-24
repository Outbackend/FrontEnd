import Select from "react-select"
import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useEffect, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'

import {AllItem} from "../Home/getItem"
import SearchButton from "../../Assets/SearchButton"
import searchWindow from "../Home/searchOpen";
import StackSelectList from "./StackSelectList";
import PositionSelectList from "./PositionSelectList";
import RangeSelectList from "./RangeSelectList";

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

    const [isOpen, setIsOpen] = useState(null);
    const toggleOpen = useCallback((selectName) => {
        console.log(selectName)
        setIsOpen((prevSelect) => (prevSelect === selectName ? null : selectName))
    },[])

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
        <div className="pt-7 flex justify-center gap-3 truncate">
            <div className="flex gap-3">
                <div className="pt-3 overflow-hidden">
                    <div className={`flex gap-2 rounded-full border-2 py-1 pl-5 pr-3 mb-1 cursor-pointer 
                            ${isOpen === 'stack' ? 'border-[#5C9CDD]' : 'border-gray'} `}
                        onClick={()=>toggleOpen('stack')}>기술
                        <IoIosArrowDown style={{margin:'5px'}} />
                    </div>
                    {isOpen === 'stack' && <StackSelectList/>}
                </div>
                <div className="pt-3">
                    <div className={`flex gap-2 rounded-full border-2 py-1 pl-5 pr-3 mb-1 cursor-pointer 
                            ${isOpen === 'position' ? 'border-[#5C9CDD]' : 'border-gray'} `}
                        onClick={()=>toggleOpen('position')}>포지션
                        <IoIosArrowDown style={{margin:'5px'}}/>
                    </div>
                    {isOpen === 'position' && <PositionSelectList/>}
                </div>
                <div className="pt-3">
                    <div className={`flex gap-2 rounded-full border-2 py-1 pl-5 pr-3 mb-1 cursor-pointer 
                            ${isOpen === 'range' ? 'border-[#5C9CDD]' : 'border-gray'} `}
                        onClick={()=>toggleOpen('range')}>분야
                        <IoIosArrowDown style={{margin:'5px'}}/>
                    </div>
                    {isOpen === 'range' && <RangeSelectList/>}
                </div>
            </div>
            <Select
                placeholder="검색어를 입력하세요"
                isMulti
                options={AllItem}
                formatOptionLabel={formatGroupLabel}
                classNames={{
                    control:()=>'p-2 border-2',
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
