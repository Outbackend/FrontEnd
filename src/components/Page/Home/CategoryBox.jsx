import { useCallback } from "react";
import  useStackStore  from "../../../variables/States/StackStore"

const CategoryBox = ({item, selected, handleSelect}) => {

    const { addStack, addPosition, addRange, resetStack } = useStackStore();

    const handleClick = useCallback(() => {
        if (selected) {
            resetStack()
            handleSelect('ALL')
        } else {
            if(item.value === 'ALL'){
                resetStack();
                handleSelect('ALL');
            }
            else{
                handleSelect(item.value);
                if (item.group === 'stack') {
                    resetStack();
                    addStack(item.value);
                } else if (item.group === 'position') {
                    resetStack();
                    addPosition(item.value);
                } else if (item.group === 'range') {
                    resetStack();
                    addRange(item.value);
            }
        }
        }
    }, [selected, item, addStack, addPosition, addRange, resetStack, handleSelect]);
    
    return(
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                px-1
                hover:text-[#304cad]
                transition
                cursor-pointer    
            `}
            >
            <div className={`font-medium text-s rounded-2xl px-4 py-1 border-2
                ${selected?'text-white':'text-black'}
                ${selected?'bg-gray-500':'bg-white'}
                `}>
                {item.label}
            </div>
        </div>
    )
}

export default CategoryBox