import React, {useCallback} from 'react'
import useStackStore from '../../../variables/States/StackStore'
import rangeList from '../../../variables/RangeList'
import SelectItem from './SelectItem'

const StackSelectList = React.memo(() => {
    const {stacks, addRange, removeRange} = useStackStore()
    const selectedList = stacks.rangeList

    const onItemClick = useCallback(
        (item, selected) => {
        selected ? removeRange(item) : addRange(item)
    }, [removeRange, addRange])

    return (
        <div className="flex flex-wrap 
                        absolute
                        rounded-xl 
                        shadow-md
                        border-2
                        border-gray-300
                        bg-white
                        z-50
                        p-3
                        max-w-[700px]">
                {rangeList.map((item, index) => (
                <SelectItem key={index} 
                    item={item} 
                    selected={selectedList.includes(item)} 
                    onItemClick={onItemClick}/>
            ))}
        </div>
    )
})

export default StackSelectList
