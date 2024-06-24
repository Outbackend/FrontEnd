import React, {useCallback} from 'react'
import useStackStore from '../../../variables/States/StackStore'
import stackList from '../../../variables/StackList'
import SelectItem from './SelectItem'

const StackSelectList = React.memo(() => {
    const {stacks, addStack, removeStack} = useStackStore()
    const selectedList = stacks.stackList

    const onItemClick = useCallback(
        (item, selected) => {
        selected ? removeStack(item) : addStack(item)
    }, [removeStack, addStack])

    return (
        <div className="flex flex-wrap absolute
                        rounded-xl 
                        shadow-md
                        border-2
                        border-gray-300
                        bg-white
                        z-50
                        p-3
                        max-w-[700px]">
            {stackList.map((item, index) => (
                <SelectItem key={index} 
                    item={item} 
                    selected={selectedList.includes(item)} 
                    onItemClick={onItemClick}/>
            ))}
        </div>
    )
})

export default StackSelectList
