import React from 'react'

const SelectItem = React.memo(({ item, selected, onItemClick }) => {
    const selectedStyle = selected ? 'opacity-30' : 'opacity-100'
    return (
        <div className="mx-2 pb-2">
            <div className={`
                cursor-pointer rounded-full border-2 py-1 px-5
                ${selectedStyle}`}    
                onClick={()=>onItemClick(item, selected)}>
                {item}
            </div>
        </div>
    )

})

export default SelectItem