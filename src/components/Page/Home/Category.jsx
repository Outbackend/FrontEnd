import React, { useState } from "react";
import CategoryBox from "./CategoryBox";
import searchOpen from "./searchOpen"

export const skillTags = [
    {label: 'ALL', value:'ALL'},
    {label: 'WEB', value: '웹', group: 'range'},
    {label: 'APP', value: '앱', group: 'range'},
    {label: 'Game', value: '게임', group: 'range'},
    {label: 'AI', value:'AI', group:'position'},
    {label: '3D', value:'3D', group:'position'},
    {label: 'Disigner', value:'디자이너', group:'position'},
    {label: 'Java', value:'Java', group:'stack'},
    {label: 'AWS', value:'AWS', group:'stack'},
    {label: 'Python', value:'Python', group:'stack'},
    {label: 'Django', value:'Django', group:'stack'},
    {label: 'React', value:'React', group:'stack'},
    {label: 'Unity', value:'Unity', group:'stack'},
    {label: 'Figma', value:'Figma', group:'stack'},
    {label: 'Nodejs', value:'Nodejs', group:'stack'},
]

const Category = () => {

    const window = searchOpen();
    const [selected, setSelected] = useState('ALL');

    const handleSelect = (item) => {
        setSelected(item);
    }

    if (window.isOpen){
        return null;
    }
    return (
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
            bg-black
            shadow-md
            ">
            {skillTags.map((item) => (
                <CategoryBox
                    key={item.label}
                    item={item}
                    selected={selected === item.value}
                    handleSelect={handleSelect}
                />
            ))               
            }
        </div>
    )
}

export default Category