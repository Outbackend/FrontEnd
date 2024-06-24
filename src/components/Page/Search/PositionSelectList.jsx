import React, {useCallback} from 'react'
import useStackStore from '../../../variables/States/StackStore'
import positionList from '../../../variables/PositionList'
import SelectItem from '../Search/SelectItem'

const PositionSelectList = React.memo(() => {
    const {stacks, addPosition, removePosition} = useStackStore()
    const selectedList = stacks.positionList

    const onItemClick = useCallback(
        (item, selected) => {
        selected ? removePosition(item) : addPosition(item)
    }, [removePosition, addPosition])

    return (
        <div className="flex flex-wrap 
                        absolute
                        rounded-xl 
                        border-2
                        border-gray-300
                        shadow-md
                        bg-white
                        z-50
                        p-3
                        max-w-[700px]">
            {positionList.map((item, index) => (
                <SelectItem key={index} 
                    item={item} 
                    selected={selectedList.includes(item)} 
                    onItemClick={onItemClick}/>
            ))}
        </div>
    )
})

export default PositionSelectList
