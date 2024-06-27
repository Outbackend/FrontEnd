import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TagModal from '../../Modals/TagModal';

import userDetailStore from '../../../variables/States/UserDetailStore';
import LoginStore from '../../../variables/States/LoginStore';

import StackWrapper from '../UserInfo/StackWrapper';
import ModifyButton from '../../Assets/ModifyButton';

const UserStackModify = ( { link } ) => {
    const { userInfo, updateData, error } = userDetailStore();
    const { token } = LoginStore();

    const [ modalOpen, setModalOpen ] = useState(false);

    const updateHandler = async () => {
        try {
            updateData(token, link);
        } catch (e) {
            alert(error);
        }
        alert("저장되었습니다.");
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return(
        <div className='w-2/3 h-[560px] m-auto relative float-right'>
            <div className='w-1/2 h-[110px] float-left relative'>
                <div className='absolute left-8 top-[40%]'>
                    <p className='text-2xl font-bold'>스택 한 눈에 보기</p>
                </div>
            </div>
            <div className='w-1/2 h-[110px] float-right relative'>
                <div className='w-[220px] absolute inset-y-0 right-3 top-[30%] flex'>
                    <div className='w-[120px] h-[45px] py-2.5 px-5 me-2 mb-2 align-bottom'>
                        <Link to={ '/userinfo/' + link }>
                            <div className='text-base font-bold'>
                                <a>돌아가기</a>
                            </div>
                        </Link>
                    </div>
                    <div className=''>
                        <ModifyButton
                            placeholder="저장"
                            onclick={ updateHandler }
                        />
                    </div>
                </div>
            </div>
            <div className='w-full top-[110px] relative'>
                <div className='h-[420px] rounded-2xl border-2 border-solid border-[#dfdfdf]'>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                        <div className='w-11/12 absolute top-[15px] left-7'>
                            <p className='text-xl font-bold float-left'>Range</p>
                            <div className='float-right'>
                                <button type="button" 
                                    className="w-[70px] h-[25px] text-white focus:outline-none bg-[#7eb7ec] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#7eb7ec] 
                                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={ toggleModal }
                                >
                                    <p className='text-xs select-none'>수정</p>
                                </button>
                                {modalOpen && (
                                    <TagModal open={modalOpen} close={ toggleModal } />
                                )}
                            </div>
                        </div>
                        <div className='absolute max-h-[80px] top-[50px] left-4 flex flex-wrap overflow-auto'>
                            {userInfo.rangeList.map((item) => (
                                <StackWrapper name={ item } />
                            ))}
                        </div>
                    </div>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Position</p>
                        </div>
                        <div className='absolute max-h-[80px] top-[50px] left-4 flex flex-wrap overflow-auto'>
                            {userInfo.positionList.map((item) => (
                                <StackWrapper name={ item } />
                            ))}
                        </div>
                    </div>
                    <div className='relative h-1/3'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Stack</p>
                        </div>
                        <div className='absolute max-h-[80px] top-[50px] left-4 flex flex-wrap overflow-auto'>
                            {userInfo.stackList.map((item) => (
                                <StackWrapper name={ item } />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStackModify