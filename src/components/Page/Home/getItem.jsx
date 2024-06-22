import positionList from "../../../variables/PositionList"
import stackList from "../../../variables/StackList"
import rangeList from "../../../variables/RangeList"

export const Position = positionList.map((item) => {
    return {value: item, label: item, group:'포지션'}
})

export const Stack = stackList.map((item) => {
    return {value: item, label: item, group:'스택'}
})

export const Range= rangeList.map((item) => {
    return {value: item, label: item, group:'분야'}
})

export const AllItem = [
    {label: '포지션',
    options: Position},
    {label: '스택',
    options: Stack},
    {label: '분야',
    options: Range}
]
