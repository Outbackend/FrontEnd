import React from 'react'

import StackWrapper from './StackWrapper';
import ModifyButton from '../../Assets/ModifyButton';
import { Link } from 'react-router-dom';

const UserStack = () => {
    return(
        <div className='w-2/3 h-[560px] m-auto relative float-right'>
            <div className='w-1/2 h-[110px] float-left relative'>
                <div className='absolute left-8 top-[40%]'>
                    <p className='text-2xl font-bold'>스택 한 눈에 보기</p>
                </div>
            </div>
            <div className='w-1/2 h-[110px] float-right relative'>
                <div className='absolute inset-y-0 right-5 top-[30%]'>
                    <Link to='/userinfomodify'>
                        <ModifyButton placeholder="수정"/>
                    </Link>
                </div>
            </div>
            <div className='w-full top-[110px] relative'>
                <div className='h-[420px] rounded-2xl border-2 border-solid border-[#dfdfdf]'>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                        <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Range</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <StackWrapper name="asdf"/>
                            <StackWrapper name="fdsa"/>
                            <StackWrapper name="qwer"/>
                        </div>
                    </div>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Position</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <StackWrapper name="asdf"/>
                            <StackWrapper name="fdsa"/>
                            <StackWrapper name="qwer"/>
                        </div>
                    </div>
                    <div className='relative h-1/3'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Stack</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <StackWrapper name="asdf"/>
                            <StackWrapper name="fdsa"/>
                            <StackWrapper name="qwer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserStack;