import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import Container from "../../Assets/Container";
import useStackStore from "../../../variables/States/StackStore";

const SelectedList = () => {
  const { stacks, resetStack } = useStackStore();
  const [stackList, setStackList] = useState(stacks.stackList);
  const [positionList, setPositionList] = useState(stacks.positionList);
  const [rangeList, setRangeList] = useState(stacks.rangeList);

  useEffect(() => {
    const unsubscribe = useStackStore.subscribe((state) => {
      setStackList(state.stacks.stackList);
      setPositionList(state.stacks.positionList);
      setRangeList(state.stacks.rangeList);
      
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
    <div className="mt-2 overflow-x-auto rounded-lg bg-gray-100 p-4 font-semibold shadow-md">
        <div className="flex gap-2 mt-1 h-6">
            기 &nbsp; 술 ||
            {stackList.map((stack) => (
            <div className="rounded-full bg-white mt-1 px-4 text-sm shadow">{stack}</div>
            ))}
        </div>
        <div className="flex gap-2 mt-1 h-6">
            포지션 ||
            {positionList.map((position) => (
            <div className="rounded-full bg-white mt-1 px-4 text-sm shadow">{position}</div>
            ))}
        </div>
        <div className="flex gap-2 mt-1 h-6">
            분 &nbsp; 야 ||
            {rangeList.map((range) => (
            <div className="rounded-full bg-white mt-1 px-4 text-sm shadow">{range}</div>
            ))}
        </div>
        <div className="cursor-pointer rounded-lg w-24 text-center bg-white mt-4 text-sm shadow-md"
            onClick={()=>{resetStack()}}>
            <IoMdRefresh className="inline-block mb-1"/>
            초기화
        </div> 
    </div>
    </Container>
  );
};

export default SelectedList;