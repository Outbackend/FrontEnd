import { useState } from 'react'

const UserIcon = () => {
    const [ name, nameState ] = useState("닉네임");
    const [ note, noteState ] = useState("소개글입니다.");

    return (
        <div className='w-1/3 h-[530px] m-auto relative float-left'>
            <div className='absolute w-[250px] h-[250px] top-[77px] left-[67px] bg-[#d9d9d9] rounded-[125px]'>
                <div></div>
            </div>
            <div className='absolute w-[250px] h-[45px] top-[380px] left-[72px] text-center'>
                <p className='text-3xl font-bold'>{ name }</p>
            </div>
            <div className='absolute w-[250px] h-auto top-[440px] left-[72px] text-center'>
                <p>{ note }</p>
            </div>
        </div>
    );
}

export default UserIcon;