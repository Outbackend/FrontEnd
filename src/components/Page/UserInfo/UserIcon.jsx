import React from 'react'

const UserIcon = ({ name, note }) => {
    return (
        <div className='w-1/3 h-[530px] m-auto relative float-left'>
            <div className='w-full h-[380px] flex justify-center items-center'>
                <div className='w-[250px] h-[250px] bg-[#d9d9d9] rounded-[125px]'></div>
            </div>
            <div className='w-full h-[150px] text-center text-ellipsis'>
                <div className='w-4/5 mx-auto'>
                    <p className='text-3xl font-bold m-5'>{ name }</p>
                </div>
                <div className='w-4/5 mx-auto'>
                    <span className='w-full'>{ note }</span>
                </div>
            </div>
        </div>
    );
}

export default UserIcon;