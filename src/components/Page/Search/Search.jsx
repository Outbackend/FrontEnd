import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useState} from "react";

import SearchButton from "../../Assets/SearchButton"
import searchWindow from "../Home/searchOpen";
import StackSelectList from "./StackSelectList";
import PositionSelectList from "./PositionSelectList";
import RangeSelectList from "./RangeSelectList";
import SelectedList from "./selectedList";

const Search = ({onSearch}) => {

    const window = searchWindow();
    const [searchTerm, setsearchTerm] = useState('');

    const [isOpen, setIsOpen] = useState(null);
    const toggleOpen = useCallback((selectName) => {
        console.log(selectName)
        setIsOpen((prevSelect) => (prevSelect === selectName ? null : selectName))
    },[])

    const handleSearch = (event) => {
        const value = event.target.value;
        setsearchTerm(value);
    }

    const onSubmit = useCallback(() => {
        onSearch(searchTerm)
    },[searchTerm, onSearch])
    
    if(!window.isOpen){
        return null;
    }

    return(
        <div>
        <div className="pt-7 flex justify-center gap-16 truncate">
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
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 w-72 rounded-2xl pl-2 float-right"
                    >
                </input>
                <SearchButton onClick={onSubmit}/>
            </div>
        </div>
            <SelectedList/>
        </div>
    )
}

export default Search
