import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BiSearch } from 'react-icons/bi'
import { VscChromeClose } from "react-icons/vsc";

import userDetailStore from '../../variables/States/UserDetailStore';

import TagsWrapper from './TagsWrapper';
import rangeList from '../../variables/RangeList';
import positionList from '../../variables/PositionList';
import stackList from '../../variables/StackList';

const TagModal = ( props ) => {
    const { 
        userInfo,
        insertRangeList, insertPositionList, insertStackList,
        deleteRangeList, deletePositionList, deleteStackList
    } = userDetailStore();

    const { open, close, children } = props

    const [ keyword, setKeyword ] = useState('');

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            close();
        }
    }

    const handleRangeList = (isOn, value) => {
        if (isOn) {
            deleteRangeList(value);
        }
        else {
            insertRangeList(value);
        }
    }

    const handlePositionList = (isOn, value) => {
        if (isOn) {
            deletePositionList(value);
        }
        else {
            insertPositionList(value);
        }
    }

    const handleStackList = (isOn, value) => {
        if (isOn) {
            deleteStackList(value);
        }
        else {
            insertStackList(value);
        }
    }

    const alertValue = () => {
        alert(keyword);
    }

    return createPortal(
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/60 z-99" onClick={handleOverlayClick}>
            <div className='bg-white w-[1280px] h-[720px] rounded-2xl'>
                <div className='w-full h-[120px] border-b border-solid border-[#dfdfdf] flex items-center relative'>
                    <div className='w-3/4 h-[60px] rounded-2xl mx-[60px] border-2 border-black'>
                        <input 
                            type='search' 
                            className='w-full h-[55px] rounded-2xl p-5 outline-none'
                            placeholder='키워드로 찾아보기'
                            value={ keyword }
                            onChange={ e => setKeyword(e.target.value) }
                        />
                    </div>
                    <div 
                        className='w-[60px] h-[60px] border-2 border-black rounded-full flex justify-center items-center'
                        onClick={ alertValue }
                    >
                        <BiSearch size='30'/>
                    </div>
                    <div
                        className='absolute top-[30px] right-[30px] w-[30px] h-[30px] float-right flex justify-center items-center'
                        onClick={ close }
                    >
                        <VscChromeClose size='20'/>
                    </div>
                </div>
                <div className='w-full h-[200px] border-b border-solid border-[#dfdfdf]'>
                    <div className='w-full h-[50px] flex justify-center items-center'>
                        <p className='text-xl font-bold'>분야로 찾기</p>
                    </div>
                    <div className='w-full h-[150px] flex px-5 text-xl flex-wrap'>
                        {rangeList.map((item) => (
                            <TagsWrapper
                                type={ handleRangeList }
                                toggle={ userInfo.rangeList.includes(item) }
                                name={ item }
                            />
                        ))}
                    </div>
                </div>
                <div className='w-full h-[200px] border-b border-solid border-[#dfdfdf]'>
                    <div className='w-full h-[50px] flex justify-center items-center'>
                        <p className='text-xl font-bold'>포지션으로 찾기</p>
                    </div>
                    <div className='w-full h-[150px] flex px-5 text-xl flex-wrap'>
                        {positionList.map((item) => (
                            <TagsWrapper 
                                type={ handlePositionList }
                                toggle={ userInfo.positionList.includes(item) }
                                name={ item }/>
                        ))}
                    </div>
                </div>
                <div className='w-full h-[200px]'>
                    <div className='w-full h-[50px] flex justify-center items-center'>
                        <p className='text-xl font-bold'>스택으로 찾기</p>
                    </div>
                    <div className='w-full h-[150px] flex px-5 text-xl flex-wrap'>
                        {stackList.map((item) => (
                            <TagsWrapper
                                type={ handleStackList }
                                toggle={ userInfo.stackList.includes(item) }
                                name={ item }
                            />
                        ))}
                    </div>
                </div>
            </div>   
        </div>,
        document.body,
    );

};

export default TagModal;